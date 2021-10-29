# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-next.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.1.0-next.0...@haulmont/jmix-front-generator@2.0.0-next.0) (2021-10-29)


### Bug Fixes

* console warnings [#374](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/374) ([1e086f1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1e086f110bbf32f9176b1552b5b92d888e5c6e34))
* display messages for all table filter operators ([a91a85e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a91a85e55c1ac222320436c3672ea3bdb05a59c1))
* fix buttons marging issue in edit component for RTL mode [#576](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/576) ([d0f1ae3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d0f1ae3a256f45e7fef1f5885e46388af14ef594))
* fix TS declarations for front generator files [#565](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/565) ([0307e45](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0307e45e279023c7deded89cd0cf0576f797f6c8))
* inconsistent exports in screens [#630](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/630) ([bdb407d](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/bdb407dd423e2d08b79ccf147ba77c470612dde8))
* replace CalendareHeader on custom ([cff8246](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/cff8246b11ee930833ed6be305533ab32b250378))
* replace dayjs locales generation ([ee6a1ee](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/ee6a1eeb8a1b77e50df27948cc6d8f5bc6470961))
* replace some import paths after moving entity.ts ([f7116de](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f7116dea8e93b780a89a108734def5b4cc2fa960))
* support different locale cases [#666](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/666) ([be5570b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/be5570b18cfecbe689172fdf69727b4a895d8c09))
* update document title in align with page content [#590](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/590) ([0273036](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/027303631e7cc56cd7b6e46faeb0ddc8556e2b27))
* upgrade graphql-tag from 2.11.0 to 2.12.5 ([98825a2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/98825a279d19f97583d2c3c97eca423e3c19ec1c))


### chore

* update mobx, @apollo/client, react-intl and typescript packages ([b61360c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b61360c8444e7d969be127bcebff00a3e49dafc0))


### Code Refactoring

* update yeoman-generator yeoman-environment inquirer-autocomplete-prompt packages ([2e726c9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2e726c9ff8b7e16c7be5319b3ad13d1b02815f7f))


### Features

* ability to sort generators [#379](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/379) ([e43d0ac](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e43d0ac0e3922be3ca0ad9b8b49d8d2c8900fcf1))
* add ATTRIBUTE, ATTRIBUTES_ARRAY and FORM_WIZARD_STEPS param types for studio ([619b999](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/619b999e8969ab9fb0cbec9f082ea4f66e888c0e))
* add idAttributeName field to entites metadata [#539](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/539) ([8dd2fbf](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8dd2fbffd2498bee504c023904754e5b7db28622))
* add info about step to questions ([8d25bd0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8d25bd07c9ae56027668146f01d6d0ecf421a3f9))
* add table-with-selection-template ([33a7870](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/33a7870b15c1bc78b16dc5719f83082d7594ab9f))
* antd themes implementation [#556](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/556) ([8f9a307](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8f9a3075f18e485edfb1291288f7d6b7f20eea5c))
* entity calendar template ([4acf2bf](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4acf2bf79c69039d3909b0a2287933b01e9f385a))
* entity creation wizard ([1ba919a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1ba919a0844fe0eaa968b2408de671d56e6fbc5e))
* entity-cards-with-details template ([f6459ff](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f6459ff7b7ed299b04aec3080fcad92bcf9ee9d3))
* entity-table-with-filters template ([3c10f01](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3c10f0147fd8aea0f4066d28997b57c2437c522d))
* error boundaries on app and tab level [#555](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/555) ([28bcdb5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28bcdb5a952b15f86fa307f04ca87897f730e88c))
* feat: add high contrast theme [#684](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/684) ([796c31e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/796c31e4d47e331cac7529c112a171a8c5a980c9))
* highlight Fields template ([ab24893](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/ab24893297e1467fefa6c884475c04a4e6f31378))
* implement addon generator [#513](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/513) ([4e1d969](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4e1d969bd6f77d13f6b48d70714410f883bcc7de))
* implement graphql file upload/download [#614](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/614) ([1360a1e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360a1e602ffc5091bbc5931964207bdd7ed983d))
* implement localesStore with support adding locales from external packages [#82](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/82) ([b18607f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b18607f7cab491005b24cf449c25a035ed9487e2))
* implement RTL layout [#576](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/576) ([16a2b62](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/16a2b62b1244f20481a3d0f63f62e1db4c3bbd78))
* inject css modules into react-ui package [#541](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/541) ([0876746](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0876746318db5b03db73afd9ad46205bcf725717))
* provide means of customizing templates/generators ([9c16910](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/9c16910cb094f478e976ae863751122dcd8c2ed6))
* refactoring generator templates to support css modules [#541](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/541) ([b3eca63](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b3eca63f9588c3360f7c9a2cca46e813b57d06f4))
* register screens in palette [#460](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/460) ([7e0d4c1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7e0d4c19fef5d900d352a9f8c0c698fc3b14f87c))
* remove react-ide-toolbox ([c2c74b5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c2c74b5855e626ce7cea71d771fa213718dc3615))
* split react-ui package to react-antd and -react-web [#528](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/528) ([246d919](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/246d919f65d7a0d350239d020d7a9a4d098636f4))
* support config for generating app menu items [#578](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/578) ([1439044](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1439044db1de8081c2a22650308612e92c34e87e))
* support react-ui spliting on generator templates [#528](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/528) ([78b451b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/78b451bd039e0378ecc96cdf476a42e78e54b38b))
* use default path convention when collecting generators from project ([d2cf8c5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d2cf8c55bbe9a7751f173ffdd73b310fafd186f6))


### BREAKING CHANGES

* update yeoman-generator and yeoman-environment
* mobx, mobx-react, @apollo/client, react-intl and typescript packages were updated
* removed react-ide-toolbox
* @haulmont/jmix-react-ui package was removed. Added @haulmont/jmix-react-antd and
@haulmont/jmix-react-web packages





# [1.1.0-next.8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.1.0-next.7...@haulmont/jmix-front-generator@1.1.0-next.8) (2021-10-28)


### Features

* feat: add high contrast theme [#684](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/684) ([796c31e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/796c31e4d47e331cac7529c112a171a8c5a980c9))
* implement graphql file upload/download [#614](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/614) ([1360a1e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360a1e602ffc5091bbc5931964207bdd7ed983d))





# [1.1.0-next.7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.1.0-next.0...@haulmont/jmix-front-generator@1.1.0-next.7) (2021-10-20)


### Bug Fixes

* console warnings [#374](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/374) ([1e086f1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1e086f110bbf32f9176b1552b5b92d888e5c6e34))
* display messages for all table filter operators ([a91a85e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a91a85e55c1ac222320436c3672ea3bdb05a59c1))
* fix buttons marging issue in edit component for RTL mode [#576](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/576) ([d0f1ae3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d0f1ae3a256f45e7fef1f5885e46388af14ef594))
* fix TS declarations for front generator files [#565](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/565) ([0307e45](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0307e45e279023c7deded89cd0cf0576f797f6c8))
* inconsistent exports in screens [#630](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/630) ([bdb407d](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/bdb407dd423e2d08b79ccf147ba77c470612dde8))
* replace CalendareHeader on custom ([cff8246](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/cff8246b11ee930833ed6be305533ab32b250378))
* replace dayjs locales generation ([ee6a1ee](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/ee6a1eeb8a1b77e50df27948cc6d8f5bc6470961))
* replace some import paths after moving entity.ts ([f7116de](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f7116dea8e93b780a89a108734def5b4cc2fa960))
* support different locale cases [#666](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/666) ([be5570b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/be5570b18cfecbe689172fdf69727b4a895d8c09))
* update document title in align with page content [#590](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/590) ([0273036](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/027303631e7cc56cd7b6e46faeb0ddc8556e2b27))
* upgrade graphql-tag from 2.11.0 to 2.12.5 ([98825a2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/98825a279d19f97583d2c3c97eca423e3c19ec1c))


### chore

* update mobx, @apollo/client, react-intl and typescript packages ([b61360c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b61360c8444e7d969be127bcebff00a3e49dafc0))


### Code Refactoring

* update yeoman-generator yeoman-environment inquirer-autocomplete-prompt packages ([2e726c9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2e726c9ff8b7e16c7be5319b3ad13d1b02815f7f))


### Features

* ability to sort generators [#379](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/379) ([e43d0ac](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e43d0ac0e3922be3ca0ad9b8b49d8d2c8900fcf1))
* add ATTRIBUTE, ATTRIBUTES_ARRAY and FORM_WIZARD_STEPS param types for studio ([619b999](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/619b999e8969ab9fb0cbec9f082ea4f66e888c0e))
* add idAttributeName field to entites metadata [#539](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/539) ([8dd2fbf](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8dd2fbffd2498bee504c023904754e5b7db28622))
* add info about step to questions ([8d25bd0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8d25bd07c9ae56027668146f01d6d0ecf421a3f9))
* add table-with-selection-template ([33a7870](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/33a7870b15c1bc78b16dc5719f83082d7594ab9f))
* antd themes implementation [#556](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/556) ([8f9a307](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8f9a3075f18e485edfb1291288f7d6b7f20eea5c))
* entity calendar template ([4acf2bf](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4acf2bf79c69039d3909b0a2287933b01e9f385a))
* entity creation wizard ([1ba919a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1ba919a0844fe0eaa968b2408de671d56e6fbc5e))
* entity-cards-with-details template ([f6459ff](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f6459ff7b7ed299b04aec3080fcad92bcf9ee9d3))
* entity-table-with-filters template ([3c10f01](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3c10f0147fd8aea0f4066d28997b57c2437c522d))
* error boundaries on app and tab level [#555](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/555) ([28bcdb5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28bcdb5a952b15f86fa307f04ca87897f730e88c))
* highlight Fields template ([ab24893](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/ab24893297e1467fefa6c884475c04a4e6f31378))
* implement addon generator [#513](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/513) ([4e1d969](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4e1d969bd6f77d13f6b48d70714410f883bcc7de))
* implement localesStore with support adding locales from external packages [#82](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/82) ([b18607f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b18607f7cab491005b24cf449c25a035ed9487e2))
* implement RTL layout [#576](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/576) ([16a2b62](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/16a2b62b1244f20481a3d0f63f62e1db4c3bbd78))
* inject css modules into react-ui package [#541](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/541) ([0876746](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0876746318db5b03db73afd9ad46205bcf725717))
* provide means of customizing templates/generators ([9c16910](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/9c16910cb094f478e976ae863751122dcd8c2ed6))
* refactoring generator templates to support css modules [#541](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/541) ([b3eca63](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b3eca63f9588c3360f7c9a2cca46e813b57d06f4))
* register screens in palette [#460](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/460) ([7e0d4c1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7e0d4c19fef5d900d352a9f8c0c698fc3b14f87c))
* remove react-ide-toolbox ([c2c74b5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c2c74b5855e626ce7cea71d771fa213718dc3615))
* split react-ui package to react-antd and -react-web [#528](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/528) ([246d919](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/246d919f65d7a0d350239d020d7a9a4d098636f4))
* support config for generating app menu items [#578](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/578) ([1439044](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1439044db1de8081c2a22650308612e92c34e87e))
* support react-ui spliting on generator templates [#528](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/528) ([78b451b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/78b451bd039e0378ecc96cdf476a42e78e54b38b))
* use default path convention when collecting generators from project ([d2cf8c5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/d2cf8c55bbe9a7751f173ffdd73b310fafd186f6))


### BREAKING CHANGES

* update yeoman-generator and yeoman-environment
* mobx, mobx-react, @apollo/client, react-intl and typescript packages were updated
* removed react-ide-toolbox
* @haulmont/jmix-react-ui package was removed. Added @haulmont/jmix-react-antd and
@haulmont/jmix-react-web packages





# [1.1.0-next.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.1...@haulmont/jmix-front-generator@1.1.0-next.0) (2021-07-20)


### Bug Fixes

* componentPreview by default exact prop is true ([449e259](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/449e259caf99b8da8dfee943fde5a9a629f016be))


### Features

* app persistentEntity flag for entity to metadata ([26f42a2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/26f42a2c9806fd21fce4107ce584246560633589))





## [1.0.1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0...@haulmont/jmix-front-generator@1.0.1) (2021-07-02)


### Bug Fixes

* aborting of adding editor component to menu when managment component is generated [#479](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/479) ([e8d72d7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e8d72d7215407f817d6dd646801be122c61c24aa))
* send filter with count query ([a258873](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a25887377d68c175bf0572ac64dd8ad53948ca9d))





# [1.0.0-next.25](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.24...@haulmont/jmix-front-generator@1.0.0-next.25) (2021-06-28)


### Features

* switchable tabbing modes [#452](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/452) ([f94ba51](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f94ba51072d9b170345c310d7f2f96ba589e8c79))





# [1.0.0-next.24](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.23...@haulmont/jmix-front-generator@1.0.0-next.24) (2021-06-23)


### Bug Fixes

* compilation of new project fails due to empty routing.ts [#448](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/448) ([0e56e96](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0e56e9624498c730fc4617075bd5ac55e99f5b7e))
* master-detail screen: incorrect route after pagination [#446](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/446) ([a8a8c33](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/a8a8c336c5536a5d1b60f09c3638a86b2cae9406))
* message keys in tab and screen titles [#324](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/324) ([444eeb1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/444eeb11727af6d4568c9edff32f6848599a29bb))





# [1.0.0-next.23](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.22...@haulmont/jmix-front-generator@1.0.0-next.23) (2021-06-21)


### Bug Fixes

* make menu item non-required in all templates ([58bde69](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/58bde69a47c68f8598a5c776f234b6d8196983e2))
* support bean validation for child entities [#390](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/390) ([7029b9e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/7029b9eda28c484ef4ed6289ca0025ecb3ad198c))
* typeError when opening any entity list screen in visual designer [#425](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/425) ([492b083](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/492b0835ce2cf4bd7fb9982a6d03bb461fb3422c))


### Features

* app horizontal menu ([3a2a4a2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3a2a4a2922966de36b48fbe02b2783a371087765))





# [1.0.0-next.22](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.21...@haulmont/jmix-front-generator@1.0.0-next.22) (2021-06-17)


### Features

* notifications and modals API [#300](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/300) ([b0dcf03](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b0dcf0336e478617d1a80aff5fcef627e5e2485c))





# [1.0.0-next.21](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.20...@haulmont/jmix-front-generator@1.0.0-next.21) (2021-06-12)


### Features

* master-detail template ([fd9e9d1](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/fd9e9d1abfc18cd0432f78bb3449f7c101628877))





# [1.0.0-next.18](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.17...@haulmont/jmix-front-generator@1.0.0-next.18) (2021-06-07)


### Bug Fixes

* no error message when opening list/editor that doesn't exist [#319](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/319) ([6582715](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6582715ff0f390ed22cfa9e0b049571dbe0b55d1))


### Features

* aPI for menu item selection / sub menu item expand [#367](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/367) ([839fdc8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/839fdc8c9623f248f53bbcef8ae2e59fe0d27ba4))
* using AST in previews generation [#358](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/358) ([b771acb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b771acb1cededf8229e01e5e3e26d7e34adf3f57))





# [1.0.0-next.17](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.16...@haulmont/jmix-front-generator@1.0.0-next.17) (2021-06-03)


### Bug Fixes

* make menu item question non-required ([66a1336](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/66a13362897db79702d9bc951379786403511a10))


### Features

* adding MenuItem to SubMenuItem child by key [#333](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/333) ([4da3f03](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/4da3f03e7145801657a5d801fc165cc7daaac668))
* support bean validation [#235](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/235) ([11efc72](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/11efc72b571f5a42ae78f1d332180dc76e7a7f36))





# [1.0.0-next.16](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.15...@haulmont/jmix-front-generator@1.0.0-next.16) (2021-06-02)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# [1.0.0-next.15](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.14...@haulmont/jmix-front-generator@1.0.0-next.15) (2021-05-31)


### Bug Fixes

* issues with menu after antd updating [#321](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/321) ([06520d9](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/06520d9d2adf68327ebb5d464157b3dd78b36ce7))


### Code Refactoring

* use graphql to fetch permissions [#251](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/251) ([1ab4c39](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1ab4c395bd8ac6922f2e8c381d9020e66175572e))
* use graphql to fetch permissions [#251](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/251) ([cd7e7d7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/cd7e7d75bff8660c28fb6a77419a3f4e5df77fef))


### Features

* menuItem info [#328](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/328) ([703d119](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/703d1193ef7299d15c0544f4b5c2257e26820b9a))
* mock server [#216](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/216) ([6cd7145](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6cd7145fb99cbdbe4f8e687c78171b34f0e20139))
* support One-to-Many Compositions in entity editor [#304](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/304) ([f90ce85](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f90ce8563cd1ecdef691937c525dc15196cc283c))
* using title property to set MenuItem label [#325](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/325) ([49c06b2](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/49c06b21ee973c48c396307ff142f7b36878f96e))


### Reverts

* "refactor: use graphql to fetch permissions [#251](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/251)" ([f248d5a](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f248d5a2afdc5a580f66aa1a0dc0a707a1550018))


### BREAKING CHANGES

* apollo client shoud be passed to JmixAppProvider

(cherry picked from commit cd7e7d75bff8660c28fb6a77419a3f4e5df77fef)
* apollo client shoud be passed to JmixAppProvider





# [1.0.0-next.14](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.13...@haulmont/jmix-front-generator@1.0.0-next.14) (2021-05-25)


### Features

* icons in react-typescript templates [#313](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/313) ([b1b2d53](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b1b2d53d882bee9758d9d9786afa6f2670eb3637))





# [1.0.0-next.13](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.12...@haulmont/jmix-front-generator@1.0.0-next.13) (2021-05-21)


### Features

* menu components and declarative approach [#22](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/22) ([3b1dfc7](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b1dfc7355350e336f82c2932801cb168f1d8640))
* support One-to-One Compositions in entity editor [#43](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/43) ([9dd2d7f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/9dd2d7f4807636e1630f7c7f1ff10c34326d5e56))





# [1.0.0-next.12](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.11...@haulmont/jmix-front-generator@1.0.0-next.12) (2021-05-10)


### Features

* basic components palette in react app template [#270](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/270) ([8246137](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8246137857ed98410166c46e2922c22f994fb8f6))
* filter trait attributes ([b00d30f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b00d30fb28c86111bdc22d31626a248d3c57ec5c))





# [1.0.0-next.5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.4...@haulmont/jmix-front-generator@1.0.0-next.5) (2021-04-28)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# [1.0.0-next.4](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.3...@haulmont/jmix-front-generator@1.0.0-next.4) (2021-04-28)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# [1.0.0-next.3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@1.0.0-next.2...@haulmont/jmix-front-generator@1.0.0-next.3) (2021-04-25)

**Note:** Version bump only for package @haulmont/jmix-front-generator





# 1.0.0-next.2 (2021-04-22)


### Bug Fixes

* antd error message templates ([52349fd](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/52349fd844b99cbbe4d30d10f4d6646c60a95989))
* chinese translation placement ([e6723e3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e6723e3235d44dcd88a33a7a8421f1fb0e021d96))
* entity cards template does not handle non-updatable entities correctly ([8b0d2ce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8b0d2ce3b81a7d4072fecfb347a16ae0e3640b60))
* fix deps versions ([5b36a38](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5b36a38172ec6696646a05c08f8cc9213bb9614f))
* fixed installing issue with npm7 [#220](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/220) ([2e57566](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2e5756698dd49d42aa5ab524ce5de45e4fc87657))
* fixed issue with string id questions [#179](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/179) ([33f1afa](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/33f1afa3596abd0cb19321e480f3859b26772976))
* fixed issue with string id questions in entity-cards generator [#181](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/181) ([f368d32](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f368d32a213f4b6d559003a539b11797db077986))
* fixed issue with wrong execute directory on generate sdk stage [#197](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/197) ([11e1428](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/11e142843e8a0f02153c7f64e9b6465135c1199c))
* form success massage ([3f6f867](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3f6f8672bffc21076e8e9a1a128019f8ea96e029))
* loading data in list and card views ([3b496a8](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b496a8f1d877be2e8d8e8afe3aaf9559a0f3988))
* messages in menu ([afcefe6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/afcefe68f490fe4943b834b77f89340a12c2df76))
* mobx mutate observables only inside actions ([891e403](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/891e403d0a4812fcf6f1f24dee1700d5deb1393c))
* unexpected token error when running tests in generated app ([6adec6f](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6adec6fbf4a6dc20113dd9941425ef0eea32bc4d))
* update-model (add front-generator dependency) ([1360d76](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360d769b710454d3c2f6ee26367997e528ace06))
* **React:** build error due to TS version mismatch with dependency ([82f8b2e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/82f8b2e1c142e3710c819dceb11c34e98982d340))


### chore

* update antd version to 4.12.3 ([2a3f431](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2a3f43160f4c13c9f72c465ef0093b3402e39b83))
* update mobx-react version to 7.1.0 [#168](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/168) ([b7545cb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b7545cb36d32df4cb69ee44539553680d1349f6d))
* update React version to 17 ([3b0f8eb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b0f8eb1566f266096879171fcdcf5c8fe35903e))
* updated react-scripts 3 to @haulmont/react-scripts ([c639284](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c639284b09d9dc4e8fc4686be5027be05ddb35ce))


### Code Refactoring

* cuba to jmix renaming ([1fdc59c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1fdc59cf8c942a7ba57e3008da73f9a5a07fe5b2))
* updating MobX version to 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([735fcce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/735fcce61f845378092373be44602647bbb9d00f))


### Features

* add GraphQL-based entity-management template ([195191b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/195191bcdc9700b895e0a9d18de5042ac850d182))
* added support of editing and removing entities with composite keys ([28567fb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28567fb3f2bf3765f5b536df6f701eda1052a64d))
* entity cards grid template ([df9cf57](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/df9cf5747f3dfd4d690d2d389acc08a2b2bdcd14))
* implemented component previews supporting in front generator [#163](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/163) ([e97ffd5](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e97ffd5557d755fe968e9494fc8175f21c1686e7))
* implemented new features: multi tabs, multi screens, routing ([6456a05](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/6456a0523192c8ab1e08aff59c48b177354b5866))
* info message error handler ([0d10392](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0d103924b964250ebeb7f49739c16dd4b26b0289))
* replace metadata to project ([c9e65d0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c9e65d081b6bed8a22997c628f89d2662a83bdff))
* structure template ([2e2212b](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2e2212bb01dfdc11ef7130e868f74799b0f00a15))
* support new file API [#121](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/121) ([973ba6e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/973ba6eb7f69974671d75e39143f8f052af64a12))
* switch to using Jmix OAuth module ([5946e07](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5946e07dbe477b395683d777e8c7ecd92556a2f0))
* updated react-scripth with implemented highlighting dev modes [#212](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/212) ([096b8ee](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/096b8ee4dce8e0ffa2c43c21f6e302d5c78171bc))


### Reverts

* graphql support ([002ee27](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/002ee27e7411e53ca6acde02352fa1b8bb665e09))
* revert: graphql support ([889c440](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/889c44021816f325c46f9ce6cf3b0d0fa462137b))


### Tests

* updating tests to support MobX 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([f2af4c6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f2af4c6258e77917221e26b0c0ebdbe1a320aaf4))


### BREAKING CHANGES

* updated typescript version
* update mobx-react version to 7.1.0
* updating tests to support MobX 6
* updating MobX version to 6
* added support of editing and removing entities with composite keys
* update React version to 17
* updated react-scripts 3 to @haulmont/react-scripts
* CubaApp renamed to JmixRestConnection
* antd version was updated to 4.12.3
* react-intl version was updated to 5.3.0






# 0.9.0-beta.1 (2021-03-25)


### Bug Fixes

* antd error message templates ([52349fd](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/52349fd844b99cbbe4d30d10f4d6646c60a95989))
* chinese translation placement ([e6723e3](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/e6723e3235d44dcd88a33a7a8421f1fb0e021d96))
* entity cards template does not handle non-updatable entities correctly ([8b0d2ce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8b0d2ce3b81a7d4072fecfb347a16ae0e3640b60))
* fix deps versions ([5b36a38](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5b36a38172ec6696646a05c08f8cc9213bb9614f))
* form success massage ([3f6f867](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3f6f8672bffc21076e8e9a1a128019f8ea96e029))
* update-model (add front-generator dependency) ([1360d76](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360d769b710454d3c2f6ee26367997e528ace06))
* **React:** build error due to TS version mismatch with dependency ([82f8b2e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/82f8b2e1c142e3710c819dceb11c34e98982d340))


### chore

* update antd version to 4.12.3 ([2a3f431](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/2a3f43160f4c13c9f72c465ef0093b3402e39b83))
* update mobx-react version to 7.1.0 [#168](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/168) ([b7545cb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b7545cb36d32df4cb69ee44539553680d1349f6d))
* update React version to 17 ([3b0f8eb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b0f8eb1566f266096879171fcdcf5c8fe35903e))
* updated react-scripts 3 to @haulmont/react-scripts ([c639284](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c639284b09d9dc4e8fc4686be5027be05ddb35ce))


### Code Refactoring

* cuba to jmix renaming ([1fdc59c](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1fdc59cf8c942a7ba57e3008da73f9a5a07fe5b2))
* updating MobX version to 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([735fcce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/735fcce61f845378092373be44602647bbb9d00f))


### Features

* added support of editing and removing entities with composite keys ([28567fb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28567fb3f2bf3765f5b536df6f701eda1052a64d))
* info message error handler ([0d10392](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0d103924b964250ebeb7f49739c16dd4b26b0289))


### Reverts

* graphql support ([002ee27](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/002ee27e7411e53ca6acde02352fa1b8bb665e09))
* revert: graphql support ([889c440](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/889c44021816f325c46f9ce6cf3b0d0fa462137b))


### Tests

* updating tests to support MobX 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([f2af4c6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f2af4c6258e77917221e26b0c0ebdbe1a320aaf4))


### BREAKING CHANGES

* update mobx-react version to 7.1.0
* updating tests to support MobX 6
* updating MobX version to 6
* added support of editing and removing entities with composite keys
* update React version to 17
* updated react-scripts 3 to @haulmont/react-scripts
* CubaApp renamed to JmixRestConnection
* antd version was updated to 4.12.3
* react-intl version was updated to 5.3.0






# [0.9.0-beta.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@0.3.0...@haulmont/jmix-front-generator@0.9.0-beta.0) (2021-03-23)


### Bug Fixes

* form success massage ([3f6f867](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3f6f8672bffc21076e8e9a1a128019f8ea96e029))


### chore

* update mobx-react version to 7.1.0 [#168](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/168) ([b7545cb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/b7545cb36d32df4cb69ee44539553680d1349f6d))
* update React version to 17 ([3b0f8eb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/3b0f8eb1566f266096879171fcdcf5c8fe35903e))
* updated react-scripts 3 to @haulmont/react-scripts ([c639284](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/c639284b09d9dc4e8fc4686be5027be05ddb35ce))


### Code Refactoring

* updating MobX version to 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([735fcce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/735fcce61f845378092373be44602647bbb9d00f))


### Features

* added support of editing and removing entities with composite keys ([28567fb](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/28567fb3f2bf3765f5b536df6f701eda1052a64d))
* info message error handler ([0d10392](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/0d103924b964250ebeb7f49739c16dd4b26b0289))


### Tests

* updating tests to support MobX 6 [#160](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/issues/160) ([f2af4c6](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/f2af4c6258e77917221e26b0c0ebdbe1a320aaf4))


### BREAKING CHANGES

* update mobx-react version to 7.1.0
* updating tests to support MobX 6
* updating MobX version to 6
* added support of editing and removing entities with composite keys
* update React version to 17
* updated react-scripts 3 to @haulmont/react-scripts





# [0.3.0](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/compare/@haulmont/jmix-front-generator@0.3.0-beta.2...@haulmont/jmix-front-generator@0.3.0) (2021-03-04)


### Bug Fixes

* entity cards template does not handle non-updatable entities correctly ([8b0d2ce](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/8b0d2ce3b81a7d4072fecfb347a16ae0e3640b60))
* update-model (add front-generator dependency) ([1360d76](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/1360d769b710454d3c2f6ee26367997e528ace06))


### Reverts

* graphql support ([002ee27](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/002ee27e7411e53ca6acde02352fa1b8bb665e09))
* revert: graphql support ([889c440](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/889c44021816f325c46f9ce6cf3b0d0fa462137b))





# 0.2.0-dev.2 (2021-01-19)


### Bug Fixes

* fix deps versions ([5b36a38](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/5b36a38172ec6696646a05c08f8cc9213bb9614f))
* **React:** build error due to TS version mismatch with dependency ([82f8b2e](https://github.com/haulmont/jmix-frontend/tree/master/packages/jmix-front-generator/commit/82f8b2e1c142e3710c819dceb11c34e98982d340))
