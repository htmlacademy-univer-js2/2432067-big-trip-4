import { getRandomArrayElement, getRandomInteger } from '../utils';
import { DESTINATIONS, DESCRIPTIONS } from '../const';

const destinations = DESTINATIONS.map((item, index) => ({
  id: index,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: item,
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }, {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }, {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    }]
}));

function getRandomDestination() {
  return getRandomArrayElement(destinations);
}

function getDestinations() {
  return destinations;
}

export { getRandomDestination, getDestinations };
