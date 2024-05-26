import { render, replace, remove } from '../framework/render.js';
import EditorView from '../view/edit-view.js';
import TripsView from '../view/points-view.js';
import { PRESENTER_MODES } from '../const.js';


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
    if (evt.key === 'Escape') {
      evt.preventDefault();
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
      }
    );

    this.#editComponent = new EditorView(
      {
        point: this.#point,
        onEditClick: () =>{
          this.#replaceEditToPoint();
          document.removeEventListener('keydown', this.#onDocumentKeyDown);
        }
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
      this.#replaceEditToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #replacePointToEdit () {
    replace(this.#editComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = PRESENTER_MODES.EDITING;
  }

  #replaceEditToPoint () {
    replace(this.#pointComponent, this.#editComponent);
    this.#mode = PRESENTER_MODES.DEFAULT;
  }

  #onFavoriteClick = ( ) => {
    this.#onPointChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
