import TripPresenter from './presenter/trip-presenter.js';
import { render, RenderPosition } from './render.js';
import FilterView from './view/filters-view.js';
import TripInfoView from './view/trip-info-view.js';

const siteMainElement = document.querySelector('.trip-main');
const filterElement = siteMainElement.querySelector('.trip-controls__filters');
const tripContanier = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({ container: tripContanier});


render(new TripInfoView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

tripPresenter.init();
