# Typedoc Theme Hierarchy

Hierarchy theme for [typedoc](https://typedoc.org/)

---

[![typedoc-theme-hierarchy (latest)](https://img.shields.io/npm/v/typedoc-theme-hierarchy)](https://www.npmjs.com/package/typedoc-theme-hierarchy)
[![typedoc-theme-hierarchy (downloads)](https://img.shields.io/npm/dw/typedoc-theme-hierarchy)](https://www.npmjs.com/package/typedoc-theme-hierarchy)
[![typedoc-theme-hierarchy (stars)](https://img.shields.io/github/stars/difuks/typedoc-theme-hierarchy?style=social)](https://github.com/DiFuks/typedoc-theme-hierarchy)

![example](https://raw.githubusercontent.com/DiFuks/typedoc-theme-hierarchy/master/.github/images/demo.jpg)

## Installing

---

```bash
npm i typedoc-theme-hierarchy -D
```

## Usage

---

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
