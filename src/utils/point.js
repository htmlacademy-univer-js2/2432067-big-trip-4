import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);
import { TimePeriods } from '../const.js';

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : dayjs().format(format);
}

function getDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (timeDiff >= TimePeriods.MIN_IN_YEAR) {
    return dayjs.duration(timeDiff, 'minutes').format('YY[Y] DD[D] HH[H] mm[M]');
  } else if (timeDiff >= TimePeriods.MIN_IN_DAY) {
    return dayjs.duration(timeDiff, 'minutes').format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= TimePeriods.MIN_IN_HOUR) {
    return dayjs.duration(timeDiff, 'minutes').format('HH[H] mm[M]');
  } else {
    return dayjs.duration(timeDiff, 'minutes').format('mm[M]');
  }
}

function isPointFuture(dateFrom) {
  return dayjs(dateFrom).isAfter(dayjs());
}

function isPointPresent(dateTo) {
  return dayjs(dateTo).isBefore(dayjs());
}

function isPointPast(dateFrom, dateTo) {
  const now = dayjs();
  return now.isSameOrAfter(dateFrom) && now.isSameOrBefore(dateTo);
}

export { humanizeDate, getDuration, isPointFuture, isPointPresent, isPointPast};
