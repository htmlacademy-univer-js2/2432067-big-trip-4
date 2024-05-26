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
  INIT: 'INIT',
};

export const FILTER_TYPES = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const BLANC_TEST =
{
  type: 'bus',
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: [],
  activeOffers:
    0,
  description:'',
  photosSrc: ['https://loremflickr.com/248/152?random=$0)']
};

export const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';
export const DATE_FORMAT_POINT_DAY = 'MMM DD';
export const DATE_FORMAT_POINT_HOURS = 'hh-mm';

export const AUTHORIZATION = 'Basic y16e6n415ya12nsj12jkosad';
export const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';
