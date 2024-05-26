export const PHOTOS_COUNT = 20;
export const MAX_PRICE = 2000;
export const MAX_OFFER_ID = 5;
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

export const DATES = [
  {
    start: new Date(Date.UTC(2024, 8, 28, 8, 15, 0, 0)),
    end: new Date(Date.UTC(2024, 8, 28, 10, 16, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 8, 20, 18, 30, 10, 0)),
    end: new Date(Date.UTC(2024, 8, 21, 22, 30, 10, 0))
  },
  {
    start: new Date(Date.UTC(2024, 8, 25, 11, 14, 0, 0)),
    end: new Date(Date.UTC(2024, 8, 25, 14, 0, 0, 0))
  },
  {
    start: new Date(Date.UTC(2024, 8, 25, 12, 1, 0, 0)),
    end: new Date(Date.UTC(2024, 8, 25, 12, 2, 0, 0))
  },
];

export const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Saint Petersburg', 'Vienna'];

export const BLANC_TEST =
{
  type: null,
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: {
    id: 0
  },
  desctiption:'',
  photosSrc: []
};

export const DATE_FORMAT_EDIT = 'DD/MM/YY hh:mm';
export const DATE_FORMAT_POINT_DAY = 'MMM DD';
export const DATE_FORMAT_POINT_HOURS = 'hh-mm';
