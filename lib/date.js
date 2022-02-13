const dayjs = require("dayjs");

const today = dayjs().format("YYYY-MM-DD");

const year = dayjs().format("YYYY");

const month = dayjs().format("YYYY-MM");

const monthList = [
  `${year}-01`,
  `${year}-02`,
  `${year}-03`,
  `${year}-04`,
  `${year}-05`,
  `${year}-06`,
  `${year}-07`,
  `${year}-08`,
  `${year}-09`,
  `${year}-10`,
  `${year}-11`,
  `${year}-12`,
];

const formatYYYYMMDD = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

const formatYYYYMM = (date) => {
  return dayjs(date).format("YYYY-MM");
};

const formatMM = (date) => {
  return dayjs(date).format("MM");
};

module.exports = {
  today,
  year,
  month,
  monthList,
  formatYYYYMMDD,
  formatYYYYMM,
  formatMM,
};
