import SortView from '../view/sort-view.js';
import TripsContainer from '../view/tripsContainer-view.js';
import { remove, render } from '../framework/render.js';
import EmptyPointsView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { sortByTime, sortByEvent, sortByPrice, sortByOffers, sortByDefault, filter } from '../utils.js';
import { SORT_TYPES, UPDATE_TYPES, USER_ACTIONS, FILTER_TYPES } from '../const.js';
import FilterPresenter from './filter-presenter.js';
import AddPointPresenter from './add-point-presenter.js';

export default class TripPresenter {
  #pointsContainer = new TripsContainer();
  #headerElement;
  #onAddTaskClose;
  #mainContainerElement;
  #filtersElement;
  #pointsModel;
  #filterModel;

  #noPointsComponent = null;
  #sortElement = null;
  #currentSort = SORT_TYPES.DEFAULT;
  #filterType = FILTER_TYPES.ALL;
  #pointPresenters = new Map();
  #addPointButton;
  #addPointPresenter;

  constructor(
    {
      controlsDiv,
      tripsSection,
      pointsModel,
      filterModel,
      addPointButton,
      onAddTaskClose
    }){
    this.#headerElement = controlsDiv;
    this.#mainContainerElement = tripsSection;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#addPointButton = addPointButton;
    this.#onAddTaskClose = onAddTaskClose;

    this.#addPointPresenter = new AddPointPresenter({
      pointsContainer: this.#mainContainerElement,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onAddTaskClose
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  createPoint() {
    this.#currentSort = SORT_TYPES.DEFAULT;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.ALL);
    this.#addPointPresenter.init();
  }

  init() {
    this.#renderFilters();
    this.#renderComponents();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSort) {
      case SORT_TYPES.BY_TIME:
        return filteredPoints.sort(sortByTime);
      case SORT_TYPES.BY_NAME:
        return filteredPoints.sort(sortByEvent);
      case SORT_TYPES.BY_PRICE:
        return filteredPoints.sort(sortByPrice);
      case SORT_TYPES.BY_OFFERS:
        return filteredPoints.sort(sortByOffers);
      case SORT_TYPES.DEFAULT:
        return filteredPoints.sort(sortByDefault);
    }
    return filteredPoints;
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      {
        pointsContainer: this.#pointsContainer.element,
        onPointChange: this.#handleViewAction,
        onModeChange: this.#onModeChange
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

    render(new EmptyPointsView(), this.#mainContainerElement);
  }

  #handleViewAction = (actionType, updateType, newPoint) => {
    switch (actionType) {
      case USER_ACTIONS.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, newPoint);
        break;
      case USER_ACTIONS.ADD_POINT:
        this.#pointsModel.addPoint(updateType, newPoint);
        break;
      case USER_ACTIONS.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, newPoint);
        break;
    }
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

  #renderSort(){
    this.#sortElement = new SortView({
      onSort: this.#onSort,
      currentSort: this.#currentSort
    });
    render(this.#sortElement, this.#mainContainerElement);
  }

  #clearComponents({ resetSortType = false} = {}) {
    this.#addPointPresenter.destroy();
    remove(this.#pointsContainer);
    this.#clearPoints();
    remove(this.#sortElement);


    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    if (resetSortType) {
      this.#currentSort = SORT_TYPES.DEFAULT;
    }
  }

  #renderFilters(){
    this.#filtersElement = new FilterPresenter({
      filterContainer: this.#headerElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });
  }

  #renderPointsContainer(){
    render(this.#pointsContainer, this.#mainContainerElement);
  }

  #initPoints(){
    this.#renderPointsContainer();

    if(this.#pointsModel.points.length === 0){
      this.#renderEmptyPoints();
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderComponents() {
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
