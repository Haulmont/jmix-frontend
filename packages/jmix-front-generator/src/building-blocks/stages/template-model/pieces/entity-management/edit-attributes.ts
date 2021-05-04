import {EntityAttribute, ProjectModel, View} from "../../../../../common/model/cuba-model";
import {getDisplayedAttributes, ScreenType} from "../../../../../generators/react-typescript/common/entity";
import {EntityWithPath} from "../entity";
import { getDisplayedAttributesFromQuery } from "../getDisplayedAttributesFromQuery";

export type EditAttributesTemplateModel = {
  editAttributes: EntityAttribute[];
};

export type EditAttributesWithViewTemplateModel = EditAttributesTemplateModel & {
  editView: View;
};

export type EditViewAnswers = {
  entity: EntityWithPath;
  editView: View;
}

export type EditQueryAnswers = {
  entity: EntityWithPath;
  editQuery: string;
}

/**
 * Use in REST-based entity-management templates
 *
 * @param answers
 * @param projectModel
 */
export function deriveEditAttributesFromView(answers: EditViewAnswers, projectModel: ProjectModel) {
  return {
    editAttributes: getDisplayedAttributes(
      answers.editView.allProperties,
      answers.entity,
      projectModel,
      ScreenType.EDITOR
    ),
    editView: answers.editView
  };
}

/**
 * Use in GraphQL-based entity-management templates
 *
 * @param answers
 * @param projectModel
 */
export function deriveEditAttributesFromQuery(answers: EditQueryAnswers, projectModel: ProjectModel) {
  return {
    editAttributes: getDisplayedAttributesFromQuery({
      entity: answers.entity,
      query: answers.editQuery,
      screenType: ScreenType.EDITOR,
    }, projectModel)
  }
}
