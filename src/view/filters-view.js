import { FILTER_TYPES } from '../const.js';
import { upperFirstChar } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate() {
  return `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">

    ${FILTER_TYPES.map((item) => (`<div class="trip-filters__filter">
      <input id="filter-${item}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item}">
      <label class="trip-filters__filter-label" for="filter-${item}">${upperFirstChar(item)}</label>
    </div>`)).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>
</div>`;
}

export default class FilterView extends AbstractView{
  get template() {
    return createFilterTemplate();
  }
}
