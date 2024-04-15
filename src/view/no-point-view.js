import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate() {
  return '<p class="trip-events__msg">Click on New event button to create your first point</p>';
}

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
