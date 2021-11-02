# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.10](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/compare/@haulmont/jmix-react-antd@1.0.0-next.9...@haulmont/jmix-react-antd@1.0.0-next.10) (2021-11-02)


### Features

* add TextField form control [#701](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/701) ([7e5c5d6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/7e5c5d69c480af54e57397e1c3e87b384d9316a8))





# 1.0.0-next.9 (2021-10-29)


### Bug Fixes

* add confirm on unselect to master-detail ([d3f5291](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/d3f5291a2d63d1064a2270078862b9dcdd2e1895))
* datePicker and Calendar dayjs locales [#655](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/655) ([dabedba](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/dabedba26edf8e1483571cbf9046401b2158d970))
* display messages for all table filter operators ([a91a85e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/a91a85e55c1ac222320436c3672ea3bdb05a59c1))
* entity update fails when associated entity is not set (null) ([455ed04](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/455ed04a5066f70c1ed1e6332152d4db6b4fc4e7)), closes [#677](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/677)
* ignore embedded fields ([19c90b0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/19c90b07f6191e83630d0afb6ac749b2afeb8ef6))
* replace CalendareHeader on custom ([cff8246](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/cff8246b11ee930833ed6be305533ab32b250378))
* updating entity containing property associated with integer id entity [#638](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/638) ([a279f69](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/a279f6981beef7fa76f380cd0b1ee54fd5a103fa))


### chore

* update mobx, @apollo/client, react-intl and typescript packages ([b61360c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/b61360c8444e7d969be127bcebff00a3e49dafc0))


### Features

* add useMenuItem hook and TabContent component [#572](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/572) ([a0e8c9d](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/a0e8c9d2aab4aff1e025ec1b0b42452e309e44eb))
* entity calendar template ([4acf2bf](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/4acf2bf79c69039d3909b0a2287933b01e9f385a))
* implement graphql file upload/download [#614](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/614) ([1360a1e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/1360a1e602ffc5091bbc5931964207bdd7ed983d))
* implement localesStore with support adding locales from external packages [#82](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/82) ([b18607f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/b18607f7cab491005b24cf449c25a035ed9487e2))
* implement RTL layout [#576](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/576) ([16a2b62](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/16a2b62b1244f20481a3d0f63f62e1db4c3bbd78))
* split react-ui package to react-antd and -react-web [#528](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/528) ([246d919](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/246d919f65d7a0d350239d020d7a9a4d098636f4))
* url reflect only root screen state [#587](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/587) ([2db065b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/2db065b0e25b997bf939444ce5dbaadfc0cbf86d))


### Reverts

* Revert "chore: update package-lock" ([ec9a49f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/ec9a49ffc543d998bffbe1f56d240f940d5f8b35))


### BREAKING CHANGES

* mobx, mobx-react, @apollo/client, react-intl and typescript packages were updated
* @haulmont/jmix-react-ui package was removed. Added @haulmont/jmix-react-antd and
@haulmont/jmix-react-web packages





# [1.0.0-next.8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/compare/@haulmont/jmix-react-antd@1.0.0-next.7...@haulmont/jmix-react-antd@1.0.0-next.8) (2021-10-28)


### Features

* implement graphql file upload/download [#614](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/614) ([1360a1e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/1360a1e602ffc5091bbc5931964207bdd7ed983d))





# 1.0.0-next.7 (2021-10-20)


### Bug Fixes

* add confirm on unselect to master-detail ([d3f5291](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/d3f5291a2d63d1064a2270078862b9dcdd2e1895))
* datePicker and Calendar dayjs locales [#655](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/655) ([dabedba](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/dabedba26edf8e1483571cbf9046401b2158d970))
* display messages for all table filter operators ([a91a85e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/a91a85e55c1ac222320436c3672ea3bdb05a59c1))
* entity update fails when associated entity is not set (null) ([455ed04](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/455ed04a5066f70c1ed1e6332152d4db6b4fc4e7)), closes [#677](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/677)
* ignore embedded fields ([19c90b0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/19c90b07f6191e83630d0afb6ac749b2afeb8ef6))
* replace CalendareHeader on custom ([cff8246](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/cff8246b11ee930833ed6be305533ab32b250378))
* updating entity containing property associated with integer id entity [#638](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/638) ([a279f69](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/a279f6981beef7fa76f380cd0b1ee54fd5a103fa))


### chore

* update mobx, @apollo/client, react-intl and typescript packages ([b61360c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/b61360c8444e7d969be127bcebff00a3e49dafc0))


### Features

* add useMenuItem hook and TabContent component [#572](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/572) ([a0e8c9d](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/a0e8c9d2aab4aff1e025ec1b0b42452e309e44eb))
* entity calendar template ([4acf2bf](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/4acf2bf79c69039d3909b0a2287933b01e9f385a))
* implement localesStore with support adding locales from external packages [#82](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/82) ([b18607f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/b18607f7cab491005b24cf449c25a035ed9487e2))
* implement RTL layout [#576](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/576) ([16a2b62](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/16a2b62b1244f20481a3d0f63f62e1db4c3bbd78))
* split react-ui package to react-antd and -react-web [#528](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/528) ([246d919](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/246d919f65d7a0d350239d020d7a9a4d098636f4))
* url reflect only root screen state [#587](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/issues/587) ([2db065b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/2db065b0e25b997bf939444ce5dbaadfc0cbf86d))


### Reverts

* Revert "chore: update package-lock" ([ec9a49f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-react-antd/commit/ec9a49ffc543d998bffbe1f56d240f940d5f8b35))


### BREAKING CHANGES

* mobx, mobx-react, @apollo/client, react-intl and typescript packages were updated
* @haulmont/jmix-react-ui package was removed. Added @haulmont/jmix-react-antd and
@haulmont/jmix-react-web packages
