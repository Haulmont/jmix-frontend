const gen = require('./generate-client-scr');
const fs = require("fs");

const clientDir = 'example-react-app';
const answers = require('./model/example-react-app-answers.js');
const deeplyNestedEditor = require('./screens/deeply-nested-editor');
const deeplyNestedO2MEditor = require('./screens/deeply-nested-o2m-editor');
const deeplyNestedO2MTable = require('./screens/deeply-nested-o2m-browser-table');
const intIdentityIdCardsConfig = require('./screens/int-identity-id-cards.js');
const intIdentityIdEditorConfig = require('./screens/int-identity-id-editor');
const intIdentityIdBrowserTableConfig = require('./screens/int-identity-id-browser-table');
const intIdentityIdBrowserCardsConfig = require('./screens/int-identity-id-browser-cards.js');
const intIdentityIdBrowserListConfig = require('./screens/int-identity-id-browser-list.js');
const intIdEditorConfig = require('./screens/int-id-editor');
const intIdBrowserTableConfig = require('./screens/int-id-browser-table.js');
const intIdBrowserCardsConfig = require('./screens/int-id-browser-cards.js');
const intIdBrowserListConfig = require('./screens/int-id-browser-list.js');
const stringIdCardsConfig = require('./screens/string-id-cards.js');
const stringIdEditorConfig = require('./screens/string-id-editor');
const stringIdBrowserTableConfig = require('./screens/string-id-browser-table.js');
const stringIdBrowserCardsConfig = require('./screens/string-id-browser-cards.js');
const stringIdBrowserListConfig = require('./screens/string-id-browser-list.js');
const weirdStringIdEditorConfig = require('./screens/weird-string-id-editor');
const weirdStringIdBrowserTableConfig = require('./screens/weird-string-id-browser-table');
const weirdStringIdBrowserCardsConfig = require('./screens/weird-string-id-browser-cards.js');
const weirdStringIdBrowserListConfig = require('./screens/weird-string-id-browser-list.js');
const boringStringIdEditorConfig = require('./screens/boring-string-id-editor');
const boringStringIdBrowserTableConfig = require('./screens/boring-string-id-browser-table.js');
const trickyIdEditorConfig = require('./screens/tricky-id-editor.js');
const trickyIdBrowserTableConfig = require('./screens/tricky-id-browser-table.js');
const formWizardEditor = require('./screens/form-wizard-editor.js');
const formWizardCompositionO2O = require('./screens/form-wizard-composition-o2o');
const formWizardBrowser = require('./screens/form-wizard-browser.js');
const dirShift = '../../';
const carCardsWithDetailsConfig = require('./screens/car-cards-with-details');
const carTableWithFiltersConfig = require('./screens/car-table-with-filters');
const datatypesCalendar = require('./screens/datatypes-calendar');

gen(
    'React client SCR',
    clientDir,
    'scripts/model/projectModel-scr-jmix.json',
    [
      {
        command: 'react-typescript:app',
        // Uncomment if you need a horizontal menu
        // answers: answers.app
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/example-custom-screen',
        answers: answers.exampleCustomScreen
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/custom-entity-filter-test',
        answers: answers.customEntityFilterTest
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/custom-form-controls',
        answers: answers.customFormControls
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/custom-data-display-components',
        answers: answers.customDataDisplayComponents
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/custom-app-layouts',
        answers: answers.customAppLayouts,
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/custom-controls',
        answers: answers.customControls,
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/error-boundary-tests',
        answers: answers.errorBoundaryTests,
      },
      {
        command: 'react-typescript:blank-screen',
        dirShift,
        dest: 'src/app/blank-screen',
        answers: answers.blankComponent
      },
      {
        command: 'react-typescript:structure',
        dirShift,
        dest: 'src/app/structure',
        answers: answers.structure
      },
      
      // Car Service Center domain entities
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/car-editor',
        answers: answers.carEditor
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/car-browser-cards',
        answers: answers.carBrowserCards
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/car-browser-list',
        answers: answers.carBrowserList
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/car-browser-table',
        answers: answers.carBrowserTable
      },
      {
        command: 'react-typescript:entity-cards-grid',
        dirShift,
        dest: 'src/app/car-cards-grid',
        answers: answers.carCardsGrid
      },
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/entity-cards',
        answers: answers.favoriteCarsCards
      },
      {
        command: 'react-typescript:entity-cards-with-details',
        dirShift,
        dest: 'src/app/car-cards-with-details',
        answers: carCardsWithDetailsConfig
      },
      {
        command: 'react-typescript:entity-table-with-filters',
        dirShift,
        dest: 'src/app/car-table-with-filters',
        answers: carTableWithFiltersConfig
      },
      {
        command: 'react-typescript:entity-master-detail',
        dirShift,
        dest: 'src/app/car-master-detail',
        answers: answers.carMasterDetail
      },
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/form-wizard-compositionO2O-editor',
        answers: formWizardCompositionO2O
      },
      {
        command: 'react-typescript:entity-form-wizard',
        dirShift,
        dest: 'src/app/form-wizard-editor',
        answers: formWizardEditor
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/form-wizard-browser',
        answers: formWizardBrowser
      },
      {
        command: 'react-typescript:entity-multi-selection-table',
        dirShift,
        dest: 'src/app/car-multi-selection-table',
        answers: answers.carMultiSelectionTable
      },
      {
        command: 'react-typescript:entity-calendar',
        dirShift,
        dest: 'src/app/datatypes-calendar',
        answers: datatypesCalendar
      },

      // All datatypes
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/datatypes-test-editor',
        answers: answers.datatypesTestEditor
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/datatypes-test-browser-cards',
        answers: answers.datatypesTestBrowserCards
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/datatypes-test-browser-list',
        answers: answers.datatypesTestBrowserList
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/datatypes-test-browser-table',
        answers: answers.datatypesTestBrowserTable
      },
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/datatypes-test-cards',
        answers: answers.datatypesTestCards
      },

      // Relations
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationO2O-management',
        answers: answers.associationO2OManagement
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationO2M-management',
        answers: answers.associationO2MManagement
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationM2O-management',
        answers: answers.associationM2OManagement
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/associationM2M-management',
        answers: answers.associationM2MManagement
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/compositionO2O-management',
        answers: answers.compositionO2OManagement
      },
      {
        command: 'react-typescript:entity-management',
        dirShift,
        dest: 'src/app/compositionO2M-management',
        answers: answers.compositionO2MManagement
      },
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/deeplyNestedO2O-editor',
        answers: deeplyNestedEditor
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/deeplyNestedO2M-browser',
        answers: deeplyNestedO2MTable
      },
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/deeplyNestedO2M-editor',
        answers: deeplyNestedO2MEditor
      },
      
      
      // Integer ID
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/int-id-editor',
        answers: intIdEditorConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/int-id-browser-table',
        answers: intIdBrowserTableConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/int-id-browser-cards',
        answers: intIdBrowserCardsConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/int-id-browser-list',
        answers: intIdBrowserListConfig
      },
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/int-id-cards',
        answers: intIdentityIdCardsConfig
      },
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/int-identity-id-editer',
        answers: intIdentityIdEditorConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/int-identity-id-browser-table',
        answers: intIdentityIdBrowserTableConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/int-identity-id-browser-cards',
        answers: intIdentityIdBrowserCardsConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/int-identity-id-browser-list',
        answers: intIdentityIdBrowserListConfig
      },

      // String ID
      {
        command: 'react-typescript:entity-cards',
        dirShift,
        dest: 'src/app/string-id-cards',
        answers: stringIdCardsConfig
      },
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/string-id-editor',
        answers: stringIdEditorConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/string-id-browser-cards',
        answers: stringIdBrowserCardsConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/string-id-browser-list',
        answers: stringIdBrowserListConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/string-id-browser-table',
        answers: stringIdBrowserTableConfig
      },

      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/weird-string-id-editor',
        answers: weirdStringIdEditorConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/weird-string-id-browser-cards',
        answers: weirdStringIdBrowserCardsConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/weird-string-id-browser-list',
        answers: weirdStringIdBrowserListConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/weird-string-id-browser-table',
        answers: weirdStringIdBrowserTableConfig
      },

      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/boring-string-id-editor',
        answers: boringStringIdEditorConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/boring-string-id-browser-table',
        answers: boringStringIdBrowserTableConfig
      },

      // Custom ID
      {
        command: 'react-typescript:entity-editor',
        dirShift,
        dest: 'src/app/tricky-id-editor',
        answers: trickyIdEditorConfig
      },
      {
        command: 'react-typescript:entity-browser',
        dirShift,
        dest: 'src/app/tricky-id-browser-table',
        answers: trickyIdBrowserTableConfig
      },
    ],
  true,
  () => {
    fs.copyFileSync(__dirname + '/custom-screens/ExampleCustomScreen.tsx', __dirname + '/../example-react-app/src/app/example-custom-screen/ExampleCustomScreen.tsx');
    fs.copyFileSync(__dirname + '/custom-screens/CustomFormControls.tsx', __dirname + '/../example-react-app/src/app/custom-form-controls/CustomFormControls.tsx');
    fs.copyFileSync(__dirname + '/custom-screens/CustomDataDisplayComponents.tsx', __dirname + '/../example-react-app/src/app/custom-data-display-components/CustomDataDisplayComponents.tsx');
    fs.copyFileSync(__dirname + '/custom-screens/CustomDataDisplayComponents.module.css', __dirname + '/../example-react-app/src/app/custom-data-display-components/CustomDataDisplayComponents.module.css');
    fs.copyFileSync(__dirname + '/custom-screens/CustomAppLayouts.tsx', __dirname + '/../example-react-app/src/app/custom-app-layouts/CustomAppLayouts.tsx');
    fs.copyFileSync(__dirname + '/custom-screens/CustomAppLayouts.module.css', __dirname + '/../example-react-app/src/app/custom-app-layouts/CustomAppLayouts.module.css');
    fs.copyFileSync(__dirname + '/custom-screens/CustomControls.tsx', __dirname + '/../example-react-app/src/app/custom-controls/CustomControls.tsx');
    fs.copyFileSync(__dirname + '/custom-screens/ErrorBoundaryTests.tsx', __dirname + '/../example-react-app/src/app/error-boundary-tests/ErrorBoundaryTests.tsx');
    fs.copyFileSync(__dirname + '/custom-screens/CustomEntityFilterTest.tsx', __dirname + '/../example-react-app/src/app/custom-entity-filter-test/CustomEntityFilterTest.tsx');
  }
);

