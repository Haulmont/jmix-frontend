import { EntityAttribute, ProjectModel } from "../../../../common/model/cuba-model";
import { getDisplayedAttributes, ScreenType } from "../../../../generators/react-typescript/common/entity";
import { EntityWithPath } from "./entity";
import { getTopAttributesFromQuery } from "./getTopAttributesFromQuery";

interface GetDisplayedAttributesFromQueryOptions {
    entity: EntityWithPath;
    query: string;
    screenType: ScreenType;
}

export const getDisplayedAttributesFromQuery = (
    options: GetDisplayedAttributesFromQueryOptions, projectModel: ProjectModel
): EntityAttribute[] => {
    const attributes = getTopAttributesFromQuery(options.query);

    const viewProps = attributes.map(name => ({name}));

    return getDisplayedAttributes(
        viewProps,
        options.entity,
        projectModel,
        options.screenType,
    );
}