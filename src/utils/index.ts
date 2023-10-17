import {
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  format,
  getDate,
  startOfWeek,
} from 'date-fns';
import es from 'date-fns/locale/es';
const locale = es;

// create a group by function that takes the array and a function to group by
export const groupBy = <T>(array: T[], key: (item: T) => string) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = key(obj);
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {} as {[key: string]: T[]});

export type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
  dateString: string;
};

export const getWeekDay = (_date: Date) => {
  const start = startOfWeek(_date, {weekStartsOn: 1});
  const final: WeekDay[] = [];

  for (let i = 0; i < 5; i++) {
    const date = addDays(start, i);
    final.push({
      formatted: format(date, 'EEE', {locale}),
      date,
      day: getDate(date),
      dateString: format(date, 'yyyy-MM-dd'),
    });
  }

  return final;
};

export const getMonthFromWeekDay = (weekDay: WeekDay[]) => {
  if (weekDay.length === 0) {
    return '';
  }

  let firstDayMonth = format(weekDay[0].date, 'MMMM', {locale});
  let lastDayMonth = format(weekDay[weekDay.length - 1].date, 'MMMM', {
    locale,
  });

  firstDayMonth = firstDayMonth === 'septiembre' ? 'setiembre' : firstDayMonth;
  lastDayMonth = lastDayMonth === 'septiembre' ? 'setiembre' : lastDayMonth;

  return firstDayMonth === lastDayMonth
    ? firstDayMonth
    : `${firstDayMonth} - ${lastDayMonth}`;
};

export const dateToStringYYYYMMDD = (date: Date) =>
  date ? format(date, 'yyyy-MM-dd') : '';

export const dateToStringDDMM = (date: Date) =>
  date ? format(date, 'dd/MM') : '';

export const formatTimeString = (datetime: string) => {
  if (!datetime) {
    return '';
  }

  return datetime.split(':').slice(0, 2).join(':');
};

export const addDateTimeDuration = (datetime: string, duration: string) => {
  // datetime and duration format: 00:00:00
  const date = new Date(`2020-01-01T${datetime}`);
  const [hours, minutes, seconds] = duration.split(':').map(Number);

  const newDate = addSeconds(
    addMinutes(addHours(date, hours), minutes),
    seconds,
  );

  return format(newDate, 'HH:mm', {locale});
};
