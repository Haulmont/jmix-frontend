import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpEntityEditorAnswers} from "./answers";
import {
  DocumentNode,
  GraphQLEnumType, GraphQLEnumValue, GraphQLInputType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
} from "graphql";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import gql from "graphql-tag";
import {GraphQLOutputType} from "graphql/type/definition";
import {TypeMap} from "graphql/type/schema";
import {getOperationName} from "../../../building-blocks/stages/template-model/pieces/mvp/mvp";
import {capitalizeFirst, splitByCapitalLetter} from "../../../common/utils";

export interface AttributeModel {
  name: string;
  type: string;
  displayName: string;
  enumOptions?: Array<GraphQLEnumValue>;
}

export type MvpEntityEditorTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & GraphQLEditorModel
  & {
    queryString: string,
    mutationString: string,
    idField: string,
    listQueryName: string,
  };

type GraphQLEditorModel = {
  queryName: string,
  mutationName: string,
  entityName: string,
  attributes: AttributeModel[],
  inputVariableName: string;

  // We need these in order to have correct imports in the templates
  hasStringScalars: boolean;
  hasIntScalars: boolean;
  hasFloatScalars: boolean;
  hasIDScalars: boolean;
  hasBooleanScalars: boolean;
  hasEnumScalars: boolean;
  hasCustomScalars: boolean;
};

export const deriveMvpEditorTemplateModel: MvpTemplateModelStage<
  MvpComponentOptions, MvpEntityEditorAnswers, MvpEntityEditorTemplateModel
> = async (
  options: MvpComponentOptions,
  answers: MvpEntityEditorAnswers,
  schema: GraphQLSchema,
): Promise<MvpEntityEditorTemplateModel>  => {
  const {
    query: queryString,
    mutation: mutationString,
    idField = 'id',
    listQueryName
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = gql(mutationString);

  return {
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
    ...deriveGraphQLEditorModel(queryNode, mutationNode, schema),
    // TODO problem with $id: String = "", quotation marks get messed up
    // TODO @include $loadItem - add support
    queryString,
    mutationString,
    idField,
    listQueryName
  }
};

export function deriveGraphQLEditorModel(
  queryNode: DocumentNode,
  mutationNode: DocumentNode,
  schema: GraphQLSchema
): GraphQLEditorModel {
  const operationDefinition = mutationNode.definitions[0];
  if (!('variableDefinitions' in operationDefinition) || operationDefinition.variableDefinitions == null) {
    throw new Error('Variable definitions not found in mutation');
  }

  // TODO: what if more than one variable is required?
  const inputVariableName = operationDefinition.variableDefinitions[0].variable.name.value;

  const inputType = operationDefinition.variableDefinitions[0].type;
  if (!('type' in inputType) || !('name' in inputType.type)) {
    throw new Error('Input type name not found');
  }

  const inputTypeName = inputType.type.name.value;



  const queryName = getOperationName(queryNode);
  const mutationName = getOperationName(mutationNode);

  const queryType = schema.getQueryType();
  if (queryType == null) {
    throw new Error('Query type not found');
  }

  const outputType: GraphQLOutputType = queryType.getFields()[queryName].type;
  if (!('name' in outputType)) {
    throw new Error('Output type name not found');
  }

  const outputTypeName = outputType.name;



  const typeMap = schema.getTypeMap();
  if (typeMap == null) {
    throw new Error('Type map not found');
  }

  const namedType = typeMap[inputTypeName];
  if (namedType instanceof GraphQLScalarType
      || namedType instanceof GraphQLUnionType
      || namedType instanceof GraphQLEnumType
  ) {
    throw new Error('Unexpected type');
  }

  let hasStringScalars: boolean = false;
  let hasIntScalars: boolean = false;
  let hasFloatScalars: boolean = false;
  let hasIDScalars: boolean = false;
  let hasBooleanScalars: boolean = false;
  let hasEnumScalars: boolean = false;
  let hasCustomScalars: boolean = false;

  const attributes = Object.values(namedType.getFields()).map((field: any) => {
    const attr: AttributeModel = {
      name: field.name,
      type: field.type.name,
      displayName: capitalizeFirst(splitByCapitalLetter(field.name)) // TODO: results in capitalization that might not conform to English capitalization rules (e.g. "Wheel On Right")
    };

    switch(attr.type) {
      case 'Int':
        hasIntScalars = true;
        break;
      case 'Float':
        hasFloatScalars = true;
        break;
      case 'String':
        hasStringScalars = true;
        break;
      case 'ID':
        hasIntScalars = true;
        break;
      case 'Boolean':
        hasBooleanScalars = true;
        break;
      default:
        if (field.type instanceof GraphQLEnumType) {
          attr.enumOptions = field.type.getValues();
          hasEnumScalars = true;
        } else {
          hasCustomScalars = true;
        }
    }

    return attr;
  });

  return {
    queryName,
    mutationName,
    attributes,
    entityName: outputTypeName,
    hasStringScalars,
    hasIntScalars,
    hasFloatScalars,
    hasIDScalars,
    hasBooleanScalars,
    hasEnumScalars,
    hasCustomScalars,
    inputVariableName
  };
}
