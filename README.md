# gitzz

[![Build Status](https://app.travis-ci.com/devkwonsehoon/gitzz.svg?branch=main)](https://app.travis-ci.com/devkwonsehoon/gitzz)
[![Coverage Status](https://coveralls.io/repos/github/devkwonsehoon/gitzz/badge.svg?branch=main)](https://coveralls.io/github/devkwonsehoon/gitzz?branch=main)

<br>

[![author](https://img.shields.io/badge/author-devkwonsehoon-0066FF.svg?style=flat-square)](https://velog.io/@devkwonsehoon)
[![](https://shields.io/npm/v/gitzz)](https://www.npmjs.com/package/gitzz) [![](https://shields.io/npm/dt/gitzz)](https://www.npmjs.com/package/gitzz)

Github에서 제공하는 Commit 데이터를 손쉽게 가져옵니다.<br>
현재는 beta 버전으로 라이브러리를 배포하고 있습니다.

## 설치 Install

```sh
$ npm install gitzz
```

```sh
$ yarn add gitzz
```

## 사용 Usage

### getDayCommitCount

하루 커밋수를 가져옵니다.

```js
const gitzz = require('gitzz');
const user = 'devkwonsehoon';

const result = await gitzz.getDayCommitCount(user);
console.log(result);
```

### getMonthCommitCount

한달 커밋수를 가져옵니다.

```js
const gitzz = require('gitzz');
const user = 'devkwonsehoon';

const result = await gitzz.getMonthCommitCount(user);
console.log(result);
```

### getYearCommitCount

한해 커밋수를 가져옵니다.

```js
const gitzz = require('gitzz');
const user = 'devkwonsehoon';

const result = await gitzz.getYearCommitCount(user);
console.log(result);
```

### getCommitStat

하루, 한달, 한해 그리고 날짜별 커밋 데이터를 가져옵니다.

```js
const gitzz = require('gitzz');
const user = 'devkwonsehoon';

const result = await gitzz.getCommitStat(user);
console.log(result);
```

### getCommitDetailList

날짜별 커밋 데이터를 가져옵니다.

```js
const gitzz = require('gitzz');
const user = 'devkwonsehoon';

const result = await gitzz.getCommitDetailList(user);
console.log(result);
```

### getOrgCommitCount

특정 org의 커밋수를 가져옵니다. <br>
인자로 org, repo 이름을 보내야 합니다.

```js
const gitzz = require('gitzz');
const org = 'org name here';
const repo = 'repo name here';

const result = await gitzz.getOrgCommitCount(org, repo);
console.log(result);
```

### getSpecificMonthCommitCount

특정 월 커밋수를 가져옵니다.<br>
인자로 "01"(string) 형태의 월을 함께 보내야 합니다.

```js
const gitzz = require('gitzz');
const user = 'devkwonsehoon';

const result = await gitzz.getSpecificMonthCommitCount(user, '01');
console.log(result);
```

### getEachMonthCommitCount

월별 커밋수를 가져옵니다.

```js
const gitzz = require('gitzz');
const user = 'devkwonsehoon';

const result = await gitzz.getEachMonthCommitCount(user);
console.log(result);
```

<br>

> `getDayCommitCountOfPeople`, `getMonthCommitCountOfPeople` 는 사용 가능하나 처리속도가 느립니다.

### getDayCommitCountOfPeople

다수의 유저별 하루 커밋수를 가져옵니다. <br>
인자로 Github username 이 담긴 리스트를 받습니다.

```js
const gitzz = require('gitzz');
const users = ['devkwonsehoon', 'abcdefg12341234'];

const result = await gitzz.getDayCommitCountOfPeople(users);
console.log(result);
```

### getMonthCommitCountOfPeople

다수의 유저별 한달 커밋수를 가져옵니다. <br>
인자로 Github username 이 담긴 리스트를 받습니다.

```js
const gitzz = require('gitzz');
const users = ['devkwonsehoon', 'abcdefg12341234'];

const result = await gitzz.getMonthCommitCountOfPeople(users);
console.log(result);
```
