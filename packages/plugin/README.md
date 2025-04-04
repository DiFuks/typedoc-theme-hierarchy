# Typedoc Theme Hierarchy

Hierarchy theme for [typedoc](https://typedoc.org/)

[![typedoc-theme-hierarchy (latest)](https://img.shields.io/npm/v/typedoc-theme-hierarchy)](https://www.npmjs.com/package/typedoc-theme-hierarchy)
[![typedoc-theme-hierarchy (downloads)](https://img.shields.io/npm/dw/typedoc-theme-hierarchy)](https://www.npmjs.com/package/typedoc-theme-hierarchy)
[![typedoc-theme-hierarchy (stars)](https://img.shields.io/github/stars/difuks/typedoc-theme-hierarchy?style=social)](https://github.com/DiFuks/typedoc-theme-hierarchy)

See [example here](https://github.com/DiFuks/typedoc-theme-hierarchy/tree/master/packages/example)

The plugin supports only `expand` and `resolve` values for the `entryPointStrategy` option. Support for `packages` is planned for the future. Please create an issue if you need it.

![example](https://raw.githubusercontent.com/DiFuks/typedoc-theme-hierarchy/master/.github/images/demo.jpg)

## Installing

```bash
# For typedoc ^0.28.0
npm i typedoc-theme-hierarchy@^6.0.0 -D

# For typedoc ^0.26.0 || ^0.27.0
npm i typedoc-theme-hierarchy@^5.0.0 -D

# For typedoc ^0.24.0 || ^0.25.0
npm i typedoc-theme-hierarchy@^4.0.0 -D

# For typedoc ^0.23.6
npm i typedoc-theme-hierarchy@^3.0.0 -D

# For typedoc 0.23.5
npm i typedoc-theme-hierarchy@^2.0.0 -D

# For typedoc ^0.22.0 || <=0.23.4
npm i typedoc-theme-hierarchy@^1.3.5 -D
```

## Usage

From terminal:

```bash
typedoc --entryPoints src --entryPointStrategy expand --out docs --plugin typedoc-theme-hierarchy --theme hierarchy
```

From `typedoc.json`:

```json
{
  "entryPoints": ["src"],
  "entryPointStrategy": "Expand",
  "out": "public/docs",
  "plugin": ["typedoc-theme-hierarchy"],
  "theme": "hierarchy",
  "tsconfig": "./tsconfig.json",
  "name": "Project name"
}
```
