import { WriteStage } from "../../building-blocks/pipelines/defaultPipeline";
import { ComponentOptions } from "../../building-blocks/stages/options/pieces/component";
import { FieldsTemplateModel } from "./template-model";
import * as path from "path"

const tsxExtension = '.tsx.ejs';

export const writeFields: WriteStage<ComponentOptions, FieldsTemplateModel> = async (
    projectModel, templateModel, gen, options
) => {
    gen.fs.copyTpl(
        path.join(__dirname, 'Fields', tsxExtension),
        gen.destinationPath(templateModel.fieldsComponentName, tsxExtension),
        templateModel
    );
}