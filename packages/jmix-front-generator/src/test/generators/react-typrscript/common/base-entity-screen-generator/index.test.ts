import { expect } from "chai";
import {stringIdAnswersToModel} from '../../../../../generators/react-typescript/common/base-entity-screen-generator';
import {MappingType} from '../../../../../common/model/cuba-model';

const projectModel = require('../../../../fixtures/project-model--scr.json');
const stringIdAnswers = require('../../../../fixtures/answers/string-id-management-table.js');
const stringIdAnswersExplicitIdName = require('../../../../fixtures/answers/string-id-management-table-explicit-id-name.json');
const stringIdAnswersNoIdName = require('../../../../fixtures/answers/string-id-management-table-no-id-name.json');
const stringIdAnswersUnexistentIdName = require('../../../../fixtures/answers/string-id-management-table-unexistent-id-name.json');
const intIdAnswers = require('../../../../fixtures/answers/int-id-management-table.json');

const listAttrsStringId = [
  {
    "name": "description",
    "type": {
      "packageName": "java.lang",
      "className": "String",
      "fqn": "java.lang.String",
      "label": "String"
    },
    "mappingType": "DATATYPE" as MappingType,
    "readOnly": false,
    "column": "DESCRIPTION",
    "mandatory": false,
    "unique": false,
    "length": 255,
    "transient": false
  }
];

const editAttrsStringId = [
  {
    "name": "description",
    "type": {
      "packageName": "java.lang",
      "className": "String",
      "fqn": "java.lang.String",
      "label": "String"
    },
    "mappingType": "DATATYPE" as MappingType,
    "readOnly": false,
    "column": "DESCRIPTION",
    "mandatory": false,
    "unique": false,
    "length": 255,
    "transient": false
  },
  {
    "name": "productCode",
    "type": {
      "packageName": "java.lang",
      "className": "String",
      "fqn": "java.lang.String",
      "label": "String"
    },
    "mappingType": "DATATYPE" as MappingType,
    "readOnly": false,
    "column": "PRODUCT_CODE",
    "mandatory": false,
    "unique": false,
    "length": 10,
    "transient": false
  },
];

const listAttrsIntId = listAttrsStringId.slice();
const editAttrsIntId = listAttrsIntId.slice();

const editAttrsImpostorId = [
  {
    "name": "id",
    "type": {
      "packageName": "java.lang",
      "className": "String",
      "fqn": "java.lang.String",
      "label": "String"
    },
    "mappingType": "DATATYPE" as MappingType,
    "readOnly": false,
    "column": "DESCRIPTION",
    "mandatory": false,
    "unique": false,
    "length": 255,
    "transient": false
  },
  {
    "name": "description",
    "type": {
      "packageName": "java.lang",
      "className": "String",
      "fqn": "java.lang.String",
      "label": "String"
    },
    "mappingType": "DATATYPE" as MappingType,
    "readOnly": false,
    "column": "DESCRIPTION",
    "mandatory": false,
    "unique": false,
    "length": 255,
    "transient": false
  }
];

describe('stringIdAnswersToModel()', () => {
  // TODO not supported yet
  xit('should return correct result for a String ID entity', () => {
    const entity = projectModel.entities.find((e: any) => e.name === 'scr_StringIdTestEntity');

    const { stringIdName, listAttributes, editAttributes } = stringIdAnswersToModel(
      stringIdAnswers,
      projectModel,
      entity,
      listAttrsStringId,
      editAttrsStringId
    );

    expect(stringIdName).to.equal('identifier');
    expect(listAttributes[1].name).to.equal('identifier');
    expect(editAttributes[1].name).to.equal('identifier');
  });

  it('should return correct result for a String ID entity ' +
    'when ID attribute name is not in project model', () => {

    const entity = projectModel.entities.find((e: any) => e.name === 'scr_StringIdTestEntity');

    const { stringIdName, listAttributes, editAttributes } = stringIdAnswersToModel(
      stringIdAnswersExplicitIdName,
      projectModel,
      entity,
      listAttrsStringId,
      editAttrsStringId
    );

    expect(stringIdName).to.equal('identifier');
    expect(listAttributes[1].name).to.equal('identifier');
    expect(editAttributes[1].name).to.equal('identifier');
  });

  it('should return correct result for an entity that is not a String ID entity', () => {
    const entity = projectModel.entities.find((e: any) => e.name === 'scr_IntegerIdTestEntity');

    const { stringIdName, listAttributes, editAttributes } = stringIdAnswersToModel(
      intIdAnswers,
      projectModel,
      entity,
      listAttrsIntId,
      editAttrsIntId
    );

    expect(stringIdName).to.be.undefined;
    expect(listAttributes.length).to.equal(1);
    expect(listAttributes[0].name).to.equal('description');
    expect(editAttributes.length).to.equal(1);
    expect(editAttributes[0].name).to.equal('description');
  });

  it('should throw if String ID name is neither in the project model nor in the answers', () => {
    const entity = projectModel.entities.find((e: any) => e.name === 'scr_StringIdTestEntity');

    expect(() => stringIdAnswersToModel(
      stringIdAnswersNoIdName,
      projectModel,
      entity,
      listAttrsStringId,
      editAttrsStringId
    )).to.throw('Could not find the stringIdName');
  });

  it('should throw if ID attribute does not exist', () => {
    const entity = projectModel.entities.find((e: any) => e.name === 'scr_StringIdTestEntity');

    expect(() => stringIdAnswersToModel(
      stringIdAnswersUnexistentIdName,
      projectModel,
      entity,
      listAttrsStringId,
      editAttrsStringId
    )).to.throw('Unable to find ID attribute. Expected the ID attribute to be named "dientifire".');
  });

  // TODO not supported yet
  xit('should return correct result for a String ID entity that has a non-ID attribute named `id`', () => {
    const entity = projectModel.entities.find((e: any) => e.name === 'scr_StringIdTestEntity');

    const { editAttributes } = stringIdAnswersToModel(
      stringIdAnswers,
      projectModel,
      entity,
      listAttrsStringId,
      editAttrsImpostorId
    );

    expect(editAttributes.length).to.equal(2);
    expect(editAttributes[1].name).to.equal('identifier');
  });
});
