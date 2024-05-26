import SortView from '../view/sort-view.js';
import TripsContainer from '../view/tripsContainer-view.js';
import { remove, render } from '../framework/render.js';
import EmptyPointsView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { sortByTime, sortByPrice, sortByDefault, filter } from '../utils.js';
import { SORT_TYPES, UPDATE_TYPES, USER_ACTIONS, FILTER_TYPES, TIME_LIMIT } from '../const.js';
import FilterPresenter from './filter-presenter.js';
import AddPointPresenter from './add-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import addPointButtonView from '../view/button-view.js';
import Observable from '../framework/observable.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class Presenter extends Observable{
  #pointsContainer = new TripsContainer();
  #headerElement;
  #mainContainerElement;
  #loadingComponent;
  #pointsModel;
  #filterModel;

  #noPointsComponent = null;
  #sortElement = null;
  #currentSort = SORT_TYPES.DEFAULT;
  #filterType = FILTER_TYPES.ALL;
  #pointPresenters = new Map();
  #isLoading = true;
  #offersModel;
  #destinationsModel;
  #addPointPresenter;
  #filtersElement;

  #uiBlocker = new UiBlocker({
    lowerLimit: TIME_LIMIT.LOWER_LIMIT,
    upperLimit: TIME_LIMIT.UPPER_LIMIT
  });

  addPointButtonComponent = new addPointButtonView({
    onClick: () => {
      this.#createPoint();
      this.addPointButtonComponent.element.disabled = true;
    }});

  constructor(
    {
      controlsDiv,
      tripsSection,
      pointsModel,
      filterModel,
      offersModel,
      destinationsModel,
    }){
    super();
    this.#headerElement = controlsDiv;
    this.#mainContainerElement = tripsSection;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.addObserver(this.#handleModelEvent);

    Promise.all([
      this.#pointsModel.init(),
      this.#offersModel.init(),
      this.#destinationsModel.init(),
    ]).then(() => {
      this._notify(UPDATE_TYPES.INIT);
    }).finally(() => {
      render(this.addPointButtonComponent, document.querySelector('.page-body__container'));
      this.#renderFilters();

    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #createPoint() {
    this.#currentSort = SORT_TYPES.DEFAULT;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.ALL);
    this.#addPointPresenter.init();
  }

  init() {
    this.#renderComponents();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSort) {
      case SORT_TYPES.BY_TIME:
        return filteredPoints.sort(sortByTime);
      case SORT_TYPES.BY_PRICE:
        return filteredPoints.sort(sortByPrice);
      case SORT_TYPES.DEFAULT:
        return filteredPoints.sort(sortByDefault);
    }
    return filteredPoints;
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      {
        offers: this.#offersModel.offers,
        destinations: this.#destinationsModel.destinations,
        pointsContainer: this.#pointsContainer.element,
        onPointChange: this.#handleViewAction,
        onModeChange: this.#onModeChange,
      }
    );
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #onModeChange = () => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEmptyPoints(){
    this.#noPointsComponent = new EmptyPointsView({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#mainContainerElement);
  }

  #renderFilters(){
    this.#filtersElement = new FilterPresenter({
      filterContainer: this.#headerElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });
  }

  #handleViewAction = async (actionType, updateType, newPoint) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case USER_ACTIONS.UPDATE_POINT:
        this.#pointPresenters.get(newPoint.id).setSaving();
        try{
          await this.#pointsModel.updatePoint(updateType, newPoint);
        } catch(err){
          this.#pointPresenters.get(newPoint.id).setAbording();
        }
        break;
      case USER_ACTIONS.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try{
          await this.#pointsModel.addPoint(updateType, newPoint);
        } catch (err){
          this.#addPointPresenter.setAbording();
        }
        break;
      case USER_ACTIONS.DELETE_POINT:
        this.#pointPresenters.get(newPoint.id).setDeleting();
        try{
          await this.#pointsModel.deletePoint(updateType, newPoint);
        } catch (err) {
          this.pointPresenters.get(newPoint.id).setAbording();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UPDATE_TYPES.MINOR:
        this.#clearComponents();
        this.#renderComponents();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#clearComponents({resetSortType : true});
        this.#renderComponents();
        break;
      case UPDATE_TYPES.INIT:
        this.#addPointPresenter = new AddPointPresenter({
          pointsContainer: this.#pointsContainer,
          onDataChange: this.#handleViewAction,
          onDestroy: () => {this.addPointButtonComponent.element.disabled = false;},
          allOffers: this.#offersModel.offers,
          allDestinations: this.#destinationsModel.destinations,
        });

        this.#isLoading = false;
        this.#clearComponents();
        this.#renderComponents();
        break;
    }
  };

  #onSort = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }
    this.#currentSort = sortType;

    this.#clearComponents();
    this.#renderComponents();
  };

  #renderLoading(){
    this.#loadingComponent = new LoadingView();

    render(this.#loadingComponent, this.#mainContainerElement);
  }

  #renderSort(){
    this.#sortElement = new SortView({
      onSort: this.#onSort,
      currentSort: this.#currentSort
    });
    render(this.#sortElement, this.#mainContainerElement);
  }

  #clearComponents({ resetSortType = false} = {}) {
    this.#addPointPresenter.destroy();

    this.#clearPoints();
    remove(this.#sortElement);
    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    if (resetSortType) {
      this.#currentSort = SORT_TYPES.DEFAULT;
    }
  }

  #renderPointsContainer(){
    render(this.#pointsContainer, this.#mainContainerElement);
  }

  #initPoints(){
    this.#renderPointsContainer();

    if(this.#pointsModel.points.length === 0 && !this.#isLoading){
      this.#renderEmptyPoints();
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderComponents() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSort();
    this.#initPoints();
    this.#renderPoints(this.points);
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
