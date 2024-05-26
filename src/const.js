export const PHOTOS_COUNT = 20;
export const MAX_PRICE = 2000;
export const MAX_OFFER_ID = 5;
export const POINTS_COUNT = 4;

export const PRESENTER_MODES = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

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
