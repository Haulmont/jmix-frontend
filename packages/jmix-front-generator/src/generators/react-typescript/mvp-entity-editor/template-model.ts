import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpEntityEditorAnswers} from "./answers";
import {
  DocumentNode,
  GraphQLEnumType, GraphQLEnumValue,
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

export interface AttributeModel {
  name: string;
  type: string;
  enumOptions?: Array<GraphQLEnumValue>;
}

export type MvpEntityEditorTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & {
    queryName: string,
    queryString: string,
    mutationName: string,
    mutationString: string,
    entityName: string,
    attributes: AttributeModel[],
  };

export const deriveMvpEditorTemplateModel: MvpTemplateModelStage<
  MvpComponentOptions, MvpEntityEditorAnswers, MvpEntityEditorTemplateModel
> = async (
  options: MvpComponentOptions,
  answers: MvpEntityEditorAnswers,
  schema: GraphQLSchema,
  gen: YeomanGenerator,
  questions?: StudioTemplateProperty[]
): Promise<MvpEntityEditorTemplateModel>  => {
  // const queryString = answers.query;
  const queryString = MOCK_QUERY_STRING;
  // const mutationString = answers.upsertMutation;
  const mutationString = MOCK_MUTATION_STRING;

  const queryNode = gql(queryString);

  return {
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
    ...deriveQueryModel(queryNode, schema),
    mutationName: 'scr_CarEdit', // TODO
    // TODO problem with $id: String = "", quotation marks get messed up
    // TODO @include $loadItem - add support
    queryString,
    mutationString
  }
};

export function deriveQueryModel(
  queryNode: DocumentNode, schema: GraphQLSchema
): {queryName: string, attributes: AttributeModel[], entityName: string} {
  const operationDefinition = queryNode.definitions[0];
  if (!('selectionSet' in operationDefinition)) {
    throw new Error('Selection set is not found in operation definition');
  }

  const queryName = operationDefinition.name?.value;
  if (queryName == null) {
    throw new Error('Query name not found');
  }

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

  const attributes = Object.values(namedType.getFields()).map((field: any) => {
    const attr: AttributeModel = {
      name: field.name,
      type: field.type.name
    };

    if (field.type instanceof GraphQLEnumType) {
      attr.enumOptions = field.type.getValues();
    }

    return attr;
  });

  return {
    queryName,
    attributes,
    entityName: outputTypeName
  };
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