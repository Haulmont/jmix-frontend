import {MvpCommonOptions, mvpCommonOptionsConfig} from "../stages/options/pieces/mvp";
import {StudioTemplateProperty} from "../../common/studio/studio-model";
import {OptionsConfig} from "../../common/cli-options";
import {YeomanGenerator} from "../YeomanGenerator";
import {defaultGetOptions} from "../stages/options/defaultGetOptions";
import {defaultConfigureGenerator} from "../stages/configuring/defaultConfigureGenerator";
import {GraphQLSchema} from "graphql";
import {ConfigStage, OptionsStage} from "./defaultPipeline";
import {mvpGetAnswers} from "../stages/answers/mvpGetAnswers";
import { mvpDeriveTemplateModel } from "../stages/template-model/mvpDeriveTemplateModel";
import { mvpWrite } from "../stages/writing/mvpWrite";
import {mvpGetGraphQLSchema} from "../stages/graphql-schema/mvpGetGraphQLSchema";

export interface MvpPipelineInput<O extends MvpCommonOptions, A, T> {
  /**
   * Template location.
   */
  templateDir: string;
  /**
   * All possible questions that can be asked by this generator.
   */
  questions?: StudioTemplateProperty[],
  /**
   * Defaults to {@link mvpCommonOptionsConfig}
   */
  optionsConfig?: OptionsConfig;
  /**
   * Can be used to replace default implementations of pipeline stages.
   */
  stages?: MvpPipelineStages<O, A, T>
}

// *** NOTE ***
// Stages are now more "pure" than in defaultPipeline:
// - write stage only depends on templateModel, does not depends on options or GraphQL schema directly
// - answers stage does not "refine" answers anymore as it is the job for templateModel stage

export type MvpSchemaStage<O extends MvpCommonOptions> = (options: O, invocationDir: string, gen: YeomanGenerator) => Promise<GraphQLSchema>;
export type MvpAnswersStage<O extends MvpCommonOptions, A> = (options: O, gen: YeomanGenerator, questions?: StudioTemplateProperty[]) => Promise<A>;
export type MvpTemplateModelStage<O extends MvpCommonOptions,  A, T> = (options: O, answers: A, schema: GraphQLSchema, gen: YeomanGenerator, questions?: StudioTemplateProperty[]) => Promise<T>;
export type MvpWriteStage<T> = (templateModel: T, gen: YeomanGenerator) => Promise<void>;

export interface MvpPipelineStages<O extends MvpCommonOptions, A, T> {
  getOptions?: OptionsStage<O>;
  configureGenerator?: ConfigStage<O>;
  getGraphQLSchema?: MvpSchemaStage<O>;
  getAnswers?: MvpAnswersStage<O, A>;
  deriveTemplateModel?: MvpTemplateModelStage<O, A, T>;
  write?: MvpWriteStage<T>
}

export async function mvpPipeline<O extends MvpCommonOptions, A, M>(
  input: MvpPipelineInput<O, A, M>,
  gen: YeomanGenerator
) {
  const {
    templateDir,
    questions = [],
    optionsConfig = mvpCommonOptionsConfig
  } = input;

  const {
    getOptions = defaultGetOptions,
    configureGenerator = defaultConfigureGenerator,
    getAnswers = mvpGetAnswers,
    getGraphQLSchema = mvpGetGraphQLSchema,
    deriveTemplateModel = mvpDeriveTemplateModel,
    write = mvpWrite
  } = input.stages ?? {};

  // Setting the generator's destinationRoot (which happens inside configureGenerator) will change the current working directory,
  // therefore we need to save the directory from which the generator command was invoked.
  const invocationDir = process.cwd();

  // Obtain the options passed from command line
  const options = await getOptions(optionsConfig, gen);
  // Apply default configuration to the Yeoman generator
  await configureGenerator(templateDir, gen, options);
  // Obtain GraphQL schema
  const schema = await getGraphQLSchema(options, invocationDir, gen);
  // Obtain answers
  const answers = await getAnswers(options, gen, questions);
  // // Derive template model from options, answers and GraphQL schema
  const templateModel = await deriveTemplateModel(options, answers, schema, gen);
  // Write files to disk, performing interpolations using the template model
  await write(templateModel, gen);
}
