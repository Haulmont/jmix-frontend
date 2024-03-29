import { EntityAttribute, ProjectModel } from "../../../../common/model/cuba-model";
import { EntityWithPath, getDisplayedAttributes, ScreenType } from "./entity";
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