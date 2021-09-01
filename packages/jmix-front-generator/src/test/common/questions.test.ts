import {fromStudioProperty, ObjectChoice} from "../../common/questions";
import projectModel from '../fixtures/mpg-projectModel.json';
import {StudioTemplatePropertyType} from '../../common/studio/studio-model';
import { expect } from "chai";

describe('interactive CLI question helpers', () => {
  it('correctly creates choices for an Entity', () => {
    const prop = {
      code: 'test',
      caption: 'test',
      propertyType: StudioTemplatePropertyType.ENTITY,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO VP Replace enums with string union types in ProjectModel https://github.com/cuba-platform/front-generator/issues/46
    const question = fromStudioProperty(prop, projectModel);

    expect(question.choices).to.exist;
    expect(question.choices).to.be.an('Array');

    const expectedEntityNames = [
      "scr_Car",
      "scr_CarDto",
      "scr_CarRent",
      "scr_FavoriteCar",
      "scr_Garage",
      "ScrUserInfo",
      "scr_SparePart",
      "scr_TechnicalCertificate",
      "scr_User",
      "scr_Customer",
      "scr_Order",
      "scr_OrderLine",
      "scr_Product",
      "scr_AssociationM2MTestEntity",
      "scr_AssociationM2OTestEntity",
      "scr_AssociationO2MTestEntity",
      "scr_AssociationO2OTestEntity",
      "scr_BoringStringIdTestEntity",
      "scr_CompositionO2MTestEntity",
      "scr_CompositionO2OTestEntity",
      "scr_DatatypesTestEntity",
      "scr_DatatypesTestEntity2",
      "scr_DatatypesTestEntity3",
      "scr_DeeplyNestedO2MTestEntity",
      "scr_DeeplyNestedTestEntity",
      "scr_IntIdentityIdTestEntity",
      "scr_IntegerIdTestEntity",
      "scr_StringIdTestEntity",
      "scr_WeirdStringIdTestEntity",
      "scr_TrickyIdTestEntity",
      "scr_Order_1",
    ];
    const actualEntityNames = (question.choices! as ObjectChoice[]).map((choice: ObjectChoice) => choice.name);
    expect(actualEntityNames).to.deep.equal(expectedEntityNames);
  });

});
