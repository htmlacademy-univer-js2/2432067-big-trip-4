
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  constructor({ tripContainer, pointsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.itemsOfList = [new EditPointView({ point: this.points[0], offersOfThisType: this.pointsModel.offersModel.getOffersByType(this.points[0].type) }).getTemplate()];

    for (let i = 1; i < this.points.length; i++) {
      this.itemsOfList.push(new PointView({ point: this.points[i] }).getTemplate());
    }

    render(new SortView(), this.tripContainer);
    render(
      new PointListView({ items: this.itemsOfList }),
      this.tripContainer
    );
  }
}
