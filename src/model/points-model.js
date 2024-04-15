import { generatePoint } from '../mock/point';

const POINT_COUNT = 6;

export default class PointsModel {
  constructor({ destinationModel, offersModel }) {
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
    this.points = Array.from({ length: POINT_COUNT }, generatePoint);
  }

  getPoints() {
    return this.points;
  }
}
