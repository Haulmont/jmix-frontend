This folder contains custom generators.  See [here](https://github.com/Haulmont/jmix-frontend/blob/master/CONTRIBUTING.md#generators) for information on writing your own generators.

`build` directory contains compiled and ready-to-use generators. `customGeneratorPaths` in your project's `package.json` should point to `build` directory. In order to build your generators run `npm run gen:build` from the root of your project.

```
generators
├── build
│   └── my-custom-generator
│       ├── template
│       │   └── SomeFile.tsx.ejs
│       ├── answers.js
│       ├── index.js
│       ├── template-model.js
│       ├── my-custom-generator.svg
│       └── write.js
└── src
    └── my-custom-generator
        ├── template
        │   └── SomeFile.tsx.ejs
        ├── answers.ts
        ├── index.ts
        ├── template-model.ts
        ├── my-custom-generator.svg
        └── write.ts
```