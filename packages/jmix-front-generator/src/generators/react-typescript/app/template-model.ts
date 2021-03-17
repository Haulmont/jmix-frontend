import * as path from "path";
import {ProjectInfo, ProjectModel} from '../../../common/model/cuba-model';
import {Answers} from "./answers";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {readProjectModel} from '../../../building-blocks/stages/project-model/defaultGetProjectModel';
import {Options} from "./options";
import {ownVersion} from '../../../cli';
import {exportProjectModel, normalizeSecret} from '../../../common/studio/studio-integration';
import {throwError} from '../../../common/utils';
export interface TemplateModel {
  title: string;
  basePath: string;
  project: ProjectInfo;
  ownVersion: string;
  modelFilePath?: string;
}

export async function deriveTemplateModel(
  answers: Answers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
): Promise<TemplateModel> {
  if (projectModel != null) {
    return createModel(projectModel.project);
  } else if (answers != null) {
    const modelFilePath = path.join(process.cwd(), 'projectModel.json');

    await exportProjectModel(answers.projectInfo.locationHash, modelFilePath);

    const cubaProjectModel = readProjectModel(modelFilePath);
    const model = createModel(cubaProjectModel.project);

    return {
      ...model,
      modelFilePath,
    } as TemplateModel
  }
  throwError(gen, 'Failed to derive template model');
}


export function createModel(project: ProjectInfo): TemplateModel {
  const model: TemplateModel = {
    ownVersion,
    title: project.name,
    project,
    basePath: project.modulePrefix ? (project.modulePrefix + '-front') : 'front'
  };

  model.project.restClientId = project.restClientId ?? 'client';
  model.project.restClientSecret = project.restClientSecret ? normalizeSecret(project.restClientSecret) : 'secret';
  return model;
}
