import { FILTER_TYPES } from '../const.js';
import Observable from '../framework/observable.js';

export default class FiltersModel extends Observable {

  #filter = FILTER_TYPES.ALL;

  get filters(){
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
