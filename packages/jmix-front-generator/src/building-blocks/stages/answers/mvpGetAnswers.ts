import {MvpCommonOptions} from "../options/pieces/mvp";
import {YeomanGenerator} from "../../YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {parseBase64Object} from "../../util/base64";

export const mvpGetAnswers = async <O extends MvpCommonOptions, A>(
  options: O, gen: YeomanGenerator, questions?: StudioTemplateProperty[]
): Promise<A> => {
  if (questions == null || questions.length === 0) {
    return {} as A;
  }

  if (options.answers != null) {
    return await getAnswersFromOptions(options.answers, gen);
  }

  return await getAnswersFromPrompt(options, gen, questions);
};

async function getAnswersFromOptions<O extends MvpCommonOptions, A>(
  answers: string, gen: YeomanGenerator
): Promise<A> {
  gen.log('Skipping prompts since answers are provided');
  return parseBase64Object(answers);
}

async function getAnswersFromPrompt<O extends MvpCommonOptions, A>(
  options: O, gen: YeomanGenerator, questions?: StudioTemplateProperty[]
): Promise<A> {
  throw new Error('Not supported');
}
