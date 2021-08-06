import { StudioTemplateProperty, StudioTemplatePropertyType } from "src/common/studio/studio-model"
import { EntityWithPath } from "../../template-model/pieces/entity";

export interface StepQuestionParam {
    name: string;
    order: string;
};

export interface EntityAnswer {
    entity: EntityWithPath;
};
export const entityQuestion: StudioTemplateProperty = {
    code: 'entity',
    caption: 'Entity',
    propertyType: StudioTemplatePropertyType.ENTITY,
    required: true
};

export interface ComponentNameAnswer {
    componentName: string;
};
interface ComponentNameQuestionOptions {
    defaultValue: string;
    code?: string;
    caption?: string;
    required?: boolean;
    step?: StepQuestionParam;
};
export const createComponentNameQuestion = (options: ComponentNameQuestionOptions): StudioTemplateProperty => ({
    code: options?.code || 'componentName',
    caption: options?.caption || 'Component name',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: options?.defaultValue,
    required: options?.required || true,
    step: options.step
});

export interface MenuItemAnswer {
    menuItem: string | null;
};
export const menuItemQuestion: StudioTemplateProperty = {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: false
};

export interface QueryAnswer {
    query: string;
};
interface QueryQuestionOptons {
    code?: string;
    caption?: string;
    defaultValue?: string;
    relatedProperty?: string;
    required?: boolean;
    step?: StepQuestionParam;
};
export const createQueryQuestion = (options?: QueryQuestionOptons): StudioTemplateProperty => ({
    code: options?.code || 'query',
    // Subject to change, in future we might want to get the full query from Studio
    caption: options?.caption || 'GraphQL query for screen',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    relatedProperty: options?.relatedProperty || "entity",
    required: options?.required || true,
    step: options?.step
});
