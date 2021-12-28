const { format, differenceInDays, getDaysInYear } = require('date-fns');

const getToday = () => {
  return format(new Date(), 'yyyy-MM-dd');
};
const getYearAgo = () => {
  const today = getToday();
  return format(new Date(today)
    .setFullYear(new Date().getFullYear() - 1), 'yyyy-MM-dd');
};
const isInLastYear = (createdAt, updatedAt) => {
  const now = new Date().getTime();
  createdAt = new Date(createdAt).getTime();
  updatedAt = new Date(updatedAt).getTime();
  const daysInCurrentYear = getDaysInYear(new Date(now));
  return differenceInDays(createdAt, now) < daysInCurrentYear ||
    differenceInDays(updatedAt, now) < daysInCurrentYear;
};

module.exports = { getToday, getYearAgo, isInLastYear };