import { OFFERS, getOffersId } from './mock/offers.js';

export const PHOTOS_COUNT = 20;
export const MAX_PRICE = 2000;
export const POINTS_COUNT = 4;

export const PRESENTER_MODES = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const SORT_TYPES = {
  DEFAULT: 'default',
  BY_PRICE: 'price',
  BY_TIME: 'time',
  BY_OFFERS: 'offers',
  BY_NAME: 'name',
};

export const USER_ACTIONS = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
};


export const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FILTER_TYPES = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const DATES = [
  {
    start: new Date(Date.UTC(2024, 8, 25, 11, 14, 0, 0)),
    end: new Date(Date.UTC(2024, 8, 25, 14, 0, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 5, 25, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 5, 25, 12, 2, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 5, 11, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 5, 25, 12, 2, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 0, 25, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 0, 25, 12, 2, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 4, 10, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 4, 20, 12, 2, 0, 0))
  },
];

export const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Saint Petersburg', 'Vienna'];

export const BLANC_TEST =
{
  type: 'Bus',
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: {
    id: 0
  },
  activeOffers:
    OFFERS[getOffersId('default')],
  desctiption:'',
  photosSrc: ['https://loremflickr.com/248/152?random=$0)']
};

export const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';
export const DATE_FORMAT_POINT_DAY = 'MMM DD';
export const DATE_FORMAT_POINT_HOURS = 'hh-mm';
