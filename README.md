# mdu-scripts 🛠📦

> CLI toolbox for common scripts for my projects

[![Build Status](https://travis-ci.org/macklinu/mdu-scripts.svg?branch=master)](https://travis-ci.org/macklinu/mdu-scripts)

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
