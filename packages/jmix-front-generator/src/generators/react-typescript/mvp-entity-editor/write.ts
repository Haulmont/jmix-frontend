import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeMvpComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import {MvpEntityEditorTemplateModel} from "./template-model";
import path from "path";

export async function writeMvpEditor(
  templateModel: MvpEntityEditorTemplateModel, gen: YeomanGenerator
) {
  if (templateModel.mutationName != null && templateModel.mutationString != null) {
    await writeMvpComponent(templateModel, gen, path.join(__dirname, 'template', 'EntityEditor.tsx.ejs'));
    return;
  }

  await writeMvpComponent(templateModel, gen, path.join(__dirname, 'template', 'EntityDetails.tsx.ejs'));
}