import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpEntityEditorAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";

export type MvpEntityEditorTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & {
    entityName: string,
    queryName: string,
    queryString: string,
    mutationName: string,
    mutationString: string
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
    // TODO get from answers:
    entityName: 'Car',
    queryName: 'scr_CarById',
    mutationName: 'scr_CarEdit',
    // TODO problem with $id: String = "", quotation marks get messed up
    queryString: `
      query scr_CarById($id: String, $loadItem: Boolean!) {
        scr_CarById(id: $id) @include(if: $loadItem) {
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