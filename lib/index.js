const cheerio = require("cheerio");
const axios = require("axios");
const _ = require("lodash");

const {
  month,
  today,
  formatYYYYMMDD,
  formatYYYYMM,
  monthList,
} = require("./date");

/**
 * Connect Github
 *
 * @param {user} Github_username
 * @return {$, lst}
 */
const requestUserToGithub = async (user) => {
  const html = await axios.get(
    `https://github.com/users/${user}/contributions`
  );

  const $ = cheerio.load(html.data);
  const lst = $("body").find("g").children("rect");

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
 * Get Commit Stat
 *
 * @param {user} Github_username
 * @return {total_year_commit, total_month_commit, today_commit, result}
 */
const getCommitStat = async (user) => {
  const result = await getCommitDetailList(user);
  const total_year_commit = await getYearCommitCount(user);
  const total_month_commit = await getMonthCommitCount(user);
  const today_commit = await getDayCommitCount(user);

  return { total_year_commit, total_month_commit, today_commit, result };
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
  let count, date, level;

  lst.each((index, commit) => {
    count = Number($(commit).attr("data-count"));
    date = formatYYYYMMDD($(commit).attr("data-date"));
    level = Number($(commit).attr("data-level"));

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
    date = formatYYYYMM($(commit).attr("data-date"));
    result[index] = date;
  });

  return _.uniq(result);
};

/**
 * Get daily commit count
 *
 * @param {user} Github_username
 * @return {today_commit}
 */
const getDayCommitCount = async (user) => {
  const { $, lst } = await requestUserToGithub(user);

  let count, date;
  let today_commit = 0;

  lst.each((index, commit) => {
    date = formatYYYYMMDD($(commit).attr("data-date"));
    count = Number($(commit).attr("data-count"));
    if (date == today) today_commit = count;
  });

  return today_commit;
};

/**
 * Get year commit count
 *
 * @param {user} Github_username
 * @return {total_year_commit}
 */
const getYearCommitCount = async (user) => {
  const { $, lst } = await requestUserToGithub(user);

  let count;
  let total_year_commit = 0;

  lst.each((index, commit) => {
    count = Number($(commit).attr("data-count"));
    total_year_commit += count;
  });

  return total_year_commit;
};

/**
 * Get monthly commit count
 *
 * @param {user} Github_username
 * @return {total_month_commit}
 */
const getMonthCommitCount = async (user) => {
  const { $, lst } = await requestUserToGithub(user);

  let count, target;
  let total_month_commit = 0;

  lst.each((index, commit) => {
    target = formatYYYYMM($(commit).attr("data-date"));
    if (target == month) {
      count = Number($(commit).attr("data-count"));
      total_month_commit += count;
    }
  });

  return total_month_commit;
};

/**
 * Get commit count of specific month
 *
 * @param {user, month} Github_username_and_month
 * @return {total_month_commit}
 */
const getSpecificMonthCommitCount = async (user, month) => {
  const { $, lst } = await requestUserToGithub(user);

  let count, target;
  let total_month_commit = 0;

  lst.each((index, commit) => {
    target = formatYYYYMM($(commit).attr("data-date"));
    if (target == month) {
      count = Number($(commit).attr("data-count"));
      total_month_commit += count;
    }
  });

  return total_month_commit;
};

/**
 * Get each month commit count
 *
 * @param {user} Github_username
 * @return {commit}
 */
const getEachMonthCommitCount = async (user) => {
  const commits = await getCommitDetailList(user);
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
  const commit = $("body")
    .find("div.Box-header div ul span")
    .children("strong")
    .text();

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
  let size = users.length;
  for (let user of users) {
    let index = users.indexOf(user);
    let today_commit = await getDayCommitCount(user);

    result.push({
      user: user,
      commit: today_commit,
    });

    console.log(`[${index + 1}/${size}] 커밋 데이터 파싱중`);
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
    let total_month_commit = await getMonthCommitCount(user);
    result.push({
      user: user,
      monthly_commit: total_month_commit,
    });
  }

  return result;
};

module.exports = {
  requestUserToGithub,
  requestOrgToGithub,
  getGithubYearToMonth,
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
