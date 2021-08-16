import {MvpEntityBrowserTemplateModel} from "../../../generators/react-typescript/mvp-entity-browser/template-model";
import {YeomanGenerator} from "../../YeomanGenerator";
import {mvpWrite} from "./mvpWrite";
import {addAppMenu, addEntityMenuItem} from "./pieces/menu";
import {addComponentPreviews} from "./pieces/previews-registration";
import {CommonTemplateModel} from "../template-model/pieces/common";

export async function mvpComponentWrite<T extends CommonTemplateModel>(
  templateModel: T, gen: YeomanGenerator
) {
  await mvpWrite(templateModel, gen);

  const {relDirShift, className, menuItem, nameLiteral} = templateModel;

  addAppMenu(gen, relDirShift, className, menuItem);
  addEntityMenuItem(gen, relDirShift, className, nameLiteral);
  addComponentPreviews(gen, relDirShift, className, className, true, generateMockProps());
}

function generateMockProps(): any {
  return {
    paginationConfig: {},
    onPagingChange: () => {}
  }
}