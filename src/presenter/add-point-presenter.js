import { remove, render } from '../framework/render.js';
import EditorView from '../view/edit-view.js';
import { nanoid } from 'nanoid';
import { USER_ACTIONS, UPDATE_TYPES } from '../const.js';
import { isEscKey } from '../utils.js';

export default class AddPointPresenter {
  #pointsContainer = null;
  #onDataChange = null;
  #onDestroy = null;

  #editorComponent = null;

  constructor({pointsContainer, onDataChange, onDestroy}) {
    this.#pointsContainer = pointsContainer;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if (this.#editorComponent !== null) {
      return;
    }


    this.#editorComponent = new EditorView({
      onSubmit: this.#handleFormSubmit,
      deletePoint: this.#handleDeleteClick
    });

    render(this.#editorComponent, this.#pointsContainer);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editorComponent === null) {
      return;
    }

    this.#onDestroy();

    remove(this.#editorComponent);
    this.#editorComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    if(point === undefined){
      return;
    }
    this.#onDataChange(
      USER_ACTIONS.ADD_POINT,
      UPDATE_TYPES.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
