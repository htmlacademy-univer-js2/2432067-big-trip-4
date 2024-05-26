import AbstractView from '../framework/view/abstract-view.js';
import {FILTER_TYPES} from '../const.js';

const noPointsMessage = {
  [FILTER_TYPES.ALL]: 'Click New Event to create your first point',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
  [FILTER_TYPES.PRESENT]: 'There are no present events now',
  [FILTER_TYPES.PAST]: 'There are no past events now',
};

const createEmptyPoint = (filterType) =>
  `
  <p class="trip-events__msg">${noPointsMessage[filterType]}</p>
  `;

export default class EmptyPointsView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyPoint(this.#filterType);
  }
}
