import {ProjectModel} from "../../../common/model/cuba-model";
import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {StructureAnswers, ColumnLayoutTypes} from "./answers";
import {Options} from "./options";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

interface ColumnOption {
  name: string,
  gridSize: number,
}

const mapperStructureTypeToColumnOptions: Record<ColumnLayoutTypes, ColumnOption[]> = {
  "Two columns": [
    {name: 'Column one', gridSize: 12},
    {name: 'Column two', gridSize: 12},
  ],
  "Two columns with 1:3 proportion": [
    {name: 'Column one', gridSize: 6},
    {name: 'Column two', gridSize: 18},
  ],
  "Two columns with 3:1 proportion": [
    {name: 'Column one', gridSize: 18},
    {name: 'Column two', gridSize: 6},
  ],
  "Four columns": [
    {name: 'Column one', gridSize: 6},
    {name: 'Column two', gridSize: 6},
    {name: 'Column three', gridSize: 6},
    {name: 'Column four', gridSize: 6},
  ],
}

export interface TemplateModel extends CommonTemplateModel {
  nameLiteral: string;
  columnOptions: ColumnOption[];
}

export async function deriveTemplateModel(
  answers: StructureAnswers, projectModel: ProjectModel, gen: YeomanGenerator, options: Options
): Promise<TemplateModel> {
  const columnOptions = mapperStructureTypeToColumnOptions[answers.structureType];

  return {
    columnOptions,
      ...deriveEntityCommon(options, answers),
  }
}
