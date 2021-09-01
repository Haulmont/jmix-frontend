import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {TemplateModel} from "./template-model";
import {writeSdkAll} from "../../../building-blocks/stages/writing/pieces/sdk/sdk"
import { CommonGenerationOptions } from "../../../common/cli-options";

export const write: WriteStage<CommonGenerationOptions, TemplateModel> = async (
  projectModel, templateModel, gen, _options
) => {
    gen.log(`Generating sdk:Model to ${gen.destinationPath()}`);
    writeSdkAll(gen, templateModel); 
};
