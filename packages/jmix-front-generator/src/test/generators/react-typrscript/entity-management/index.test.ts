import {EntityAttribute} from "../../../../common/model/cuba-model";
import {expect} from "chai";
import {EditRelations} from "../../../../generators/react-typescript/entity-management/template-model";
import {EntityTemplateModel} from "../../../../generators/react-typescript/common/template-model";
import {getRelations, getRelationImports} from "../../../../building-blocks/stages/template-model/pieces/relations"
import {deriveViewBasedBrowserTemplateModel} from "../../../../building-blocks/stages/template-model/pieces/entity-browser/browser";
import {deriveEditAttributesFromView} from "../../../../building-blocks/stages/template-model/pieces/entity-management/edit-attributes";
import {refineAnswers} from "../../../../building-blocks/stages/answers/pieces/refineAnswers";
import {commonEntityManagementQuestions, viewQuestions} from "../../../../building-blocks/stages/answers/pieces/entity-management/entity-management-common";
import {Answers} from "../../../../generators/react-typescript/entity-management/answers"

const projectModel = require('../../../fixtures/mpg-projectModel.json');
const projectModelScr = require('../../../fixtures/project-model--scr.json');

describe('entity management generation test', function () {

  it('should collect relations', function () {
    const attributes: EntityAttribute[] = [createAttr('attr1'), createAttr('attr2')];
    const relations = getRelations(projectModel, attributes);

    expect(relations.associations.attr1.path).eq('jmix/entities/mpg$Car');
    expect(relations.associations.attr2.path).eq('jmix/entities/mpg$Car');
  });

  it('should sort out identical items from relation imports', function () {
    const relations: EditRelations = {
      e1: {className: 'Car', path: 'jmix/entities/mpg$Car'} as any,
      e2: {className: 'Car', path: 'jmix/entities/mpg$Car'} as any
    };
    const entity: EntityTemplateModel = {className: 'Car', path: 'jmix/entities/mpg$Car'} as any;
    const relationImports = getRelationImports(relations, entity);
    expect(relationImports.length).eq(1);
    expect(relationImports[0].className).eq('Car');
    expect(relationImports[0].path).eq('jmix/entities/mpg$Car');
  });

  it('should determine view attributes', () => {
    const localView = {name: '_local', entityName: 'scr_DatatypesTestEntity'};
    const viewWithCompositions = {name: 'datatypesTestEntity-view', entityName: 'scr_DatatypesTestEntity'};
    const rawAnswers1: any = {
      entity:{
        name: 'scr_DatatypesTestEntity'
      },
      listView: localView,
      editView: localView
    };
    const rawAnswers2: any = {
      entity:{
        name: 'scr_DatatypesTestEntity'
      },
      listView: viewWithCompositions,
      editView: viewWithCompositions
    };
    const rawAnswers3: any = {
      entity:{
        name: 'scr_DatatypesTestEntity'
      },
      listView: localView,
      editView: viewWithCompositions
    };

    const questions = [
      ...commonEntityManagementQuestions,
      ...viewQuestions
    ];

    const answers1 = refineAnswers<Answers>(projectModelScr, questions, rawAnswers1);
    const answers2 = refineAnswers<Answers>(projectModelScr, questions, rawAnswers2);
    const answers3 = refineAnswers<Answers>(projectModelScr, questions, rawAnswers3);

    const viewAttrs1 = [...new Set([
      ...deriveViewBasedBrowserTemplateModel(
        answers1,
        projectModelScr
      ).listAttributes.map((item) => {
        return item.name;
      }),
      ...deriveEditAttributesFromView(
        answers1,
        projectModelScr
      ).editAttributes.map((item) => {
        return item.name;
      })]
    )];
 
    expect(viewAttrs1.length).to.equal(new Set(viewAttrs1).size);
    expect(viewAttrs1).to.not.contain('compositionO2Oattr');
    expect(viewAttrs1).to.not.contain('compositionO2Mattr');

    const viewAttrs2 = [...new Set([
      ...deriveViewBasedBrowserTemplateModel(
        answers2,
        projectModelScr, 
      ).listAttributes.map((item) => {
        return item.name;
      }),
      ...deriveEditAttributesFromView(
        answers2,
        projectModelScr, 
      ).editAttributes.map((item) => {
        return item.name;
      })]
    )];

    expect(viewAttrs2).to.contain('compositionO2Oattr');
    expect(viewAttrs2).to.contain('compositionO2Mattr');

    const viewAttrs3 = [...new Set([
      ...deriveViewBasedBrowserTemplateModel(
        answers3,
        projectModelScr, 
      ).listAttributes.map((item) => {
        return item.name;
      }),
      ...(deriveEditAttributesFromView(
        answers3,
        projectModelScr, 
      ).editAttributes.map((item) => {
        return item.name;
      }))]
    )];

    expect(viewAttrs3).to.contain('compositionO2Oattr');
    expect(viewAttrs3).to.contain('compositionO2Mattr');
  });
});

function createAttr(name: string): EntityAttribute {
  return {
    mappingType: 'ASSOCIATION',
    name,
    type: {
      packageName: "com.company.mpg.entity",
      className: "Car",
      fqn: "com.company.mpg.entity.Car",
      label: "Car",
      entityName: "mpg$Car"
    }
  } as EntityAttribute;
}
