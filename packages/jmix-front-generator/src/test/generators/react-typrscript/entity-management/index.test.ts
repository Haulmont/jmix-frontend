import {EntityAttribute} from "../../../../common/model/cuba-model";
import {expect} from "chai";
import {
  getRelations,
  getRelationImports,
  RelationalAttributes
} from "../../../../building-blocks/stages/template-model/pieces/relations"
import {EntityWithPath} from "../../../../building-blocks/stages/template-model/pieces/entity";

const projectModel = require('../../../fixtures/mpg-projectModel.json');

describe('entity management generation test', function () {

  it('should collect relations', function () {
    const attributes: EntityAttribute[] = [createAttr('attr1'), createAttr('attr2')];
    const relations = getRelations(projectModel, attributes);

    expect(relations.associations.attr1.path).eq('jmix/entities/scr_Car');
    expect(relations.associations.attr2.path).eq('jmix/entities/scr_Car');
  });

  it('should sort out identical items from relation imports', function () {
    const relations: RelationalAttributes = {
      e1: {className: 'Car', path: 'jmix/entities/mpg$Car'} as any,
      e2: {className: 'Car', path: 'jmix/entities/mpg$Car'} as any
    };
    const entity: EntityWithPath = {className: 'Car', path: 'jmix/entities/mpg$Car'} as any;
    const relationImports = getRelationImports(relations, entity);
    expect(relationImports.length).eq(1);
    expect(relationImports[0].className).eq('Car');
    expect(relationImports[0].path).eq('jmix/entities/mpg$Car');
  });

});

function createAttr(name: string): EntityAttribute {
  return {
    mappingType: 'ASSOCIATION',
    name,
    type: {
      packageName: "com.company.scr.entity",
      className: "Car",
      fqn: "com.company.scr.entity.Car",
      label: "Car",
      entityName: "scr_Car"
    }
  } as EntityAttribute;
}
