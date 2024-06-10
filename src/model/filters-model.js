import { FilterTypes } from '../const.js';
import Observable from '../framework/observable.js';

export default class FiltersModel extends Observable {
  #filter = FilterTypes.ALL;

  get filter(){
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;

    this._notify(updateType, filter);
  }
}
