import path from "path";

export interface BaseTemplateModel {
  includesPath: (...paths: string[]) => string;
}

export const baseTemplateModel = {
  includesPath: (...paths: string[]) => path.join(__dirname, '../../../../../building-blocks/includes', ...paths),
};