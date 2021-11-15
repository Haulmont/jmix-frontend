## Table of Contents

- [**Newcomer's Guide**](#newcomers-guide)
  - [Development Environment](#development-environment)
  - [Code Style & Conventions](#code-style)
  - [How to Commit Your Work](#commit)
- [**Reference Materials**](#reference)
  - [Generators](#generators)

## Newcomer's Guide <a name="newcomers-guide"></a>

### Development Environment <a name="development-environment"></a>

#### Requirements

- Node.js version 14.18.1 or higher
- Npm version 7 (Note, that different npm version 6 or 8 may be causing an issue)

#### Project Bootstrap

Perform npm install and lerna bootstrap:

```
npm install
npm run lerna bootstrap --no-audit
```

#### Database

Install [PostgreSQL](https://www.postgresql.org/download/).

Setup user and database. You can use pgAdmin (graphical administration utility) or psql (PostgreSQL CLI).

- Create user `cuba` with password `cuba`. Set privilege `LOGIN` for the new user.
- Create database with `petclinic` name.

psql example:

```
sudo -u postgres psql
postgres=# create database "petclinic";
postgres=# create user cuba with encrypted password 'cuba';
```

#### Backend

Backend repo for `example-app`: https://github.com/Amplicode/amplicode-mvp-petclinic

Run backend:

- On Linux

```
./gradlew bootRun
```

- On Windows

```
./gradlew.bat bootRun
```

#### Frontend

Re-generate and start `example-app`:

```
npm run bootstrap-react-app
npm run start-react-app
```

### Code Style & Conventions <a name="code-style"></a>

#### Cross-platforming

When you are working with code, you need to adhere to several recommendations in order for the app to work correctly on both UNIX and Windows OS:

1. Remember that Windows uses "\\" symbol as path separator, but UNIX uses "/". For this reason, you need to use "path" package when you work with paths in code:

```
Examples:

// wrong
const examplePath = 'my/test/directory';

// correct
const examplePath = path.join('my', 'test', 'directory');
```

2. Avoid using CLI commands which depend on OS, like 'mkdir -p', 'rm -rf', etc. Instead, use npm packages with CLI that have the same functionality:

```
Examples (package.json scripts):

// wrong
"clean": "rm -rf dist && rm -rf dist-transpiled",
"dist": "npm run compile && mkdir -p dist-browser && browserify --standalone cuba dist-node/cuba.js > dist-browser/cuba.js"

// correct
"clean": "rimraf dist && rimraf dist-transpiled",
"dist": "npm run compile && mkdirp dist-browser && browserify --standalone cuba dist-node/cuba.js > dist-browser/cuba.js"
```

3. When you are working with shell scripts, you need to provide `.sh` script for UNIX users and `.bat` for Windows users. Also, you need to implement logic of running `.sh` scripts for UNIX users, and `.bat` for Windows users.

#### TypeScript

##### Use Semantically Correct Idioms

Nullish checking:

```typescript
// wrong
if (foo) {
}

// correct
if (foo != null) {
}
```

Nullish coalescing:

```typescript
// wrong
const foo = bar || baz;

// correct
const foo = bar ?? baz;
```

Optional chaining:

```typescript
// wrong
const foobar = foo && foo.bar && foo.bar.baz;

// correct
const foobar = foo?.bar?.baz;
```

##### Classes

Extract **static utility methods** / **methods not using class state** into separate functions.

```javascript
// wrong
class SomeClass {
  static staticMethod = () => {};
  methodNotUsingState = () => {};
}

// correct
class SomeClass {}
staticMethod = () => {};
methodNotUsingState = () => {};
```

Bind methods to a class using an arrow function

```javascript
// wrong
class SomeClass {
  SOMETHING = "SOMETHING";
  getSomething() {
    return this.SOMETHING;
  }
}
const { getSomething } = new SomeClass();
getSomething(); // Error

// correct
class SomeClass {
  SOMETHING = "SOMETHING";
  getSomething = () => {
    return this.SOMETHING;
  };
}
const { getSomething } = new SomeClass();
getSomething(); // OK
```

Store class names must be singular

```javascript
// wrong
class ScreensStore {
  // store implementation
}

// correct
class ScreenStore {
  // store implementation
}
```

##### Semicolons

Semicolons are required at the end of a statement. 

```
const screens = useScreens();
```

> While omitting the semicolon will work in most cases, there is [one case](https://stackoverflow.com/a/1169596/16487129) that will be interpreted not as intended when the semicolon is missing. Instead of always keeping this use case in mind, we prefer to just put semicolons at the end of each statement.

Also in types and interfaces:

```
// wrong:
interface MyInterface {
  someString: string,
  someNumber: number
}
interface MyInterface2 {
  someString: string
  someNumber: number
}

// correct:
interface MyInterface {
  someString: string;
  someNumber: number;
}
```

##### E2E Tests

E2E tests should resemble real user interaction as closely as practicable. Therefore **do not access elements by ids, class names, etc.** Use `@react/testing-library` and its query methods instead. Consult this [priority list](https://testing-library.com/docs/queries/about#priority) to understand which methods are preferable.

### How to Commit Your Work <a name='commit'></a>

#### Conventional Commits

We are using conventional commits. Conventional commits allow generating changelogs and simplify managing of semantic versioning. See [this article](<](https://www.conventionalcommits.org/en/v1.0.0/#summary)>) for a short overview of the methodology.

Our commits have the following structure:

```
type(scope): short description #issueNumber

affects: list of libs

long description

BREAKING CHANGE:
description of breaking change
```

Example:

```
 feat(React): support hooks #4

    affects: @cuba-platform/react-core, @cuba-platform/react-ui, @cuba-platform/front-generator

    Added support for hooks.
    Added utility and convenience hooks:
     - useMainStore
     - useInstance
     - useCollection
    Added support for hooks.
    Added utility and convenience hooks:
     - useMainStore
     - useInstance
     - useCollection
     - useReaction
    Added `entity-management-hooks` template with hooks-based entity
    editor as a proof of concept.

    BREAKING CHANGE:
    Increased minium version requirements for dependencies:
     - mobx-react:       ^6.2.2
     - react-router-dom: ^5.2.0
```

When making a commit, it is highly suggested to use `npm run commit` instead of `git commit` or IDE. This will launch [Commitizen CLI](https://github.com/commitizen/cz-cli). This interactive tool will walk you through creating a conventional commit message. Most importantly, it will automatically specify which packages are affected, which is important for both changelogs and versioning.

> NOTE: Don't use `ISSUES CLOSED` as it will automatically close the issue upon merge, which is usually not what we want (issue has to be tested, etc.).

Example of an interactive prompt:

```
? Select the type of change that you're committing: feat:     ✨  A new feature (note: this will indicate a release)
? Denote the scope of this change:
? Write a short, imperative tense description of the change:
 support bean validation
? Provide a longer description of the change (optional). Use "|" to break new line:

? List any BREAKING CHANGES (if none, leave blank):

? List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:

? The packages that this commit has affected (0 detected)
 (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ @haulmont/jmix-front-generator
 ◯ @haulmont/jmix-react-core
 ◯ @haulmont/jmix-react-ui
 ◯ @haulmont/jmix-rest
 ◯ test-puppeteer
```

We use the following **change types**:

```
feat:     ✨  A new feature (note: this will indicate a release)
fix:      🛠  A bug fix (note: this will indicate a release)
docs:     Documentation only changes
style:    Changes that do not affect the meaning of the code
(white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf:     A code change that improves performance
test:     Adding missing tests
chore:    Changes to the build process or auxiliary tools
            and libraries such as documentation generation
revert:   Revert to a commit
WIP:      Work in progress
```

Note that change type affects whether the commit message will be included to changelog:

- `feat` and `fix` are always included
- other types are included if commit contains breaking changes

The list of available **scopes** can be found in `commitlint.config.js` file under `rules` -> `scope-enum`. Scope is optional.

Short description should use imperative tense.

Correct:

```
feat: add high-contrast theme #42
```

Wrong:

```
feat: added high-contrast theme #42
```

Long description is optional.

**IMPORTANT:** Before you make a commit with `BREAKING CHANGES`, discuss it with your team lead. Breaking changes means major release, we might want to schedule it appropriately.

Commit message should contain github issue number (if any).

Correct:

```
feat: add high-contrast theme #42
```

Wrong (will cause GitHub to automatically close the issue once PR is merged):

```
feat: add hight-contrast theme

ISSUES CLOSED: #42
```

#### Commit Workflow

0. Note! If you made some changes in templates (generators) which reflected in generated code you must update (regenerate) example app as well `npm run bootstrap-react-app`.

1. Create a feature branch from `master`. Branch name should be `{initials}/{type}/{issueNumber}/{shortDescription}`, e.g. `pv/feat/34/bean-validation`:

   - `initials` are the first letters of author's first and last name. If the initials are already used by another team member - add additional letters (e.g. first letter of middle name).
   - `type` is type of change, see [Conventional Commits](#conventional-commits).

2. Commit your work and push your branch. Usually one issue = one commit, but you may want to split the changes into several commits to make review easier (for example, you may want to make separate commits for changing documentation sources and updating generated documentation).

3. Create a Pull Request and add reviewers. You need to get at least 1 approval before you can merge your request. If you have some code comments from reviewers you need to fix that (point 4). After that, you need to press "resolve conversation" button and re-request review.

4. You may need to make some changes after Peer Review. Since commits might affect changelog, it's best to squash the changes into your initial commit(s), for example by using [fixup and autosquash](https://stackoverflow.com/a/3828861) and force-pushing your feature branch. Force-pushing is only allowed for your own feature-branches, never force-push master or release branches.

5. Merge your PR with "Rebase and merge" button and delete source branch after that.

##### Updating your Feature Branch to Latest Master

Don't use **merge**. Use **rebase**. We want linear git history.

```
# in your feature branch
git pull --rebase origin master
```

## Reference Materials <a name='reference'></a>

### Generators <a name='generators'></a>

#### Basics and Terminology

`packages/codegen` contains the source code for `@amplicode/codegen` library which is used for code generation (scaffolding). This library uses [Yeoman](https://yeoman.io/), however, in order to extend and reuse functionality we are using functions composition rather than Yeoman's usual approach of class inheritance. This will be covered in more detail in [How to Write a Generator](#how-to-write-a-generator) section. The code is generated from [EJS](https://ejs.co/) templates.

This library can be used as a standalone CLI tool, but most of the time it will be used from Studio. When used as a CLI tool it can interactively ask questions and use the **answers** to resolve interpolations in the templates. Studio will ask these questions using its graphical interface and invoke the generator CLI, passing the base64-encoded answers object as `--answers` **option**. There are other options, for example `--dest` that tells the generator where to put the generated files.

In addition to _answers_ and _options_ generator uses **GraphQL schema**. 

> EJS template + options + answers + GraphQL schema = generated code

A **generator** is a combination of an EJS template and code that is responsible for asking questions and turning the answers, options and GraphQL schema into generated code. For each **client** (e.g. React client, React Native client, etc.) there is always a generator that creates a starter app and zero or more generators that adds the components.

> TIP: use `amplicodegen -h` to see the available clients, generators and options.

#### How to Write a Generator <a name='how-to-write-a-generator'></a>

There is a convention that enables CLI/Studio to discover generators. When you want to add a new generator:

1. Create a new folder in `src/generators/{clientName}/{generatorName}`.
2. Add an EJS template (by convention we put it under the `template` directory).
3. Add `index.ts` file. It should contain:

   - A generator class that extends `YeomanGenerator` and contains a constructor and a single method. By convention this method is called `generate`.
   - An export that looks like this:
     ```
     export {
        YourGeneratorClassName as generator,
        optionsConfig as options,
        allQuestions as params,
        description
     }
     ```

`optionsConfig` is an `OptionsConfig` object that contains available options. `allQuestions` is a `StudioTemplateProperty` array representing all possible questions that can be asked by this generator. `description` will be shown by CLI and Studio.

`generate` method will contain the generator's logic. Since a lot of logic is duplicated between the generators, we are using the following convention to reuse it.

#### Pipelines and Stages

Generally the process of code generation can be viewed as the following **pipeline**:

```
     +-------------+
     | get options |
     +------+------+
            |
            v
   +--------+---------+
   | configure Yeoman |
   +--------+---------+
            |
            v
 +----------+-----------+
 |  get GraphQL schema  |
 +----------+-----------+
            |
            v
     +------+------+
     | get answers |
     +------+------+
            |
            v
+-----------+-----------+
| derive template model |
+-----------+-----------+
            |
            v
     +------+------+
     |    write    |
     +------+------+
```

Let us describe the **stages** of this pipeline:

- `get options`: we tell Yeoman what options are allowed and get the values of those options.
- `configure Yeoman`: set the source and destination directory, register transformations, etc.
- `get GraphQL schema`: for example, read it from file system using file path is provided in options.
- `get answers`: ask questions and get the answers. Or get the answers from options.
- `derive template model`: use answers, options and project model to create a **template model** - a set of data that will be used to resolve interpolations in the template. This stage is kind of like MobX's `@computed`.
- `write`: use the template and template model to resolve the interpolations and write the result to the file system.

To use this pipeline call `defaultPipeline` function in your `generate` method. The arguments:

- `templateDir` - template location.
- `questions` - an array of all possible questions (if your generator is using any).
- `options` - options config (defaults to `commonGenerationOptionsConfig`).
- `stages` - an object containing your custom implementations of stages:
  - `getOptions`
  - `configureGenerator`
  - `getGraphQLSchema`
  - `getAnswers`
  - `deriveTemplateModel`
  - `write`

There are default implementations of stages that are suitable for most cases. Most likely you'll need to customize `getAnswers`, `deriveTemplateModel` and `write`. Implementations of these stages also share some code between themselves. This code is extracted into functions which we put under `src/building-blocks/stages/{stageName}/pieces`. When creating your own reusable functions it is important to give them clear names so that your functions can be easily discovered and reused by fellow developers.

Inside your generator folder, organize your custom code based on the stage it belongs to. For example, put your questions and your implementation of `getAnswers` to `answers.ts`, your `TemplateModel` type and `deriveTemplateModel` implementation to `template-model.ts`, etc. A typical generator folder may look like this:

```
├── answers.ts
├── index.ts
├── options.ts
├── template
│ ├── Cards.tsx.ejs
│ ├── EntityManagementEditor.tsx.ejs
│ ├── EntityManagement.tsx.ejs
│ ├── List.tsx.ejs
│ └── Table.tsx.ejs
├── template-model.ts
└── write.ts
```

If you need to use a different/modified pipeline, write your own analogue of the `amplicodePipeline` function. You can still reuse the default implementation of stages that are relevant to you.

#### Templates

The `template` folder inside generator is used to create templates from which the code will be generated.
Templates are processed using [EJS](https://ejs.co/).
<br>
Template files could be any type,
but to increase code readability for complex files there is an ability to add `.ejs` suffix to a template name.
During the file processing the suffix will be removed.
It means that files `EntityManagementEditor.tsx.ejs` and `EntityManagementEditor.tsx` both will be processed to file
`EntityManagementEditor.tsx` and the only difference is how they will be highlighted in IDE.

#### Template Utilities

You can add `templateUtilities` to your template model in order to use utility functions (case-conversion, etc.) inside your templates. If you do so, your template model type should have a union with `UtilTemplateModel`.

```
export type TemplateModel = CommonTemplateModel & UtilTemplateModel & {
  // ...
}

export const deriveTemplateModel = (
  answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
): TemplateModel => {
  // ...
  return {
    // ...
    ...templateUtilities
  };
}
```

#### Testing Your Changes Manually

Generators should be tested from both CLI and Amplicode Studio. In either case the codegen library should be built first:

```
cd packages/codegen
npm run build
```

##### Testing from CLI

Install the local codegen build:

```
cd packages/codegen
npm i -g .
```

How you can use the generator in CLI using `amplicodegen` command. Running it without arguments displays the usage info.

```
$ amplicodegen

Usage: amplicodegen [command] [options]

Options:
  --custom-generator-paths <paths...>        Use custom generators from the filesystem.
  -v, --version                              output the version number
  -h, --help                                 display help for command

Commands:
  list [options]                             List all available clients and their clients
  react-typescript:addon [options]           Generates react-typescript addon
  react-typescript:app [options]             Generates react-typescript app
  react-typescript:entity-list [options]     Generates react-typescript entity-list
  react-typescript:entity-details [options]  Generates react-typescript entity-details
  help [command]                             display help for command
```

There is a couple of special commands such as `list` or `help`, the rest of the command are generators. These commands follow the pattern `client-name:generator-name`.

You can display help for a given command:

```
$ amplicodegen help react-typescript:entity-list
Usage: amplicodegen react-typescript:entity-list [options]

Generates react-typescript entity-list

Options:
  -d, --dest [dest]          destination directory
  -s, --schema [schema]      specify path to GraphQL schema
  -a, --answers [answers]    fulfilled params for generator to avoid interactive input in serialized JSON string
  -b, --verbose              log out additional info about generation process
  -f, --dirShift [dirShift]  directory shift for html imports e.g ../../
  -h, --help                 display help for command
```

Example of generator invocation in CLI (it's multiline to improve readability, note that using \ to make multiline commands won't work on Windows):

```
amplicodegen react-typescript:entity-details \
 --answers eyJjb21wb25lbnROYW1lIjoiUGV0TGlzdCIsInNob3VsZEFkZFRvTWVudSI6dHJ1ZX0= \
 --schema ./schema.graphql \
 --dest ../example-app/src/app/petEditor \
 --dirShift ../../
```

`--answers` is base64-encoded answers object. For example, if you need to provide a string answer `componentName` and a boolean answer `shouldAddToMenu`:

```
const answers = {
  componentName: 'PetList',
  shouldAddToMenu: true,
};
const encodedAnswers = btoa(JSON.stringify(answers));
```

##### Testing from Amplicode Studio

You'll need IntelliJ IDEA Ultimate.

0. Install Studio:
   - Download the latest build of Amplicode Studio (see team wiki for the link).
   - In IDE navigate to `File` -> `Settings` -> `Plugins`
   - Click cogwheel icon and select 'Install plugin from disk`
2. Open [backend project](https://github.com/Amplicode/amplicode-mvp-petclinic) in Studio.  
3. Navigate to `frontend/generation`.
4. npm install the local codegen build, for example:
   ```
   npm i /home/me/amplicode-frontend/packages/codegen
   ```
4. Invoke Gradle task `listGenerators` in the backend project ("Gradle" panel on the right, `frontend` -> `Tasks` -> `npm` -> `listGenerators`).
5. Restart Studio.

Now you can create screens using Studio interface (`Ctrl + Shift + A` -> type "Frontend Component").
