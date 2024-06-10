export const DATE_FORMAT_EDIT = 'DD/MM/YY HH:mm';
export const DATE_FORMAT_POINT_DAY = 'MMM DD';
export const DATE_FORMAT_DAY_RESULTS = 'DD MMM';
export const DATE_FORMAT_POINT_HOURS = 'HH:mm';

export const PresenterModes = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const SortTypes = {
  DEFAULT: 'default',
  BY_PRICE: 'price',
  BY_TIME: 'time',
};

export const FilterTypes = {
  ALL: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const BlancPoint = {
  type: 'flight',
  destination: null,
  cost: 0,
  date: {
    start: null,
    end: null,
  },
  offers: [
  ],
};

export const UserActions = {
  UPDATE_POINT: 'update',
  ADD_POINT: 'add',
  DELETE_POINT: 'delete',
};

export const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const TimeLimits = {
  LOWER: 300,
  UPPER: 1000,
};

export const AUTHORIZATION = 'Basic s799vigq9mit24m';
export const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

export const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
