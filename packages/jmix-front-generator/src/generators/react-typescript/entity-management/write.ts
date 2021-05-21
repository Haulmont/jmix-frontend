import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {EntityManagementTemplateModel} from "./template-model";
import {writeEditor} from '../entity-editor/write';
import {writeBrowser} from '../entity-browser/write';

export const writeManagement: WriteStage<ComponentOptions, EntityManagementTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  await writeEditor(projectModel, templateModel.editorTemplateModel, gen, options);
  await writeBrowser(projectModel, templateModel.browserTemplateModel, gen, options);
};
