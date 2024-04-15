
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  sortComponent = new SortView();
  pointListComponent = new PointListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.pointListComponent, this.container);
    render(new EditPointView, this.pointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView, this.pointListComponent.getElement());
    }
  }
}
