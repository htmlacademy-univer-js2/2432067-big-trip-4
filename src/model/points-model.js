import { generatePoint } from '../mock/point.js';
import { POINT_COUNT } from '../const.js';

export default class PointsModel {
  #points;

  constructor() {
    this.#points = Array.from({ length: POINT_COUNT }, generatePoint);
  }

  getPoints() {
    return this.#points;
  }
}
