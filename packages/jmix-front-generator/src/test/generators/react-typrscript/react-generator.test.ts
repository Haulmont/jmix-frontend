import assert from "assert";
import {generate} from "../../../init";
import path from "path";
import {promisify} from "util";
import fs from "fs";
import {assertFilesPlain, opts} from '../../test-commons';

const rimraf = promisify(require('rimraf'));

// let's test both absolute and relative path usage
const absoluteModelPath = require.resolve('../../fixtures/mpg-projectModel.json');
const modelPathScr = require.resolve('../../fixtures/project-model--scr.json');
const componentRelativeModelPath = './src/test/fixtures/mpg-projectModel.json';

const answers = require('../../fixtures/answers.js');
const stringIdAnswers = require('../../fixtures/answers/string-id-management-table.js');

const REACT_DIR = path.join(process.cwd(), `src/test/generated/react-client`);
const COMPONENT_DIR = path.join(REACT_DIR, 'src/app/component');
const CARDS_DIR = path.join(REACT_DIR, 'src/app/entity-cards');
const CARDS_GRID_DIR = path.join(REACT_DIR, 'src/app/entity-cards-grid');
const EM_DIR = path.join(REACT_DIR, 'src/app/entity-management');

const FIXTURES_DIR = path.join(process.cwd(), `src/test/fixtures/react-client`);
const TEST_RUN_DIR = path.join(__dirname, '../../../../');
const GENERATORS_DIR = path.join(__dirname, '../../../generators');

// run each generator test from the same directory - we need it to test relative cli paths
beforeEach(() => process.chdir(TEST_RUN_DIR));

describe('react generator test', () => {

  it('should generates React client app', async function () {

    await rimraf(`${REACT_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'app'), opts(REACT_DIR, null, absoluteModelPath));
    assert.ok(!fs.existsSync(`entities/base`));
    assert.ok(fs.existsSync(`enums/enums.ts`));
    assertFilesPlain('src/index.tsx', REACT_DIR, FIXTURES_DIR);
    assertFilesPlain('.env.development.local', REACT_DIR, FIXTURES_DIR);
    assertFilesPlain('.env.production.local', REACT_DIR, FIXTURES_DIR);
  });

  it('should generate React client blank-component', async function () {

    await rimraf(`${COMPONENT_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'blank-screen'),
      opts(COMPONENT_DIR, answers.blankComponent, componentRelativeModelPath));

    assertFilesPlain('src/app/component/BlankComponent.tsx', REACT_DIR, FIXTURES_DIR);

    await rimraf(`${COMPONENT_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'blank-screen'),
      opts(COMPONENT_DIR, answers.blankComponentLowCase, absoluteModelPath));

    assertFilesPlain('src/app/component/BlankComponent.tsx', REACT_DIR, FIXTURES_DIR);
  });

  it('should generate React client structure', async function () {

    await rimraf(`${COMPONENT_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'structure'),
      opts(COMPONENT_DIR, answers.structureComponent, componentRelativeModelPath));

    assertFilesPlain('src/app/component/StructureComponent.tsx', REACT_DIR, FIXTURES_DIR);
  });

  it('should generate React client entity-cards', async function () {

    await rimraf(`${CARDS_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-cards'),
      opts(CARDS_DIR, answers.entityCards, componentRelativeModelPath));

    assertFilesPlain('src/app/entity-cards/CarBrowserCards.tsx', REACT_DIR, FIXTURES_DIR);
  });

  it('should generate React client entity-cards-grid', async function () {
    await rimraf(`${CARDS_GRID_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-cards-grid'),
      opts(CARDS_GRID_DIR, answers.entityCardsGrid, componentRelativeModelPath));

    assertFilesPlain('src/app/entity-cards-grid/CarCardsGrid.tsx', REACT_DIR, FIXTURES_DIR);
  });

  // TODO Uncaught TypeError: Cannot read property '0' of undefined
  it('should generate React client entity-management', async function () {

    await rimraf(`${EM_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-management'),
      opts(EM_DIR, answers.entityManagement, componentRelativeModelPath));

    process.chdir(TEST_RUN_DIR);
    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-management'),
      opts(EM_DIR, answers.entityManagement2, absoluteModelPath));

    process.chdir(TEST_RUN_DIR);
    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-management'),
      opts(EM_DIR, answers.entityManagement3, componentRelativeModelPath));

    process.chdir(TEST_RUN_DIR);
    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-management'),
      opts(EM_DIR, answers.entityManagementLowCase, absoluteModelPath));

    process.chdir(TEST_RUN_DIR);
    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-management'),
      opts(EM_DIR, stringIdAnswers, modelPathScr));

    process.chdir(TEST_RUN_DIR);

    assertFilesPlain('src/app/entity-management/CarCards.tsx', REACT_DIR, FIXTURES_DIR);
    assertFilesPlain('src/app/entity-management/CarEdit.tsx', REACT_DIR, FIXTURES_DIR);
    assertFilesPlain('src/app/entity-management/CarList.tsx', REACT_DIR, FIXTURES_DIR);
    assertFilesPlain('src/app/entity-management/CarTable.tsx', REACT_DIR, FIXTURES_DIR);

    assertFilesPlain('src/app/entity-management/CarEditLowCase.tsx', REACT_DIR, FIXTURES_DIR);
    assertFilesPlain('src/app/entity-management/CarTableLowCase.tsx', REACT_DIR, FIXTURES_DIR);

    assertFilesPlain('src/app/entity-management/StringIdMgtTableEdit.tsx', REACT_DIR, FIXTURES_DIR);
    assertFilesPlain('src/app/entity-management/StringIdMgtTableBrowse.tsx', REACT_DIR, FIXTURES_DIR);
  });

});



