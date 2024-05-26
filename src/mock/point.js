import { getRandomArrayElement, getRandomInt } from '../utils.js';
import { POINT_TYPES, DESTINATIONS, POINTS_COUNT, PHOTOS_COUNT, MAX_PRICE, DATES } from '../const.js';
import { OFFERS, getOffersId } from './offers.js';
import { nanoid } from 'nanoid';

const createPoint = () =>({
  type: getRandomArrayElement(POINT_TYPES),
  destination: getRandomArrayElement(DESTINATIONS),
  cost: getRandomInt(MAX_PRICE),
  date:getRandomArrayElement(DATES),
  offers:{
    id: 0,
  },
  desctiption:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  photosSrc:[`https://loremflickr.com/248/152?random=${getRandomInt(PHOTOS_COUNT)}`],
});

const mockPoints = Array.from( {length: POINTS_COUNT} , createPoint);

const getRandomPoint = () => {
  const point = getRandomArrayElement(mockPoints);
  return {
    ...point,
    id: nanoid(),
    offers:{
      id: getOffersId(point.type),
    },
    activeOffers:
      OFFERS[getOffersId(point.type)],
  };
};

export {getRandomPoint};
