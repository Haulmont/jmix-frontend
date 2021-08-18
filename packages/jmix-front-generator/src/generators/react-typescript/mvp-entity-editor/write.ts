import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeMvpComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import {MvpEntityEditorTemplateModel} from "./template-model";
import path from "path";

export async function writeMvpEditor(
  templateModel: MvpEntityEditorTemplateModel, gen: YeomanGenerator
) {
  await writeMvpComponent(templateModel, gen, path.join(__dirname, 'template', 'Editor.tsx.ejs'));
}