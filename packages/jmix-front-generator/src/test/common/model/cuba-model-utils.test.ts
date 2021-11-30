import {
  findEntity,
  findQuery,
  findServiceMethod,
  transformValidationRules
} from "../../../common/model/cuba-model-utils";
import {RestServiceMethodInfo} from "../../../common/studio/studio-model";
import {expect} from "chai";

const projectModel = require('../../fixtures/mpg-projectModel.json');

describe('cuba model utils', function () {

  // TODO
  xit('should find query', function () {
    expect(findQuery(projectModel, {entityName: '', name: ''})).to.be.undefined;
    expect(findQuery(projectModel, {entityName: 'mpg$Car', name: 'allCars'})!.jpql).eq('select c from mpg$Car c');
  });

  // TODO
  xit('should find service method', function () {
    expect(findServiceMethod(projectModel, {methodName: '', serviceName: ''})).to.be.null;

    const methodInfo: RestServiceMethodInfo = {methodName: 'addFavorite', serviceName: 'mpg_FavoriteService'};
    const methodModel = findServiceMethod(projectModel, methodInfo);

    expect(methodModel!.service.name).eq('mpg_FavoriteService');
    expect(methodModel!.method.name).eq('addFavorite');
  });

  it('should find entity', function () {
    expect(findEntity(projectModel, {name: ''})).to.be.undefined;
    expect(findEntity(projectModel, {name: 'scr_Car'})!.fqn).eq('com.company.scr.entity.Car');
  });


  it('should transoform validation rules', function() {
    expect(transformValidationRules()).to.be.undefined
    expect(transformValidationRules([{
      name: 'Pattern',
      regexp: '(?i)\\b(\\w+)\\b(\\s+\\1)+\\b'
    }])).eql([{
      name: 'Pattern',
      regexp: '\\b(\\w+)\\b(\\s+\\1)+\\b',
      modifiers: 'i'
    }])
  })
});