import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpEntityEditorAnswers} from "./answers";
import {GraphQLScalarType, GraphQLSchema} from "graphql";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";

export interface AttributeModel {
  type: 'Int' | 'Float' | 'String' | 'Boolean' | 'ID';
}

export interface EntityModel {
  name: string;
  attributes: Record<string, AttributeModel>
}

export type MvpEntityEditorTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & {
    queryName: string,
    queryString: string,
    mutationName: string,
    mutationString: string,
    entityModel: EntityModel,
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
  return {
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
    entityModel: {
      name: 'scr_Car',
      attributes: {
        price: {
          type: 'Int'
        },
        wheelOnRight: {
          type: 'Boolean'
        }
      }
    },
    queryName: 'scr_CarById', // TODO
    mutationName: 'scr_CarEdit', // TODO
    // TODO problem with $id: String = "", quotation marks get messed up
    // TODO @include $loadItem - add support
    queryString: `
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
    `,
    mutationString: `
        mutation Upsert_scr_Car($car: inp_scr_Car!) {
          upsert_scr_Car(car: $car) {
            id
          }
        }
    `
  }
};