<h1 align="center">{dev} en(v)sure packages are installed 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> the unusual package installer addon

## Install

```sh
npm install -g envsure
```

## Usage

`envsure.json`: Create this file in your project-root
```json
{
  "version": 1,
  "storybook": {
    "@storybook/addon-actions": "5.1.9",
    "@storybook/addon-knobs": "5.1.11",
    "@storybook/addon-links": "5.1.9",
    "@storybook/addon-notes": "5.1.9",
    "@storybook/addons": "5.1.9",
    "@storybook/angular": "5.1.9",
    "@storybook/theming": "5.1.11"
  }
}
```

If globally installed:
```sh
envsure {name}
```

or
```sh
npx envsure {name}
```

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
