import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';
import dayjs from 'dayjs';

/**
 * Connect Github
 *
 * @param {user} Github_username
 * @return {$, lst}
 */
export const requestUserToGithub = async (username: string): Promise<any> => {
  try {
    const html = await axios.get(`https://github.com/users/${username}/contributions`, {
      validateStatus(status: number) {
        return status === 200;
      },
    });

    const $ = load(html.data);
    const lst = $('body').find('g').children('rect');

    return { $, lst };
  } catch (error) {
    return null;
  }
};

/**
 * Get daily commit count
 *
 * @param {user} username
 * @return {todayCommit}
 */
export const getDayCommitCount = async (username: string): Promise<number> => {
  const response = await requestUserToGithub(username);
  if (!response) {
    return null;
  }
  const { $, lst } = response;
  const today = dayjs().add(9, 'h').format('YYYY-MM-DD');

  let date: string,
    contributionString: string,
    todayCommitCount: number = 0;

  lst.each((index: number, commit: any) => {
    date = $(commit).attr('data-date');
    contributionString = String(commit.children[0].data).split(' ').at(0);

    if (date === today && contributionString !== 'No') {
      todayCommitCount = Number(contributionString);
      return false;
    }
  });

  return todayCommitCount;
};

/**
 * Get yesterday commit count
 *
 * @param {user} username
 * @return {yesterdayCommitCount}
 */
export const getYesterdayCommitCount = async (username: string): Promise<number> => {
  const response = await requestUserToGithub(username);
  if (!response) {
    return null;
  }
  const { $, lst } = response;
  const target = dayjs().add(9, 'h').subtract(1, 'day').format('YYYY-MM-DD');

  let date: string,
    contributionString: string,
    yesterdayCommitCount: number = 0;

  lst.each((index: number, commit: any) => {
    date = $(commit).attr('data-date');
    contributionString = String(commit.children[0].data).split(' ').at(0);

    if (date === target && contributionString !== 'No') {
      yesterdayCommitCount = Number(contributionString);
      return false;
    }
  });

  return yesterdayCommitCount;
};

/**
 * Get monthly commit count
 *
 * @param {user} username
 * @return {monthCommitCount}
 */
export const getMonthCommitCount = async (username: string): Promise<number> => {
  const response = await requestUserToGithub(username);
  if (!response) {
    return null;
  }
  const { $, lst } = response;
  const month = dayjs().add(9, 'h').format('YYYY-MM');

  let date: string,
    contributionString: string,
    monthCommitCount: number = 0;

  lst.each((index: number, commit: any) => {
    date = dayjs($(commit).attr('data-date')).add(9, 'h').format('YYYY-MM');
    contributionString = String(commit.children[0].data).split(' ').at(0);

    if (date === month && contributionString !== 'No') {
      monthCommitCount += Number(contributionString);
    }
  });

  return monthCommitCount;
};

/**
 * Get year commit count
 *
 * @param {user} username
 * @return {yearCommitCount}
 */
export const getYearCommitCount = async (username: string): Promise<number> => {
  const response = await requestUserToGithub(username);
  if (!response) {
    return null;
  }
  const { $, lst } = response;

  let contributionString: string,
    yearCommitCount: number = 0;

  lst.each((index: number, commit: any) => {
    contributionString = String(commit.children[0].data).split(' ').at(0);

    if (contributionString !== 'No') {
      yearCommitCount += Number(contributionString);
    }
  });

  return yearCommitCount;
};

/**
 * Get commit statistics
 *
 * @param {user} username
 * @return { yesterdayCommitCount, monthCommitCount, yearCommitCount }
 */
export const getCommitStatistics = async (
  username: string,
): Promise<{
  yesterdayCommitCount: number;
  monthCommitCount: number;
  yearCommitCount: number;
}> => {
  const response = await requestUserToGithub(username);
  if (!response) {
    return null;
  }
  const { $, lst } = response;
  const yesterday = dayjs().add(9, 'h').subtract(1, 'day').format('YYYY-MM-DD');
  const month = dayjs().add(9, 'h').format('YYYY-MM');

  let count: number,
    date: string,
    monthDate: string,
    contributionString: string,
    yesterdayCommitCount: number = 0,
    monthCommitCount: number = 0,
    yearCommitCount: number = 0;

  lst.each((index: number, commit: any) => {
    date = $(commit).attr('data-date');
    monthDate = dayjs(date).add(9, 'h').format('YYYY-MM');
    contributionString = String(commit.children[0].data).split(' ').at(0);

    if (contributionString !== 'No') {
      count = Number(contributionString);
      if (date === yesterday) {
        yesterdayCommitCount = count;
      }
      if (monthDate === month) {
        monthCommitCount += count;
      }
      yearCommitCount += count;
    }
  });

  return { yesterdayCommitCount, monthCommitCount, yearCommitCount };
};

/**
 * Connect Github Organization
 *
 * @param {organization_name, repository_name}
 * @return {$}
 */
export const requestOrgToGithub = async (organization_name: string, repository_name: string): Promise<any> => {
  try {
    const html = await axios.get(`https://github.com/${organization_name}/${repository_name}`, {
      validateStatus(status: number) {
        return status === 200;
      },
    });
    const $ = load(html.data);
    return $;
  } catch (error) {
    return null;
  }
};

/**
 * Get commit count of org/repo
 *
 * @param {organization_name, repository_name}
 * @return {organizationCommitCount}
 */
export const getOrganizationCommitCount = async (organization_name: string, repository_name: string): Promise<number> => {
  const response = await requestOrgToGithub(organization_name, repository_name);
  if (!response) {
    return null;
  }
  const $: CheerioAPI = response;

  const organizationCommitCount = Number($('body').find('div.Box-header div ul span').children('strong').text().replace(',', ''));
  return organizationCommitCount;
};
