import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { TIME_PERIODS } from '../const';


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min, max) {
  return Math.round((max - min) * Math.random() + min);
}

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : dayjs().format(format);
}

function getDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (timeDiff >= TIME_PERIODS.MIN_IN_YEAR) {
    return dayjs.duration(timeDiff, 'minutes').format('YY[Y] DD[D] HH[H] mm[M]');
  } else if (timeDiff >= TIME_PERIODS.MIN_IN_DAY) {
    return dayjs.duration(timeDiff, 'minutes').format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= TIME_PERIODS.MIN_IN_HOUR) {
    return dayjs.duration(timeDiff, 'minutes').format('HH[H] mm[M]');
  } else {
    return dayjs.duration(timeDiff, 'minutes').format('mm[M]');
  }
}

function getLastWord(string) {
  const words = string.split(' ');
  return words.at(-1);
}

function upperFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export { getRandomArrayElement, getRandomInteger, humanizeDate, getDuration, getLastWord, upperFirstChar};
