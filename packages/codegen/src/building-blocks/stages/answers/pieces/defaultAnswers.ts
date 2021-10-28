import { StudioTemplatePropertyType } from "src/common/studio/studio-model"
import { EntityWithPath } from "../../template-model/pieces/entity";

export interface EntityAnswer {
    entity: EntityWithPath;
}
export const entityQuestion = {
    code: 'entity',
    caption: 'Entity',
    propertyType: StudioTemplatePropertyType.ENTITY,
    required: true
};

export interface ComponentNameAnswer {
    componentName: string;
}
interface ComponentNameQuestionOption {
    defaultValue: string;
    code?: string;
    caption?: string;
    required?: boolean;
}
export const createComponentNameQuestion = (options: ComponentNameQuestionOption) => ({
    code: options?.code || 'componentName',
    caption: options?.caption || 'Component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: options?.defaultValue,
    required: options?.required || true,
});

export interface MenuItemAnswer {
    menuItem: string | null;
}
export const menuItemQuestion = {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: false
};

export interface QueryAnswer {
    query: string;
}
interface QueryQuestionOptions {
    code?: string;
    caption?: string;
    defaultValue?: string;
    relatedProperty?: string;
    required?: boolean;
}
export const createQueryQuestion = (options?: QueryQuestionOptions) => ({
    code: options?.code || 'query',
    // Subject to change, in future we might want to get the full query from Studio
    caption: options?.caption || 'GraphQL query for screen',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: options?.relatedProperty || "entity",
    required: options?.required || true
});
