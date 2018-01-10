<div align="center">
<h1>mdu-scripts 🛠📦</h1>

<p>CLI toolbox for common scripts for my projects</p>
</div>

## Motivation

There is a lot of repetition when setting up JavaScript codebases, especially in adding configs. The goal of this is to abstract managing configurations and adding config files to projects.

## Usage

Right now, this is just a CLI that can be run with [`npx`](https://github.com/zkat/npx) to add configuration files to your current directory. For example, executing:

```sh
$ npx mdu-scripts add prettier editorconfig gitignore
```

Will add a `prettier.config.js`, `.editorconfig`, and `.gitignore` file to your current working directory.

More to come!

## Inspiration

This is inspired by [`kcd-scripts`](https://github.com/kentcdodds/kcd-scripts).
