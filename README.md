# mdu-scripts 🛠📦

> CLI toolbox for common scripts for my projects

[![npm](https://img.shields.io/npm/v/mdu-scripts.svg)](https://npm.im/mdu-scripts)
[![Build Status](https://travis-ci.org/macklinu/mdu-scripts.svg?branch=master)](https://travis-ci.org/macklinu/mdu-scripts)
[![license](https://img.shields.io/github/license/macklinu/mdu-scripts.svg)](https://github.com/macklinu/mdu-scripts/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Motivation

There is a lot of repetition when setting up JavaScript codebases - configurations, test frameworks, etc. The goal of this is to abstract my common configurations behind a CLI.

## Usage

```sh
npm install --save-dev mdu-scripts
```

One-off scripts can be run with [`npx`](https://github.com/zkat/npx) if you don't want to install mdu-scripts to your project. For example, the following command adds `prettier.config.js`, `.editorconfig`, `.gitignore`, and `lint-staged.config.js` configuration files to your current working directory:

```sh
$ npx mdu-scripts add prettier editorconfig gitignore lint-staged
```

All possible scripts are located in `src/scripts`. More documentation to follow!

## Inspiration

This is inspired by [`kcd-scripts`](https://github.com/kentcdodds/kcd-scripts).
