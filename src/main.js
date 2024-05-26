import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import { POINTS_COUNT } from './const.js';

const pageBody = document.querySelector('.page-body');
const tripsContainer = pageBody.querySelector('.trip-events');
const headerElement = pageBody.querySelector('.trip-controls');

const points = new PointsModel();
const filters = new FiltersModel(POINTS_COUNT);

const tripPresenter = new TripPresenter(
  {
    headerElement: headerElement,
    tripsElement: tripsContainer,
    pointsModel: points,
    filterModel: filters
  }
);

tripPresenter.init();
