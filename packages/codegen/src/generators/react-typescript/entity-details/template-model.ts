import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {MvpEntityEditorAnswers} from "./answers";
import {
  DocumentNode,
  GraphQLEnumType, GraphQLEnumValue, GraphQLInputObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
} from "graphql";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import gql from "graphql-tag";
import {GraphQLOutputType} from "graphql/type/definition";
import {getOperationName} from "../../../building-blocks/stages/template-model/pieces/amplicode/amplicode";
import {capitalizeFirst, splitByCapitalLetter} from "../../../common/utils";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";

export interface AttributeModel {
  name: string;
  type: string;
  displayName: string;
  enumOptions?: Array<GraphQLEnumValue>;
  isRelationField: boolean;
}

export interface MvpEntityEditorTemplateModel extends BaseTemplateModel, ScreenTemplateModel, UtilTemplateModel, GraphQLEditorModel {
    queryString: string,
    mutationString?: string,
    idField: string,
    listQueryName: string,
  }

type GraphQLEditorModel = {
  queryName: string,
  mutationName?: string,
  entityName?: string,
  attributes: AttributeModel[],
  inputVariableName?: string;

  // We need these in order to have correct imports in the templates
  hasStringScalars?: boolean;
  hasIntScalars?: boolean;
  hasFloatScalars?: boolean;
  hasIDScalars?: boolean;
  hasBooleanScalars?: boolean;
  hasEnumScalars?: boolean;
  hasCustomScalars?: boolean;
  hasRelationFields?: boolean;
};

export const deriveEntityDetailsTemplateModel: AmplicodeTemplateModelStage<
  AmplicodeComponentOptions, MvpEntityEditorAnswers, MvpEntityEditorTemplateModel
> = async (
  options: AmplicodeComponentOptions,
  answers: MvpEntityEditorAnswers,
  schema?: GraphQLSchema,
): Promise<MvpEntityEditorTemplateModel>  => {
  const {
    query: queryString,
    mutation: mutationString,
    idField = 'id',
    listQueryName
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = mutationString != null
    ? gql(mutationString)
    : undefined;

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers),
    ...deriveGraphQLEditorModel(queryNode, schema, mutationNode),
    // TODO problem with $id: String = "", quotation marks get messed up
    queryString,
    mutationString,
    idField,
    listQueryName
  }
};

export function deriveGraphQLEditorModel(
  queryNode: DocumentNode,
  schema?: GraphQLSchema,
  mutationNode?: DocumentNode,
): GraphQLEditorModel {
  if (schema == null) {
    throw new Error('Schema is required for this generator');
  }

  const queryName = getOperationName(queryNode);

  if (mutationNode == null) {
    return {
      queryName,
      attributes: []
    }
  }

  const operationDefinition =  mutationNode.definitions[0];
  if (!('variableDefinitions' in operationDefinition) || operationDefinition.variableDefinitions == null) {
    throw new Error('Variable definitions not found in mutation');
  }

  const inputVariableName = operationDefinition.variableDefinitions[0].variable.name.value;

  const inputType = operationDefinition.variableDefinitions[0].type;

  let inputTypeName: string | undefined;
  if ('name' in inputType) {
    inputTypeName = inputType.name.value;
  }
  if ('type' in inputType && 'name' in inputType.type) {
    inputTypeName = inputType.type.name.value;
  }
  if (inputTypeName == null) {
    throw new Error('Input type name not found');
  }

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
  const hasIDScalars: boolean = false;
  let hasBooleanScalars: boolean = false;
  let hasEnumScalars: boolean = false;
  let hasCustomScalars: boolean = false;
  let hasRelationFields: boolean = false;

  const attributes = Object.values(namedType.getFields()).map((field: any) => {
    const attr: AttributeModel = {
      name: field.name,
      type: field.type.name,
      displayName: capitalizeFirst(splitByCapitalLetter(field.name)),
      isRelationField: false,
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
        } else if (field.type instanceof GraphQLInputObjectType) {
          attr.isRelationField = true;
          hasRelationFields = true;
        } else if (field.type instanceof GraphQLScalarType) {
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
    hasRelationFields,
    inputVariableName
  };
}
