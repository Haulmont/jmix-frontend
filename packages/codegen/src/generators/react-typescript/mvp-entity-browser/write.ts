import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {MvpEntityListTemplateModel} from "./template-model";
import {writeMvpComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import path from "path";

export async function writeMvpBrowser(
  templateModel: MvpEntityListTemplateModel, gen: YeomanGenerator
) {
  await writeMvpComponent(templateModel, gen, path.join(__dirname, 'template', 'Cards.tsx.ejs'));
}