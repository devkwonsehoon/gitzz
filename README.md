# gitzz

[![Build Status](https://app.travis-ci.com/devkwonsehoon/gitzz.svg?branch=main)](https://app.travis-ci.com/devkwonsehoon/gitzz)
[![Coverage Status](https://coveralls.io/repos/github/devkwonsehoon/gitzz/badge.svg?branch=main)](https://coveralls.io/github/devkwonsehoon/gitzz?branch=main)
[![](https://shields.io/npm/v/gitzz)](https://www.npmjs.com/package/gitzz) [![](https://shields.io/npm/dt/gitzz)](https://www.npmjs.com/package/gitzz)
<br>
[![author](https://img.shields.io/badge/author-devkwonsehoon-0066FF.svg?style=flat-square)](https://velog.io/@devkwonsehoon)

> The Gitzz is a JavaScript library that helps you easily parse Github's commit data.

## Links

- [NPM gitzz](https://www.npmjs.com/package/gitzz)
- [한글 README](README.ko.md)

## Getting Started

### Installation

```console
npm install gitzz
```

```console
yarn add gitzz
```

## Usage

### Basics

```typescript
// Getting today commit count
const todayCommit: number = await getDayCommitCount('username')

// All methods in gitzz return null on invalid requests.
if (!todayCommit) throw something...

// and enjoy it
console.log(todayCommit)
```

### Methods

- Getting commit counts via
  - `getDayCommitCount`, `getYesterdayCommitCount`, `getMonthCommitCount`, `getYearCommitCount`
- Parsing Github page for using jquery
  - `requestUserToGithub`, `requestOrgToGithub`
- also, you can get all commit stats with a method `getCommitStatistics`
- need organization's commit count? use `getOrganizationCommitCount`

## License

gitzz is licensed under a [MIT License](LICENSE).
