import {ProjectInfo, ProjectModel} from '../../../common/model/cuba-model';
import {Answers, MenuType} from "./answers";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {Options} from "./options";
import {ownVersion} from '../../../cli';
import {normalizeSecret} from '../../../common/studio/studio-integration';
import {throwError} from '../../../common/utils';

export interface TemplateModel {
  title: string;
  basePath: string;
  project: ProjectInfo;
  ownVersion: string;
  menuType: MenuType;
  modelFilePath?: string;
}

export async function deriveTemplateModel(
  answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, _options: Options
): Promise<TemplateModel> {
  if (projectModel != null) {
    return createModel(answers, projectModel.project);
  }

  throwError(gen, 'Failed to derive template model');
}


export function createModel(answers: Answers, project: ProjectInfo): TemplateModel {
  const model: TemplateModel = {
    ownVersion,
    title: project.name,
    project,
    basePath: project.modulePrefix ? (project.modulePrefix + '-front') : 'front',
    menuType: answers.menuType,
  };

  model.project.restClientId = project.restClientId ?? 'client';
  model.project.restClientSecret = project.restClientSecret ? normalizeSecret(project.restClientSecret) : 'secret';
  return model;
}
