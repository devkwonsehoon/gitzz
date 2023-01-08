# gitzz

[![Build Status](https://app.travis-ci.com/devkwonsehoon/gitzz.svg?branch=main)](https://app.travis-ci.com/devkwonsehoon/gitzz)
[![Coverage Status](https://coveralls.io/repos/github/devkwonsehoon/gitzz/badge.svg?branch=main)](https://coveralls.io/github/devkwonsehoon/gitzz?branch=main)
[![](https://shields.io/npm/v/gitzz)](https://www.npmjs.com/package/gitzz) [![](https://shields.io/npm/dt/gitzz)](https://www.npmjs.com/package/gitzz)
<br>
[![author](https://img.shields.io/badge/author-devkwonsehoon-0066FF.svg?style=flat-square)](https://velog.io/@devkwonsehoon)

> gitzz는 손쉽게 Github의 커밋 데이터를 가져올 수 있도록 도와주는 Javascript 라이브러리입니다.

## 링크

- [NPM gitzz](https://www.npmjs.com/package/gitzz)

## 시작

### 설치 방법

```console
npm install gitzz
```

```console
yarn add gitzz
```

## 사용법

### 기본

```typescript
// 오늘 하루 동안의 커밋 개수를 가져옵니다.
const todayCommit: number = await getDayCommitCount('username')

// gitzz의 모든 메서드들은 잘못된 요청에 null을 반환합니다.
if (!todayCommit) throw something...

// 끝!
console.log(todayCommit)
```

### Methods

- 커밋 개수를 가져오는 메서드들은 아래와 같습니다.
  - `getDayCommitCount`, `getYesterdayCommitCount`, `getMonthCommitCount`, `getYearCommitCount`
- jquery 세팅을 위해 파싱을 해올 수 있습니다.
  - `requestUserToGithub`, `requestOrgToGithub`
- 또한 `getCommitStatistics`를 사용해 일/월/년도별 커밋 데이터를 한번에 가져올 수 있습니다.
- Organization내 레포지토리에 대한 커밋 갯수가 필요하다면 `getOrganizationCommitCount`를 사용합니다.

## License

gitzz의 라이선스는 [MIT License](LICENSE).
