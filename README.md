# mdu-scripts 🛠📦

> Toolkit for building Node and React libraries

[![npm](https://img.shields.io/npm/v/mdu-scripts.svg)](https://npm.im/mdu-scripts)
[![Build Status](https://travis-ci.org/macklinu/mdu-scripts.svg?branch=master)](https://travis-ci.org/macklinu/mdu-scripts)
[![license](https://img.shields.io/github/license/macklinu/mdu-scripts.svg)](https://github.com/macklinu/mdu-scripts/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [What's a toolkit?](#whats-a-toolkit)
* [Background](#background)
* [Installation](#installation)
* [Setup](#setup)
* [Scripts](#scripts)
  * [`build`](#build)
  * [`test`](#test)
  * [`lint`](#lint)
  * [`format`](#format)
  * [`precommit`](#precommit)
  * [`commitmsg`](#commitmsg)
  * [`add`](#add)
* [Extending Configuration](#extending-configuration)
  * [Babel](#babel)
  * [Jest](#jest)
  * [ESLint](#eslint)
  * [Prettier](#prettier)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What's a toolkit?

Read more about it in [Kent C. Dodd's blog post][concerning-toolkits].

## Background

There is a lot of repetition when setting up JavaScript codebases -
configurations, test frameworks, etc. The goal of this is to abstract my common
configurations behind a CLI.

`mdu-scripts` is mainly a learning tool. This is a modified version of
[`kcd-scripts`][kcd-scripts]. I've been referencing that codebase and rebuilding
it one feature at a time, tweaking things here and there to better fit my
personal workflow.

As a warning: use at your own discretion! Features are pretty specific to my
workflow but may be general enough for your own needs as well. This package does
follow [semantic versioning][semver] though, so any breaking changes will be
properly versioned and documented.

## Installation

```sh
$ yarn add mdu-scripts --dev
```

## Setup

If you intend to use the git hook scripts (`precommit` and `commitmsg`), you
must install [husky][husky].

```sh
$ yarn add husky --dev
```

Some files are also necessary to include in your repository for better
integration with Git and [VS Code][vscode] (my IDE of choice). Quickly add the
following files with the [add](#add) script:

```sh
$ npx mdu-scripts add gitignore editorconfig eslintignore prettier
```

## Scripts

All scripts are located in
[`src/scripts`](https://github.com/macklinu/mdu-scripts/tree/master/src/scripts).
This README aims to document all features, but when in doubt, please view the
source of a specific script.

When a script is invoked, it sets a script-specific environment variable:

```
SCRIPTS_${NAME}=true
```

For example, running `mdu-scripts build` sets `SCRIPTS_BUILD=true`.

### `build`

This script compiles code using [Babel][babel]. Some features of the default
Babel configuration:

* Includes React and Flow plugins only when including those dependencies in your
  project
* Configures treeshaking when `BUILD_ROLLUP=true` (Used for Rollup builds, which
  will be fully supported pending
  https://github.com/macklinu/mdu-scripts/issues/18)

Source code must be located in the `src/` directory. Compiled code is output in
the `dist/` directory.

You can override the [default babel configuration][babel-default-config] by
providing one of the following configurations in your repository:

* a `babel` field in `package.json`
* a `.babelrc` file
* providing a preset via the `--presets` command line flag

Add the following to your `package.json`:

```json
{
  "scripts": {
    "build": "mdu-scripts build"
  }
}
```

And run with `yarn build` or `npm build`.

### `test`

This script executes [Jest][jest] under the hood. Some features:

* Defaults to watch mode for local development, but not on CI
* Transpiles source and test code with Babel
* Uses JSDom test environment when React is a dependency

You can override the [default Jest configuration][jest-default-config] by
providing one of the following configurations in your repository:

* a `jest` field in `package.json`
* a `jest.config.js` file
* providing a configuration file via the `--config` command line flag:
  `mdu-scripts test --config /path/to/config`

See the [Jest configuration docs][jest-config] for more information about how to
reconfigure Jest.

Add the following to your `package.json`:

```json
{
  "scripts": {
    "test": "mdu-scripts test"
  }
}
```

And run with `yarn test` or `npm test`.

### `lint`

This script executes [ESLint][eslint] under the hood.

The ESLint configuration is smart in the sense that it only includes recommended
configurations depending on your project's dependencies. For example, the
recommended [eslint-plugin-react][eslint-plugin-react] configuration is only
included if [React][react] is in your project's dependenencies.

All possible ESLint plugins are listed below, and each plugin uses its'
recommended configuration (specific rules may be adjusted over time):

* [eslint:recommended][eslint-recommended] - always
* [eslint-plugin-prettier][eslint-plugin-prettier] - always
* [eslint-plugin-import][eslint-plugin-import] - always
* [eslint-plugin-react][eslint-plugin-react] - when `react` is a dependency
* [eslint-plugin-jsx-a11y][eslint-plugin-jsx-a11y] - when `react` is a
  dependency
* [eslint-plugin-flowtype][eslint-plugin-flowtype] - when `flow-bin` is a
  dependency

You can override the [default ESLint configuration][eslint-default-config] by
providing one of the following configurations in your repository:

* an `eslintConfig` field in `package.json`
* an `.eslintrc.js` file
* an `.eslintrc` JSON file
* providing a configuration file via the `--config` command line flag:
  `mdu-scripts lint --config /path/to/config`

You can also override the [default ESLint ignore file][eslint-default-ignore] by
providing one of the following configurations in your repository:

* an `eslintIgnore` field in `package.json`
* an `.eslintignore` file
* providing a configuration file via the `--ignore-path` command line flag:
  `mdu-scripts lint --ignore-path /path/to/ignore-file`

### `format`

This script executes [Prettier][prettier] under the hood. This is mainly used by
the [precommit](#precommit) script to format files staged for commit, but you
can append any valid [CLI][prettier-cli] or [options][prettier-options] flags to
this command. For example:

```sh
$ mdu-scripts format --write 'lib/**/*.js'
```

You can override the [default Prettier configuration][prettier-default-config]
by providing one of the following configurations in your repository:

* a `prettier` field in `package.json`
* a `prettier.config.js` file
* a `.prettierrc` JSON file
* providing a configuration file via the `--config` command line flag:
  `mdu-scripts format --config /path/to/config`

### `precommit`

This script executes [lint-staged][lint-staged] under the hood. By default, it
will [format](#format), [lint](#lint), and [test](#test) relevant files in the
staged commit.

You can override the [default lint-staged
configuration][lint-staged-default-config] by providing one of the following
configurations in your repository:

* a `lint-staged` field in `package.json`
* a `lint-staged.config.js` file
* a `.lintstagedrc` JSON file
* providing a configuration file via the `--config` command line flag:
  `mdu-scripts precommit --config /path/to/config`

This script is designed to be used in conjunction with [husky][husky] and _not_
to be invoked directly. Add the following to your `package.json`:

```json
{
  "scripts": {
    "precommit": "mdu-scripts precommit"
  }
}
```

### `commitmsg`

This script executes [validate-commit-msg][validate-commit-msg] under the hood.
It's recommended to use this script if you are maintaining a codebase released
with [semantic-release][semantic-release].

This script is designed to be used in conjunction with [husky][husky] and _not_
to be invoked directly. Add the following to your `package.json`:

```json
{
  "scripts": {
    "commitmsg": "mdu-scripts commitmsg"
  }
}
```

### `add`

This script writes config files to the current directory for given file types.
Possible options are:

* editorconfig
* prettier
* gitignore
* lint-staged
* eslintignore

For example, the following command adds `prettier.config.js`, `.editorconfig`,
`.gitignore`, and `lint-staged.config.js` configuration files to your current
working directory:

```sh
$ mdu-scripts add prettier editorconfig gitignore lint-staged
```

## Extending Configuration

In addition to providing CLI commands, `mdu-scripts` exports config files that
can be extended in your repository.

### Babel

To extend the `mdu-scripts` Babel configuration, add the following to your
`.babelrc`:

```json
{
  "extends": ["mdu-scripts/babel"]
}
```

### Jest

To extend the `mdu-scripts` Jest configuration, create a `jest.config.js` in the
root of your repository. You can now override any option you would like:

```js
module.exports = Object.assign({}, require('mdu-scripts/jest'), {
  // your Jest configuration goes here
})
```

### ESLint

To extend the `mdu-scripts` ESLint configuration, create an `.eslintrc` file in
the root of your repository and add the following:

```json
{
  "extends": ["./node_modules/mdu-scripts/eslint.js"]
}
```

### Prettier

To extend the `mdu-scripts` Jest configuration, create a `prettier.config.js` in
the root of your repository. You can now override any option you would like:

```js
module.exports = Object.assign({}, require('mdu-scripts/prettier'), {
  // your Prettier configuration goes here
})
```

[babel]: https://babeljs.io/
[babel-default-config]: https://github.com/macklinu/mdu-scripts/blob/master/src/config/babelrc.js
[concerning-toolkits]: https://blog.kentcdodds.com/concerning-toolkits-4db57296e1c3
[eslint]: https://eslint.org/
[eslint-default-config]: https://github.com/macklinu/mdu-scripts/blob/master/src/config/eslintrc.js
[eslint-default-ignore]: https://github.com/macklinu/mdu-scripts/blob/master/src/config/eslintignore
[eslint-plugin-flowtype]: https://github.com/gajus/eslint-plugin-flowtype
[eslint-plugin-import]: https://github.com/benmosher/eslint-plugin-import
[eslint-plugin-jsx-a11y]: https://github.com/evcohen/eslint-plugin-jsx-a11y
[eslint-plugin-prettier]: https://github.com/prettier/eslint-plugin-prettier
[eslint-plugin-react]: https://github.com/yannickcr/eslint-plugin-react
[eslint-recommended]: https://eslint.org/docs/rules/
[husky]: https://github.com/typicode/husky
[jest]: https://facebook.github.io/jest/
[jest-config]: https://facebook.github.io/jest/docs/en/configuration.html
[jest-default-config]: https://github.com/macklinu/mdu-scripts/blob/master/src/config/jest.config.js
[kcd-scripts]: https://github.com/kentcdodds/kcd-scripts
[lint-staged]: https://github.com/okonet/lint-staged
[lint-staged-default-config]: https://github.com/macklinu/mdu-scripts/blob/master/src/config/lint-staged.config.js
[npx]: https://github.com/zkat/npx
[prettier]: https://github.com/prettier/prettier
[prettier-cli]: https://prettier.io/docs/en/cli.html
[prettier-default-config]: https://github.com/macklinu/mdu-scripts/blob/master/src/config/prettier.config.js
[prettier-options]: https://prettier.io/docs/en/options.html
[react]: https://reactjs.org/
[semantic-release]: https://github.com/semantic-release/semantic-release
[semver]: https://semver.org/
[validate-commit-msg]: https://github.com/conventional-changelog-archived-repos/validate-commit-msg
[vscode]: https://code.visualstudio.com/
