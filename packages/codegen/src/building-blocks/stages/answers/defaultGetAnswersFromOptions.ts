import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import { refineAnswers } from "./pieces/refineAnswers";
import {throwError} from "../../../common/utils";
import {parseBase64Object} from "../../util/base64";

export const defaultGetAnswersFromOptions = <O extends CommonGenerationOptions, A>(
    projectModel: ProjectModel, gen: YeomanGenerator, options: O, questions: StudioTemplateProperty[]
): A => {
  if (options.answers == null) {
    throwError(gen, 'Answers not found in options');
  }

  gen.log('Skipping prompts since answers are provided');
  const rawAnswers = parseBase64Object(options.answers);
  return refineAnswers(projectModel, questions, rawAnswers);
}
