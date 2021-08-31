import {writeComponentI18nMessages, SUPPORTED_CLIENT_LOCALES} from '../../../../generators/react-typescript/common/i18n';
import {expect, use} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {Locale} from '../../../../common/model/cuba-model';

use(sinonChai);

const expectEnPath = 'directory/shift/i18n/en.json';
const expectRuPath = 'directory/shift/i18n/ru.json';

const enExisting = {
  'key1': 'predefined value 1',
  'key3': 'predefined value 3',
  'keyNotInTemplate': 'key not in template'
};

const ruExisting = {
  'key1': 'заранее заданное значение 1',
  'key3': 'заранее заданное значение 3',
  'key4': 'заранее заданное значение 4',
  'keyNotInTemplate': 'ключ, отсутствующий в шаблоне'
};

let fs: any;
let writeJSON: any;

describe('i18n generation', () => {

  beforeEach(() => {
    writeJSON = sinon.fake();
    fs = {writeJSON} as any;
  });

  it('should write i18n messages when message files are empty', () => {

    const readJSON = sinon.stub();
    fs.readJSON = readJSON;

    readJSON.returns(null);
    writeComponentI18nMessages(fs, "componentClassName", './directory/shift');

    expect(readJSON).calledWith(expectRuPath);
    expect(readJSON).calledWith(expectEnPath);

    expect(writeJSON).not.calledWith(expectRuPath);
    expect(writeJSON).calledWith(
      expectEnPath, {'screen.componentClassName': 'Component Class Name'});

    readJSON.returns({});
    writeComponentI18nMessages(fs, "componentClassName", './directory/shift');

    expect(readJSON).calledWith(expectRuPath);
    expect(readJSON).calledWith(expectEnPath);

    expect(writeJSON).not.calledWith(expectRuPath);
    expect(writeJSON).calledWith(
      expectEnPath, {'screen.componentClassName': 'Component Class Name'});
  });

  it('should merge and write i18n messages', () => {

    const enTemplate = {
      'key1': 'template value 1',
      'key2': 'template value 2',
      'key3': 'template value 3',
      'key4': 'template value 4',
      'key5': 'template value 5',
    };

    const ruTemplate = {
      'key1': 'значение из шаблона 1',
      'key2': 'значение из шаблона 2',
      'key3': 'значение из шаблона 3',
      'key4': 'значение из шаблона 4',
      'key5': 'значение из шаблона 5',
    };

    const enExpected = {
      'key1': 'predefined value 1',
      'key2': 'template value 2',
      'key3': 'predefined value 3',
      'key4': 'template value 4',
      'key5': 'template value 5',
      'screen.testClass': 'Test Class',
      'keyNotInTemplate': 'key not in template'
    };

    const ruExpected = {
      'key1': 'заранее заданное значение 1',
      'key2': 'значение из шаблона 2',
      'key3': 'заранее заданное значение 3',
      'key4': 'заранее заданное значение 4',
      'key5': 'значение из шаблона 5',
      'keyNotInTemplate': 'ключ, отсутствующий в шаблоне'
    };

    const readJSON = sinon.stub();
    readJSON.withArgs(expectEnPath).returns(enExisting);
    readJSON.withArgs(expectRuPath).returns(ruExisting);
    fs.readJSON = readJSON;

    writeComponentI18nMessages(fs, 'testClass', './directory/shift', undefined, {
      en: enTemplate,
      ru: ruTemplate
    });

    expect(writeJSON).calledWith(expectEnPath, enExpected);
    expect(writeJSON).calledWith(expectRuPath, ruExpected);
  });

  it('should not call write method, if no rows are added', () => {

    const readJSON = sinon.stub();
    fs.readJSON = readJSON;

    readJSON.withArgs(expectRuPath).returns(ruExisting);
    // case where all keys, include 'router.*' already exist in file and have the same values
    readJSON.withArgs(expectEnPath).returns({'screen.testClass':'Test Class', ...enExisting});

    writeComponentI18nMessages(fs, 'testClass', './directory/shift');
    expect(writeJSON).not.calledWith(expectRuPath);
    expect(writeJSON).not.calledWith(expectEnPath);

    let enJson = { 'key1': 'predefined value 1'};
    writeComponentI18nMessages(fs, 'testClass', './directory/shift', undefined, {en: enJson});
    expect(writeJSON).not.calledWith(expectRuPath);
    expect(writeJSON).not.calledWith(expectEnPath);

    writeComponentI18nMessages(fs, 'testClass', './directory/shift', undefined, {
      en: enExisting,
      ru: ruExisting
    });
    expect(writeJSON).not.calledWith(expectRuPath);
    expect(writeJSON).not.calledWith(expectEnPath);

    readJSON.withArgs(expectEnPath).returns({'screen.testClass':'Test Class', ...enExisting});

    enJson = { 'key1': 'new value 1'};
    writeComponentI18nMessages(fs, 'testClass', './directory/shift', undefined, {en: enJson});
    expect(writeJSON).not.calledWith(expectRuPath);
    expect(writeJSON).not.calledWith(expectRuPath);
  });

});

describe('i18n generation - project locales', () => {
  const messages = {
    en: { 'key0': 'new value 0'},
    ru: { 'key0': 'новое значение 0'}
  };
  const enLocale: Locale = {code: 'en', caption: 'English'};
  const ruLocale: Locale = {code: 'ru', caption: 'Русский'};
  const projectLocalesEnRu = [enLocale, ruLocale];
  const projectLocalesEn = [enLocale];
  const projectLocalesRu = [ruLocale];

  beforeEach(() => {
    writeJSON = sinon.fake();
    fs = {writeJSON} as any;
    const readJSON = sinon.stub();
    readJSON.withArgs(expectEnPath).returns(enExisting);
    readJSON.withArgs(expectRuPath).returns(ruExisting);
    fs.readJSON = readJSON;
  });

  it('should write en and ru messages if the project contains both locales', () => {
    writeComponentI18nMessages(fs, 'testClass', './directory/shift', projectLocalesEnRu, messages);
    expect(writeJSON).calledWith(expectEnPath);
    expect(writeJSON).calledWith(expectRuPath);
  });

  it('should only write en messages if the project only contains en locale', () => {
    writeComponentI18nMessages(fs, 'testClass', './directory/shift', projectLocalesEn, messages);
    expect(writeJSON).calledWith(expectEnPath);
    expect(writeJSON).not.calledWith(expectRuPath);
  });

  it('should only write ru messages if the project only contains ru locale', () => {
    writeComponentI18nMessages(fs, 'testClass', './directory/shift', projectLocalesRu, messages);
    expect(writeJSON).not.calledWith(expectEnPath);
    expect(writeJSON).calledWith(expectRuPath);
  });

  it('should write both en and ru messages if the project locales are unknown', () => {
    writeComponentI18nMessages(fs, 'testClass', './directory/shift', undefined, messages);
    expect(writeJSON).calledWith(expectEnPath);
    expect(writeJSON).calledWith(expectRuPath);
  });
});

// TODO
describe('i18n message packs', async () => {
  it('has the same keys', async () => {
    for (const locale of SUPPORTED_CLIENT_LOCALES) {
      const appMessagePack =
        await import(`../../../../generators/react-typescript/app/template/i18n-message-packs/${locale.localeName}.json`);
      const mergedMessagePack = {...appMessagePack};
      const actualKeys = Object.keys(mergedMessagePack);
      expect(actualKeys.sort()).to.deep.equal(EXPECTED_I18N_KEYS.sort());
    }
  });
});

const EXPECTED_I18N_KEYS = [
  // Main message pack
  "addons.Addons",
  "common.alt.logo",
  "common.ok",
  "common.cancel",
  "common.create",
  "common.edit",
  "common.remove",
  "common.submit",
  "common.next",
  "common.previous",
  "common.unsavedEntity",
  "common.requestFailed",
  "common.retry",
  "common.back",
  "default",
  "editor.doesNotExist",
  "home.welcome",
  "screen.home",
  "themes.dark",
  "themes.light",
  "themes.sizes.defaultSize",
  "login.failed",
  "login.placeholder.login",
  "login.placeholder.password",
  "login.loginBtn",
  "header.logout.areYouSure",
  "header.logout.ok",
  "header.logout.cancel",
  "file.download.notAllowed",
  "file.noFile",
  "jmix.dataTable.clearAllFilters",
  "jmix.dataTable.validation.requiredField",
  "jmix.dataTable.validation.uuid",
  "jmix.dataTable.failedToLoadNestedEntities",
  "jmix.dataTable.loading",
  "jmix.dataTable.operator.__inInterval",
  "jmix.dataTable.operator._contains",
  "jmix.dataTable.operator._doesNotContain",
  "jmix.dataTable.operator._endsWith",
  "jmix.dataTable.operator._in",
  "jmix.dataTable.operator._isNull",
  "jmix.dataTable.operator._notIn",
  "jmix.dataTable.operator._startsWith",
  "jmix.dataTable.yes",
  "jmix.dataTable.no",
  "jmix.dataTable.ok",
  "jmix.dataTable.reset",
  "jmix.dataTable.add",
  "jmix.dataTable.intervalEditor.last",
  "jmix.dataTable.intervalEditor.next",
  "jmix.dataTable.intervalEditor.predefined",
  "jmix.dataTable.intervalEditor.today",
  "jmix.dataTable.intervalEditor.yesterday",
  "jmix.dataTable.intervalEditor.tomorrow",
  "jmix.dataTable.intervalEditor.lastMonth",
  "jmix.dataTable.intervalEditor.thisMonth",
  "jmix.dataTable.intervalEditor.nextMonth",
  "jmix.dataTable.intervalEditor.days",
  "jmix.dataTable.intervalEditor.hours",
  "jmix.dataTable.intervalEditor.minutes",
  "jmix.dataTable.intervalEditor.months",
  "jmix.dataTable.intervalEditor.includingCurrent",
  "jmix.dataTable.listEditor.addItem",
  "jmix.file.downloading",
  "jmix.file.downloadFailed",
  "jmix.fileUpload.replace",
  "jmix.fileUpload.upload",
  "jmix.fileUpload.uploadFailed",
  "jmix.form.validation.childError",
  "jmix.imagePreview.title",
  "jmix.imagePreview.alt",
  "jmix.imagePreview.close",
  "jmix.imagePreview.download",
  "jmix.nestedEntityField.create",
  "jmix.nestedEntityField.delete.areYouSure",
  "jmix.nestedEntitiesTableField.delete.areYouSure",
  "jmix.nestedEntityField.addEntities",
  "jmix.nestedEntityField.andXMore",
  "list.doesNotExist",
  "cubaRest.error.serverNotResponded",
  "cubaRest.error.serverError",
  "cubaRest.error.badRequest",
  "cubaRest.error.unauthorized",
  "cubaRest.error.notFound",
  "cubaRest.error.unknown",
  "antd.form.validation.default",
  "antd.form.validation.required",
  "antd.form.validation.enum",
  "antd.form.validation.whitespace",
  "antd.form.validation.date.format",
  "antd.form.validation.date.parse",
  "antd.form.validation.date.invalid",
  "antd.form.validation.types.string",
  "antd.form.validation.types.method",
  "antd.form.validation.types.array",
  "antd.form.validation.types.object",
  "antd.form.validation.types.number",
  "antd.form.validation.types.date",
  "antd.form.validation.types.boolean",
  "antd.form.validation.types.integer",
  "antd.form.validation.types.float",
  "antd.form.validation.types.regexp",
  "antd.form.validation.types.email",
  "antd.form.validation.types.url",
  "antd.form.validation.types.hex",
  "antd.form.validation.string.len",
  "antd.form.validation.string.min",
  "antd.form.validation.string.max",
  "antd.form.validation.string.range",
  "antd.form.validation.number.len",
  "antd.form.validation.number.min",
  "antd.form.validation.number.max",
  "antd.form.validation.number.range",
  "antd.form.validation.array.len",
  "antd.form.validation.array.min",
  "antd.form.validation.array.max",
  "antd.form.validation.array.range",
  "antd.form.validation.pattern.mismatch",

  // Entity management
  "management.browser.delete.areYouSure",
  "management.browser.delete.ok",
  "management.browser.noItems",
  "management.editor.validationError",
  "management.editor.created",
  "management.editor.updated",

  "masterDetail.create.ifEntitySelected",
  "masterDetail.entityUnselected",

  "formWizard.currectStepValidationError",
  "formWizard.serverValidationError",

  "multiSelectionTable.delete.areYouSure",
  "multiSelectionTable.delete.error",
  "multiSelectionTable.delete.success"
];