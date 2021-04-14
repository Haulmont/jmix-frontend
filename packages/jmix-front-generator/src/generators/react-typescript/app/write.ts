import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {SUPPORTED_CLIENT_LOCALES} from '../common/i18n';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeSdkAll} from "../../../building-blocks/stages/writing/pieces/sdk/sdk"
import {ProjectModel} from '../../../common/model/cuba-model';

export const write: WriteStage<Options, TemplateModel> = async (
  projectModel, templateModel, gen, options
) => {

  gen.log(`Generating to ${gen.destinationPath()}`);

  if (!templateModel) {
    throw new Error('Model is not provided');
  }

  let clientLocales: string[];
  const modelHasLocalesInfo = (templateModel.project.locales != null);
  const supportedClientLocaleNames = SUPPORTED_CLIENT_LOCALES.map(location => location.name);

  if (!modelHasLocalesInfo) {
    gen.log('Project model does not contain project locales info. I18n messages will be added for all supported locales.');
    clientLocales = supportedClientLocaleNames;
  } else {
    const projectLocales = templateModel.project.locales.map(locale => locale.code);
    clientLocales = projectLocales.filter(locale => supportedClientLocaleNames.includes(locale));
    if (clientLocales.length === 0) {
      gen.log('WARNING. None of the project locales are supported by Frontend Generator.'
        + ` Project locales: ${JSON.stringify(projectLocales)}. Supported locales: ${JSON.stringify(supportedClientLocaleNames)}.`);
    }
  }
  clientLocales.forEach(locale => {
    gen.fs.copy(
      gen.templatePath() + `/i18n-message-packs/${locale}.json`,
      gen.destinationPath(`src/i18n/${locale}.json`)
    );
  });

  gen.fs.copyTpl(gen.templatePath() + '/public/**', gen.destinationPath('public'), templateModel);
  gen.fs.copyTpl(gen.templatePath() + '/src/**', gen.destinationPath('src'), {
    ...templateModel,
    isLocaleUsed: (locale: string) => {
      // If project model doesn't contain locales info (could be if old Studio is used)
      // then we add all supported locales.
      return !modelHasLocalesInfo || clientLocales.includes(locale);
    },
    clientLocales
  });
  gen.fs.copyTpl(gen.templatePath() + '/*.*', gen.destinationPath(), templateModel);
  gen.fs.copyTpl(gen.templatePath('.env.production.local'), gen.destinationPath('.env.production.local'), templateModel);
  gen.fs.copyTpl(gen.templatePath('.env.development.local'), gen.destinationPath('.env.development.local'), templateModel);
  gen.fs.copy(gen.templatePath('_gitignore'), gen.destinationPath('.gitignore'));
  gen.fs.copy(gen.templatePath('_editorconfig'), gen.destinationPath('.editorconfig'));

  const modelFilePath = templateModel.modelFilePath ?? options.model;
  generateSdk(gen, projectModel);
}

export function generateSdk(
  gen: YeomanGenerator,
  projectModel: ProjectModel
): void {

  const sdkDest = 'src/jmix';
  gen.log(`Generate SDK model and services to ${sdkDest}`);
  writeSdkAll(gen, projectModel, sdkDest);
}
