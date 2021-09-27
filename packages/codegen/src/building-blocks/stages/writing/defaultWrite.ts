import { ProjectModel } from "src/common/model/cuba-model";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {YeomanGenerator} from "../../YeomanGenerator";

/**
 * Just writes the template and applies interpolations, without any special logic.
 */
export const defaultWrite = <O extends CommonGenerationOptions, M>(
  projectModel: ProjectModel, templateModel: M, gen: YeomanGenerator, _options?: O,
) => {
  gen.fs.copyTpl(
    gen.templatePath() + '/**',
    gen.destinationPath('.'),
    templateModel
  );
};