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

export interface AttributeModel {
  name: string;
  type: string;
  enumOptions?: Array<GraphQLEnumValue>;
}

export type MvpEntityEditorTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & QueryModel
  & MutationModel
  & {
    queryString: string,
    mutationName: string,
    mutationString: string,
  };

export type MutationModel = {
  inputVariableName: string;
};

export type QueryModel = {
  queryName: string,
  entityName: string,
  attributes: AttributeModel[],

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
  // const queryString = answers.query;
  const queryString = MOCK_QUERY_STRING;
  // const mutationString = answers.upsertMutation;
  const mutationString = MOCK_MUTATION_STRING;

  const queryNode = gql(queryString);
  const mutationNode = gql(mutationString);

  return {
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
    ...deriveQueryModel(queryNode, schema),
    ...deriveMutationModel(mutationNode, schema),
    mutationName: 'scr_CarEdit', // TODO
    // TODO problem with $id: String = "", quotation marks get messed up
    // TODO @include $loadItem - add support
    queryString,
    mutationString
  }
};

export function deriveMutationModel(mutationNode: DocumentNode, schema: GraphQLSchema): MutationModel {
  const operationDefinition = mutationNode.definitions[0];
  if (!('variableDefinitions' in operationDefinition) || operationDefinition.variableDefinitions == null) {
    throw new Error('Variable definitions not found in mutation');
  }

  // TODO: what if more than one variable is required?
  const inputVariableName = operationDefinition.variableDefinitions[0].variable.name.value;

  return {
    inputVariableName
  };
}

export function deriveQueryModel(queryNode: DocumentNode, schema: GraphQLSchema): QueryModel {
  const queryName = getOperationName(queryNode);

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

  const namedType = typeMap[outputTypeName];
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
      type: field.type.name
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
    attributes,
    entityName: outputTypeName,
    hasStringScalars,
    hasIntScalars,
    hasFloatScalars,
    hasIDScalars,
    hasBooleanScalars,
    hasEnumScalars,
    hasCustomScalars
  };
}

function getOperationName(node: DocumentNode): string {
  const operationDefinition = node.definitions[0];
  if (!('selectionSet' in operationDefinition)) {
    throw new Error('Selection set is not found in operation definition');
  }

  const selection = operationDefinition.selectionSet.selections[0];
  if (!('name' in selection)) {
    throw new Error('Name not found');
  }

  return selection.name.value;
}


const MOCK_QUERY_STRING = `
      query scr_CarById($id: String!) {
        scr_CarById(id: $id) {
          id
          _instanceName
          manufacturer
          model
          regNumber
          purchaseDate
          manufactureDate
          wheelOnRight
          carType
          ecoRank
          maxPassengers
          price
          mileage
          garage {
            id
            _instanceName
          }
          technicalCertificate {
            id
            _instanceName
          }
    
          version
          createdBy
          createdDate
          lastModifiedBy
          lastModifiedDate
        }
    
        scr_GarageList {
          id
          _instanceName
        }
    
        scr_TechnicalCertificateList {
          id
          _instanceName
        }
      }
    `;

const MOCK_MUTATION_STRING = `
        mutation Upsert_scr_Car($car: inp_scr_Car!) {
          upsert_scr_Car(car: $car) {
            id
          }
        }
    `;