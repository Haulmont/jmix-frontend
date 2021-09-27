import {AmplicodeCommonOptions, amplicodeCommonOptionsConfig} from "../stages/options/pieces/amplicode";
import {StudioTemplateProperty} from "../../common/studio/studio-model";
import {OptionsConfig} from "../../common/cli-options";
import {YeomanGenerator} from "../YeomanGenerator";
import {defaultGetOptions} from "../stages/options/defaultGetOptions";
import {defaultConfigureGenerator} from "../stages/configuring/defaultConfigureGenerator";
import {GraphQLSchema} from "graphql";
import {amplicodeGetAnswers} from "../stages/answers/amplicodeGetAnswers";
import { amplicodeDeriveTemplateModel } from "../stages/template-model/amplicodeDeriveTemplateModel";
import { amplicodeWrite } from "../stages/writing/amplicodeWrite";
import {amplicodeGetGraphQLSchema} from "../stages/graphql-schema/amplicodeGetGraphQLSchema";

export interface MvpPipelineInput<O extends AmplicodeCommonOptions, A, T> {
  /**
   * Template location.
   */
  templateDir: string;
  /**
   * All possible questions that can be asked by this generator.
   */
  questions?: StudioTemplateProperty[],
  /**
   * Defaults to {@link amplicodeCommonOptionsConfig}
   */
  optionsConfig?: OptionsConfig;
  /**
   * Can be used to replace default implementations of pipeline stages.
   */
  stages?: MvpPipelineStages<O, A, T>
}

// *** NOTE ***
// Stages are now more "pure":
// - write stage only depends on templateModel, does not depend on options or GraphQL schema directly
// - answers stage does not "refine" answers anymore as it is the job for templateModel stage

export type OptionsStage<O extends AmplicodeCommonOptions> = (optionsConfig: OptionsConfig, gen: YeomanGenerator) => Promise<O>;
export type ConfigStage<O extends AmplicodeCommonOptions> = (dirname: string, gen: YeomanGenerator, options: O) => Promise<void>;
export type MvpSchemaStage<O extends AmplicodeCommonOptions> = (options: O, invocationDir: string) => Promise<GraphQLSchema | undefined>;
export type MvpAnswersStage<O extends AmplicodeCommonOptions, A> = (options: O, gen: YeomanGenerator, questions?: StudioTemplateProperty[]) => Promise<A>;
export type AmplicodeTemplateModelStage<O extends AmplicodeCommonOptions,  A, T> = (options: O, answers: A, schema?: GraphQLSchema, questions?: StudioTemplateProperty[]) => Promise<T>;
export type MvpWriteStage<T> = (templateModel: T, gen: YeomanGenerator) => Promise<void>;

export interface MvpPipelineStages<O extends AmplicodeCommonOptions, A, T> {
  getOptions?: OptionsStage<O>;
  configureGenerator?: ConfigStage<O>;
  getGraphQLSchema?: MvpSchemaStage<O>;
  getAnswers?: MvpAnswersStage<O, A>;
  deriveTemplateModel?: AmplicodeTemplateModelStage<O, A, T>;
  write?: MvpWriteStage<T>
}

export async function amplicodePipeline<O extends AmplicodeCommonOptions, A, M>(
  input: MvpPipelineInput<O, A, M>,
  gen: YeomanGenerator
) {
  const {
    templateDir,
    questions = [],
    optionsConfig = amplicodeCommonOptionsConfig
  } = input;

  const {
    getOptions = defaultGetOptions,
    configureGenerator = defaultConfigureGenerator,
    getAnswers = amplicodeGetAnswers,
    getGraphQLSchema = amplicodeGetGraphQLSchema,
    deriveTemplateModel = amplicodeDeriveTemplateModel,
    write = amplicodeWrite
  } = input.stages ?? {};

  // Setting the generator's destinationRoot (which happens inside configureGenerator) will change the current working directory,
  // therefore we need to save the directory from which the generator command was invoked.
  const invocationDir = process.cwd();

  // Obtain the options passed from command line
  const options = await getOptions(optionsConfig, gen);
  // Apply default configuration to the Yeoman generator
  await configureGenerator(templateDir, gen, options);
  // Obtain GraphQL schema
  const schema = await getGraphQLSchema(options, invocationDir);
  // Obtain answers
  const answers = await getAnswers(options, gen, questions);
  // // Derive template model from options, answers and GraphQL schema
  const templateModel = await deriveTemplateModel(options, answers, schema);
  // Write files to disk, performing interpolations using the template model
  await write(templateModel, gen);
}
