import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {SUPPORTED_CLIENT_LOCALES, SupportClientLocation} from '../common/i18n';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeSdkAll} from "../../../building-blocks/stages/writing/pieces/sdk/sdk"
import {ProjectModel} from '../../../common/model/cuba-model';

const trimLocale = (v: string) => v.split(/-|_/)[0]

export const write: WriteStage<Options, TemplateModel> = async (
  projectModel, templateModel, gen, options
) => {

  gen.log(`Generating to ${gen.destinationPath()}`);

  if (!templateModel) {
    throw new Error('Model is not provided');
  }

  let clientLocales: Omit<SupportClientLocation, 'strict'>[];
  const modelHasLocalesInfo = (templateModel.project.locales != null);
  const supportedClientLocaleNames = SUPPORTED_CLIENT_LOCALES.map(({localeName, antdLocaleName, caption, isRtlLayout}) => {
   return {localeName, antdLocaleName, caption, isRtlLayout, filename: localeName}
  }).reduce((map, loc) => {
    map.set(loc.localeName, loc)

    return map
  },new Map());

  if (!modelHasLocalesInfo) {
    gen.log('Project model does not contain project locales info. I18n messages will be added for all supported locales.');
    clientLocales = Array.from(supportedClientLocaleNames.values());
  } else {
    clientLocales = templateModel.project.locales.map(loc => {
      if (supportedClientLocaleNames.has(loc.code)) {
        return supportedClientLocaleNames.get(loc.code)
      }

      const trimmedCode = trimLocale(loc.code)

      if (supportedClientLocaleNames.has(trimmedCode)) {
        return {
          ...supportedClientLocaleNames.get(trimmedCode),
          localeName: loc.code
        }
      }

      return undefined
    }).filter(Boolean)

    if (clientLocales.length === 0) {
      gen.log('WARNING. None of the project locales are supported by Frontend Generator.'
        + ` Project locales: ${JSON.stringify(templateModel.project.locales.map(x => x.code))}. Supported locales: ${JSON.stringify(supportedClientLocaleNames)}.`);
    }
  }
  clientLocales.forEach(({filename}) => {
    gen.fs.copy(
      gen.templatePath() + `/i18n-message-packs/${filename}.json`,
      gen.destinationPath(`src/i18n/${filename}.json`)
    );
  });

  gen.fs.copyTpl(gen.templatePath() + '/public/**', gen.destinationPath('public'), templateModel);
  gen.fs.copyTpl(gen.templatePath() + '/src/**', gen.destinationPath('src'), {
    ...templateModel,
    isLocaleUsed: (locale: string) => {
      // If project model doesn't contain locales info (could be if old Studio is used)
      // then we add all supported locales.
      return !modelHasLocalesInfo || clientLocales.find(({localeName}) => localeName.includes(locale));
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
