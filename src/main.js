import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filters-view.js';
import TripInfoView from './view/trip-info-view.js';

const siteMainElement = document.querySelector('.trip-main');
const filterElement = siteMainElement.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');

const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel({ destinationModel, offersModel });

const tripPresenter = new TripPresenter({ tripContainer, pointsModel });


render(new TripInfoView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

tripPresenter.init();
