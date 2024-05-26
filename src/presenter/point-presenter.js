import { render, replace, remove } from '../framework/render.js';
import EditorView from '../view/edit-view.js';
import TripsView from '../view/points-view.js';
import {USER_ACTIONS, UPDATE_TYPES, PRESENTER_MODES } from '../const.js';
import { isEscKey } from '../utils.js';

export default class PointPresenter {

  #pointComponent = null;
  #editComponent = null;
  #point = null;
  #pointsContainer = null;
  #onPointChange = null;
  #onModeChange = null;
  #mode = PRESENTER_MODES.DEFAULT;

  constructor({pointsContainer, onPointChange, onModeChange}){
    this.#pointsContainer = pointsContainer;
    this.#onPointChange = onPointChange;

    this.#onModeChange = onModeChange;
  }

  #onDocumentKeyDown = (evt) => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.#editComponent.reset(this.#point);
      this.#replaceEditToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeyDown);
    }
  };

  init(point) {

    const prevPoint = this.#pointComponent;
    const prevEdit = this.#editComponent;

    this.#point = point;
    this.#pointComponent = new TripsView(
      {
        point: this.#point,
        onTripClick: () => {
          this.#replacePointToEdit();
          document.addEventListener('keydown', this.#onDocumentKeyDown);
        },
        onFavoriteClick: this.#onFavoriteClick,
        onSubmit: this.#onFormSubmit
      }
    );

    this.#editComponent = new EditorView(
      {
        point: this.#point,
        onSubmit: this.#onFormSubmit,
        deletePoint: this.#onDeletePoint
      }
    );

    if(prevPoint === null || prevEdit === null){
      render(this.#pointComponent, this.#pointsContainer);
      return;
    }

    if(this.#mode === PRESENTER_MODES.DEFAULT){
      replace(this.#pointComponent, prevPoint);
    }

    if(this.#mode === PRESENTER_MODES.EDITING){
      replace(this.#editComponent, prevEdit);
    }

    remove(prevPoint);
    remove(prevEdit);
  }

  resetView(){
    if (this.#mode !== PRESENTER_MODES.DEFAULT){
      this.#editComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #replacePointToEdit () {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onDocumentKeyDown);
    this.#onModeChange();
    this.#mode = PRESENTER_MODES.EDITING;
  }

  #replaceEditToPoint () {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#onDocumentKeyDown);
    this.#mode = PRESENTER_MODES.DEFAULT;
  }

  #onFormSubmit = (update) => {
    if(update === undefined){
      this.#editComponent.reset(this.#point);
      this.#replaceEditToPoint();
      return;
    }
    const isMajor = () =>
      update.cost !== this.#point.cost ||
        update.date.start !== this.#point.date.start ||
        update.type !== this.#point.type;

    this.#onPointChange(
      USER_ACTIONS.UPDATE_POINT,
      isMajor() ? UPDATE_TYPES.MAJOR : UPDATE_TYPES.MINOR,
      update
    );
  };

  #onDeletePoint = (point) =>{
    this.#onPointChange(
      USER_ACTIONS.DELETE_POINT,
      UPDATE_TYPES.MAJOR,
      point,
    );
  };

  #onFavoriteClick = ( ) => {
    this.#onPointChange(
      USER_ACTIONS.UPDATE_POINT,
      UPDATE_TYPES.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };
}
