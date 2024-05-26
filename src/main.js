import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/point-model.js';
import FiltersModel from './model/filters-model.js';
import PointsApiService from './api-service/point-api-service';
import { AUTHORIZATION, END_POINT } from './const.js';
import OffersModel from './model/offers-model.js';
import OffersApiService from './api-service/offers-api-service.js';
import DestinationsModel from './model/destinations-model.js';
import DestinationsApiService from './api-service/destinations-api-service.js';

const pageBody = document.querySelector('.page-body');
const mainContainer = pageBody.querySelector('.trip-events');
const pointsContainer = pageBody.querySelector('.trip-events__list');
const headerElement = pageBody.querySelector('.trip-controls');

const points = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const offers = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const destinations = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FiltersModel();

const tripPresenter = new TripPresenter(
  {
    controlsDiv: headerElement,
    tripsSection: mainContainer,
    pointsUl: pointsContainer,
    destinationsModel: destinations,
    offersModel: offers,
    pointsModel: points,
    filterModel: filterModel,
  }
);

tripPresenter.init();
