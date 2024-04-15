import { generatePoint } from '../mock/point';

const POINT_COUNT = 6;

export default class PointsModel {
  #points;

  constructor() {
    this.#points = Array.from({ length: POINT_COUNT }, generatePoint);
  }

  getPoints() {
    return this.#points;
  }
}
