import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {TemplateModel} from "./template-model";
import {writeSdkModel} from "../../../building-blocks/stages/writing/pieces/sdk/sdk"

export const write: WriteStage<CommonGenerationOptions, TemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
    gen.log(`Generating sdk:Model to ${gen.destinationPath()}`);
    writeSdkModel(gen, templateModel); 
};
