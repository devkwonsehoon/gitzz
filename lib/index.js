/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
const cheerio = require('cheerio');
const axios = require('axios');
const _ = require('lodash');
const dayjs = require('dayjs');

const getMonthList = (year) => {
  return [`${year}-01`, `${year}-02`, `${year}-03`, `${year}-04`, `${year}-05`, `${year}-06`, `${year}-07`, `${year}-08`, `${year}-09`, `${year}-10`, `${year}-11`, `${year}-12`];
};

const formatYYYYMMDD = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const formatYYYYMM = (date) => {
  return dayjs(date).format('YYYY-MM');
};

// const formatMM = (date) => {
//   return dayjs(date).format('MM');
// };

/**
 * Connect Github
 *
 * @param {user} Github_username
 * @return {$, lst}
 */
const requestUserToGithub = async (user) => {
  const html = await axios.get(`https://github.com/users/${user}/contributions`);

  const $ = cheerio.load(html.data);
  const lst = $('body').find('g').children('rect');

  return { $, lst };
};

/**
 * Connect Github Oragization
 *
 * @param {org, repo} Github_Org_and_Repo_name
 * @return {$}
 */
const requestOrgToGithub = async (org, repo) => {
  const html = await axios.get(`https://github.com/${org}/${repo}`);
  const $ = cheerio.load(html.data);
  return $;
};

/**
 * Get Commit date list
 *
 * @param {user} Github_username
 * @return {result}
 */
const getCommitDetailList = async (user) => {
  const { $, lst } = await requestUserToGithub(user);

  let result = [];
  let count;
  let date;
  let level;

  lst.each((index, commit) => {
    count = Number($(commit).attr('data-count'));
    date = formatYYYYMMDD($(commit).attr('data-date'));
    level = Number($(commit).attr('data-level'));

    result[index] = {
      count: count,
      date: date,
      level: level,
    };
  });

  return result;
};

/**
 * Calculate a year on Github Contribution
 *
 * @param {user} Github_username
 * @return {result}
 */
const getGithubYearToMonth = async (user) => {
  const { $, lst } = await requestUserToGithub(user);

  let result = [];
  let date;

  lst.each((index, commit) => {
    date = formatYYYYMM($(commit).attr('data-date'));
    result[index] = date;
  });

  return _.uniq(result);
};

/**
 * Get daily commit count
 *
 * @param {user} Github_username
 * @return {todayCommit}
 */
const getDayCommitCount = async (user) => {
  const { $, lst } = await requestUserToGithub(user);
  const today = dayjs().format('YYYY-MM-DD');

  let count;
  let date;
  let todayCommit = 0;

  lst.each((index, commit) => {
    date = formatYYYYMMDD($(commit).attr('data-date'));
    count = Number($(commit).attr('data-count'));
    if (date === today) todayCommit = count;
  });

  return todayCommit;
};

/**
 * Get year commit count
 *
 * @param {user} Github_username
 * @return {yearTotalCommit}
 */
const getYearCommitCount = async (user) => {
  const { $, lst } = await requestUserToGithub(user);

  let count;
  let yearTotalCommit = 0;

  lst.each((index, commit) => {
    count = Number($(commit).attr('data-count'));
    yearTotalCommit += count;
  });

  return yearTotalCommit;
};

/**
 * Get monthly commit count
 *
 * @param {user} Github_username
 * @return {monthTotalCommit}
 */
const getMonthCommitCount = async (user) => {
  const { $, lst } = await requestUserToGithub(user);
  const month = dayjs().format('YYYY-MM');

  let count;
  let target;
  let monthTotalCommit = 0;

  lst.each((index, commit) => {
    target = formatYYYYMM($(commit).attr('data-date'));
    if (target === month) {
      count = Number($(commit).attr('data-count'));
      monthTotalCommit += count;
    }
  });

  return monthTotalCommit;
};

/**
 * Get commit count of specific month
 *
 * @param {user, month} Github_username_and_month
 * @return {monthTotalCommit}
 */
const getSpecificMonthCommitCount = async (user, month) => {
  const { $, lst } = await requestUserToGithub(user);

  let count;
  let target;
  let monthTotalCommit = 0;

  lst.each((index, commit) => {
    target = formatYYYYMM($(commit).attr('data-date'));
    if (target === month) {
      count = Number($(commit).attr('data-count'));
      monthTotalCommit += count;
    }
  });

  return monthTotalCommit;
};

/**
 * Get each month commit count
 *
 * @param {user} Github_username
 * @return {commit}
 */
const getEachMonthCommitCount = async (user) => {
  const commits = await getCommitDetailList(user);
  const year = dayjs().format('YYYY');
  const monthList = getMonthList(year);

  let result = [];

  for (let month of monthList) {
    let count = 0;
    for (let commit of commits) {
      if (_.includes(commit.date, month)) {
        if (commit.count > 0) count++;
      }
    }
    result.push(count);
  }

  return result;
};

/**
 * Get commit count of org/repo
 *
 * @param {org, repo} Github_Org_and_Repo_name
 * @return {commit}
 */
const getOrgCommitCount = async (org, repo) => {
  const $ = await requestOrgToGithub(org, repo);
  const commit = $('body').find('div.Box-header div ul span').children('strong').text();

  return commit;
};

/**
 * Get commit count of people
 *
 * @param {users} Github_username_list
 * @return {result}
 */
const getDayCommitCountOfPeople = async (users) => {
  let result = [];
  for (let user of users) {
    let todayCommit = await getDayCommitCount(user);
    result.push({
      user: user,
      commit: todayCommit,
    });
  }

  return result;
};

/**
 * Get monthly commit count of people
 *
 * @param {users} Github_username_list
 * @return {result}
 */
const getMonthCommitCountOfPeople = async (users) => {
  let result = [];

  for (let user of users) {
    let monthTotalCommit = await getMonthCommitCount(user);
    result.push({
      user: user,
      monthly_commit: monthTotalCommit,
    });
  }

  return result;
};

/**
 * Get Commit Stat
 *
 * @param {user} Github_username
 * @return {yearTotalCommit, monthTotalCommit, todayCommit, result}
 */
const getCommitStat = async (user) => {
  const result = await getCommitDetailList(user);
  const yearTotalCommit = await getYearCommitCount(user);
  const monthTotalCommit = await getMonthCommitCount(user);
  const todayCommit = await getDayCommitCount(user);

  return { yearTotalCommit, monthTotalCommit, todayCommit, result };
};

module.exports = {
  getCommitStat,
  getCommitDetailList,
  getDayCommitCount,
  getYearCommitCount,
  getOrgCommitCount,
  getDayCommitCountOfPeople,
  getMonthCommitCount,
  getMonthCommitCountOfPeople,
  getSpecificMonthCommitCount,
  getEachMonthCommitCount,
};
