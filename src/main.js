import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/point-model.js';
import FiltersModel from './model/filters-model.js';
import addPointButtonView from './view/button-view.js';
import { render } from './framework/render.js';

const pageBody = document.querySelector('.page-body');
const mainContainer = pageBody.querySelector('.trip-events');
const pointsContainer = pageBody.querySelector('.trip-events__list');
const headerElement = pageBody.querySelector('.trip-controls');

const points = new PointsModel();
const filterModel = new FiltersModel();

const tripPresenter = new TripPresenter(
  {
    controlsDiv: headerElement,
    tripsSection: mainContainer,
    pointsUl: pointsContainer,
    pointsModel: points,
    filterModel: filterModel,
    onAddTaskClose: handleNewPointFormClose
  }
);

const newTaskButtonComponent = new addPointButtonView({
  onClick: handleAddPointButtonClick
});

function handleNewPointFormClose() {
  newTaskButtonComponent.element.disabled = false;
}

function handleAddPointButtonClick() {
  tripPresenter.createPoint();
  newTaskButtonComponent.element.disabled = true;
}

render(newTaskButtonComponent, document.querySelector('.page-body__container'));

tripPresenter.init();
