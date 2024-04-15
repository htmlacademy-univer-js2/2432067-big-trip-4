import { upperFirstChar } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filters) {
  return `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">

    ${filters.map(({ type }) => (`<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
      <label class="trip-filters__filter-label" for="filter-${type}">${upperFirstChar(type)}</label>
    </div>`)).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>
</div>`;
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
