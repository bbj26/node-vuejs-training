const { format, differenceInDays } = require('date-fns');

const getToday = () => {
  return format(new Date(), 'yyyy-MM-dd');
};
const getYearAgo = () => {
  const today = getToday();
  return format(new Date(today)
    .setFullYear(new Date().getFullYear() - 1), 'yyyy-MM-dd');
};
const isInLast365Days = (createdAt, updatedAt) => {
  const now = new Date().getTime();
  createdAt = new Date(createdAt).getTime();
  updatedAt = new Date(updatedAt).getTime();
  if (differenceInDays(createdAt, now) < 365 ||
    differenceInDays(updatedAt, now) < 365) {
    return true;
  } else return false;
};

module.exports = { getToday, getYearAgo, isInLast365Days };