import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {EntityBrowserAnswers} from "../entity-browser/answers";
import {EntityBrowserTemplateModel, deriveBrowserTemplateModel} from "../entity-browser/template-model";
import {EntityEditorTemplateModel, deriveEditorTemplateModel} from "../entity-editor/template-model";
import {EntityMasterDetailAnswers} from "./answers";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import { deriveEntityCommon, CommonTemplateModel } from "../../../building-blocks/stages/template-model/pieces/common";
import { templateUtilities, UtilTemplateModel } from "../../../building-blocks/stages/template-model/pieces/util";
import { deriveEntity, EntityWithPath, EntityTemplateModel } from "../../../building-blocks/stages/template-model/pieces/entity";

export interface MasterDetailTemplateModel {
  browserTemplateModel: MasterDetailBrowserTemplateModel;
  editorTemplateModel: EntityEditorTemplateModel;
  masterDetailTemplateModel: MasterDetailComponentTemplateModel;
};

export const deriveMasterDetailTemplateModel = async (
  answers: EntityMasterDetailAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: ComponentOptions
): Promise<MasterDetailTemplateModel> => {
  const {
    entity,
    browserComponentName,
    browserQuery,
    editorComponentName,
    editorQuery,
    menuItem,
    ...stringIdAnswers
  } = answers;

  const browserTemplateModel = await deriveMasterDetailBrowserTemplateModel({
    entity,
    componentName: browserComponentName,
    query: browserQuery,
    menuItem,
    ...stringIdAnswers,
  }, projectModel, gen, options);

  const editorTemplateModel = await deriveEditorTemplateModel({
    entity,
    componentName: editorComponentName,
    query: editorQuery,
    menuItem,
    ...stringIdAnswers
  }, projectModel, gen, options);

  const masterDetailTemplateModel = await deriveMasterDetailComponentTemplateModel({
    editorClassName: editorTemplateModel.className,
    browserClassName: browserTemplateModel.className,
    componentName: answers.masterDetailComponentName,
    menuItem: answers.menuItem,
    entity: answers.entity,
  }, projectModel, gen, options);

  return {
    browserTemplateModel,
    editorTemplateModel,
    masterDetailTemplateModel,
  }
};

type MasterDetailBrowserAnswers = Omit<EntityBrowserAnswers, 'browserType'>
export type MasterDetailBrowserTemplateModel = Omit<EntityBrowserTemplateModel, 'browserType'>

export const deriveMasterDetailBrowserTemplateModel = async (
  answers: MasterDetailBrowserAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: ComponentOptions
): Promise<MasterDetailBrowserTemplateModel> => {
  const {browserType, ...masterDetailBrowserTemplateModel} = await deriveBrowserTemplateModel({...answers, browserType: 'table'}, projectModel, gen, options)
  return masterDetailBrowserTemplateModel;
}

interface MasterDetailComponentAnswers {
  editorClassName: string;
  browserClassName: string;
  componentName: string;
  entity: EntityWithPath;
  menuItem: string | null;
}

export interface MasterDetailComponentTemplateModel extends
UtilTemplateModel,
CommonTemplateModel,
EntityTemplateModel {
  editorClassName: string;
  browserClassName: string;
}

export const deriveMasterDetailComponentTemplateModel = async (
  answers: MasterDetailComponentAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: ComponentOptions
): Promise<MasterDetailComponentTemplateModel> => {
  const {
    editorClassName,
    browserClassName,
    componentName,
  } = answers;

  return {
    editorClassName,
    browserClassName,
    ...deriveEntityCommon(options, {
      componentName,
      menuItem: answers.menuItem,
    }),
    ...templateUtilities,
    ...deriveEntity(answers, projectModel),
  };
};
