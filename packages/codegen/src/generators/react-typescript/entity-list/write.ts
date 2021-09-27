import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {EntityListTemplateModel} from "./template-model";
import {writeAmplicodeComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import path from "path";

export async function writeEntityList(
  templateModel: EntityListTemplateModel, gen: YeomanGenerator
) {
  await writeAmplicodeComponent(templateModel, gen, path.join(__dirname, 'template', 'Cards.tsx.ejs'));
}