import {CommonTemplateModel, deriveEntityCommon} from "../../../building-blocks/stages/template-model/pieces/common";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {MvpTemplateModelStage} from "../../../building-blocks/pipelines/mvpPipeline";
import {MvpCommonOptions, MvpComponentOptions} from "../../../building-blocks/stages/options/pieces/mvp";
import {MvpEntityBrowserAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";

export type MvpEntityBrowserTemplateModel =
  CommonTemplateModel
  & UtilTemplateModel
  & {
  entityName: string,
  queryName: string,
  queryString: string,
  deleteMutationName: string,
  deleteMutationString: string,
};

export const deriveMvpBrowserTemplateModel: MvpTemplateModelStage<MvpComponentOptions, MvpEntityBrowserAnswers, MvpEntityBrowserTemplateModel> = async (
  options: MvpComponentOptions, answers: MvpEntityBrowserAnswers, schema: GraphQLSchema, gen: YeomanGenerator, questions?: StudioTemplateProperty[]
): Promise<MvpEntityBrowserTemplateModel> => {
  return {
    ...deriveEntityCommon(options, answers),
    ...templateUtilities,
    entityName: 'scr_Car', // TODO
    queryName: 'scr_CarList', // TODO
    deleteMutationName: 'delete_scr_Car', // TODO
    queryString: `
        query scr_CarList(
          $limit: Int
          $offset: Int
          $orderBy: inp_scr_CarOrderBy
          $filter: [inp_scr_CarFilterCondition]
        ) {
          scr_CarCount(filter: $filter)
          scr_CarList(
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            filter: $filter
          ) {
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
        }
    `,
    deleteMutationString: `
      mutation Delete_scr_Car($id: String!) {
        delete_scr_Car(id: $id)
      }
    `
  };
};
