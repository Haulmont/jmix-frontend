import { EntityEditorTemplateModel } from "../../building-blocks/stages/template-model/pieces/editor";
import { EntityTemplateModel } from "../../building-blocks/stages/template-model/pieces/entity";
import { UtilTemplateModel } from "../../building-blocks/stages/template-model/pieces/util";
import { EntityAttribute } from "../../common/model/cuba-model";

export interface FieldsTemplateModel extends
EntityEditorTemplateModel,
UtilTemplateModel,
EntityTemplateModel {
    attributes: EntityAttribute[];
    fieldsComponentName: any;
}