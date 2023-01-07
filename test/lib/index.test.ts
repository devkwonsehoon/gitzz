import { expect } from 'chai';
import {
  getCommitStatistics,
  getDayCommitCount,
  getMonthCommitCount,
  getOrganizationCommitCount,
  getYearCommitCount,
  getYesterdayCommitCount,
  requestOrgToGithub,
  requestUserToGithub,
} from '../../lib/index';

const USER_NAME = 'devkwonsehoon';
const ORGANIZATION = 'microsoft';
const REPOSITORY = 'TypeScript';

describe('Connecting github test', () => {
  it('should not return null', async () => {
    const result = await requestUserToGithub(USER_NAME);
    expect(result).to.be.not.a('null');
  });

  it('Getting organization should not return null', async () => {
    const result = await requestOrgToGithub(ORGANIZATION, REPOSITORY);
    expect(result).to.be.not.a('null');
  });
});

describe('Counting today commits test', () => {
  it('should not return null', async () => {
    const result = await getDayCommitCount(USER_NAME);
    expect(result).to.be.not.a('null');
  });

  it('should return commit count (number type)', async () => {
    const result = await getDayCommitCount(USER_NAME);
    expect(result).to.be.a('number');
    expect(result).to.least(0);
  });
});

describe('Counting yesterday commits test', () => {
  it('should not return null', async () => {
    const result = await getYesterdayCommitCount(USER_NAME);
    expect(result).to.be.not.a('null');
  });

  it('should return commit count (number type)', async () => {
    const result = await getYesterdayCommitCount(USER_NAME);
    expect(result).to.be.a('number');
    expect(result).to.least(0);
  });
});

describe('Counting monthly commits test', () => {
  it('should not return null', async () => {
    const result = await getMonthCommitCount(USER_NAME);
    expect(result).to.be.not.a('null');
  });

  it('should return commit count (number type)', async () => {
    const result = await getMonthCommitCount(USER_NAME);
    expect(result).to.be.a('number');
    expect(result).to.least(0);
  });
});

describe('Counting year commits test', () => {
  it('should not return null', async () => {
    const result = await getYearCommitCount(USER_NAME);
    expect(result).to.be.not.a('null');
  });

  it('should return commit count (number type)', async () => {
    const result = await getYearCommitCount(USER_NAME);
    expect(result).to.be.a('number');
    expect(result).to.least(0);
  });
});

describe('Get commit stats test', () => {
  it('should not return null', async () => {
    const result = await getCommitStatistics(USER_NAME);
    expect(result).to.be.not.a('null');
  });

  it('should return commit count (number type)', async () => {
    const result = await getCommitStatistics(USER_NAME);
    expect(result).to.be.a('object');
    expect(result).to.have.all.keys('yesterdayCommitCount', 'monthCommitCount', 'yearCommitCount');
    expect(result.yesterdayCommitCount).to.be.a('number');
    expect(result.yesterdayCommitCount).to.least(0);
    expect(result.monthCommitCount).to.be.a('number');
    expect(result.monthCommitCount).to.least(0);
    expect(result.yearCommitCount).to.be.a('number');
    expect(result.yearCommitCount).to.least(0);
  });
});

describe('Counting organization repository commits test', () => {
  it('should not return null', async () => {
    const result = await getOrganizationCommitCount(ORGANIZATION, REPOSITORY);
    expect(result).to.be.not.a('null');
  });

  it('should return commit count (number type)', async () => {
    const result = await getOrganizationCommitCount(ORGANIZATION, REPOSITORY);
    expect(result).to.be.a('number');
    expect(result).to.least(0);
  });
});
