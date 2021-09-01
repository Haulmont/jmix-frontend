import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {EntityBrowserTemplateModel, deriveBrowserTemplateModel} from "../entity-browser/template-model";
import {EntityEditorTemplateModel, deriveEditorTemplateModel} from "../entity-editor/template-model";
import {EntityManagementAnswers} from "./answers";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export interface EntityManagementTemplateModel {
  browserTemplateModel: EntityBrowserTemplateModel;
  editorTemplateModel: EntityEditorTemplateModel;
}

export const deriveManagementTemplateModel = async (
  answers: EntityManagementAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: ComponentOptions
): Promise<EntityManagementTemplateModel> => {
  const {
    entity,
    browserComponentName,
    browserQuery,
    browserType,
    editorComponentName,
    editorQuery,
    menuItem,
    ...stringIdAnswers
  } = answers;

  const browserTemplateModel = await deriveBrowserTemplateModel({
    entity,
    componentName: browserComponentName,
    query: browserQuery,
    browserType: browserType,
    menuItem,
    ...stringIdAnswers
  }, projectModel, gen, options);

  const editorTemplateModel = await deriveEditorTemplateModel({
    entity,
    componentName: editorComponentName,
    query: editorQuery,
    menuItem,
    ...stringIdAnswers
  }, projectModel, gen, options)

  return {
    browserTemplateModel,
    editorTemplateModel: {
      ...editorTemplateModel,
      shouldAddToMenu: false
    }
  }
};
