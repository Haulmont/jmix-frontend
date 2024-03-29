import {formFieldsToInstanceItem, instanceItemToFormFields} from './Instance';
import {AttributeType, Cardinality, MetaClassInfo} from '../app/MetadataProvider';
import dayjs from 'dayjs';
import {prepareForCommit} from '../util/internal/data';

// TODO create tests for react-ui ant_to_jmixFront based on these ones
describe('formFieldsToInstanceItem', () => {
  it('does not remove temporary id', () => {
    const patch = {id: '_CUBA_TEMPORARY_ENTITY_ID_7283974224', stringAttr: 'Some value'};
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch).toEqual(patch);
  });

  it('does not remove normal id', () => {
    const patch = {id: 'fed2c837-e451-4ffb-aea8-51291c073438', stringAttr: 'Some value'};
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch).toEqual(patch);
  });

  it('transforms temporal property', () => {
    const patch = {dateAttr: dayjs('2020-03-01', 'YYYY-MM-DD')};
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.dateAttr).toEqual('2020-03-01');
  });

  it('transforms one-to-one composition', () => {
    const patch = {
      compositionO2Oattr: {
        dateAttr: dayjs('2020-03-01', 'YYYY-MM-DD')
      }
    };
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.compositionO2Oattr.dateAttr).toEqual('2020-03-01');
  });

  it('transforms one-to-many composition (zero entities)', () => {
    const patch = {
      compositionO2Mattr: null
    };
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.compositionO2Mattr).toEqual([]);
  });

  it('transforms one-to-many composition (>0 entities)', () => {
    const patch = {
      compositionO2Mattr: [
        {
          dateAttr: dayjs('2020-03-10', 'YYYY-MM-DD')
        },
        {
          dateAttr: dayjs('2020-03-11', 'YYYY-MM-DD')
        },
        {
          dateAttr: dayjs('2020-03-12', 'YYYY-MM-DD')
        }
      ]
    };
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.compositionO2Mattr[0].dateAttr).toEqual('2020-03-10');
    expect(normalizedPatch.compositionO2Mattr[1].dateAttr).toEqual('2020-03-11');
    expect(normalizedPatch.compositionO2Mattr[2].dateAttr).toEqual('2020-03-12');
  });

  it('transforms one-to-one association', () => {
    const patch = {
      associationO2Oattr: '86722b66-379b-4abf-9a1f-e984637827b3'
    };
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.associationO2Oattr).toEqual({id: '86722b66-379b-4abf-9a1f-e984637827b3'});
  });

  it('transforms many-to-many association', () => {
    const patch = {
      associationM2Mattr: [
        '86722b66-379b-4abf-9a1f-e984637827b3',
        'c6a1cee6-f562-48a0-acbe-9625e0b278b1',
        '52a7b1e4-4727-4802-9eb2-b58bce0eaf6e'
      ]
    };
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.associationM2Mattr).toEqual([
      {id: '86722b66-379b-4abf-9a1f-e984637827b3'},
      {id: 'c6a1cee6-f562-48a0-acbe-9625e0b278b1'},
      {id: '52a7b1e4-4727-4802-9eb2-b58bce0eaf6e'}
    ]);
  });

  it('transforms many-to-one association', () => {
    const patch = {
      associationM2Oattr: '86722b66-379b-4abf-9a1f-e984637827b3'
    };
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.associationM2Oattr).toEqual({
      id: '86722b66-379b-4abf-9a1f-e984637827b3',
    });
  });

  it('handles null value', () => {
    const patch = {stringAttr: null};
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.stringAttr).toEqual(null);
  });

  it('handles empty string value', () => {
    const patch = {stringAttr: ''};
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.stringAttr).toEqual(null);
  });

  it('does not transform string attribute', () => {
    const patch = {stringAttr: 'some string'};
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.stringAttr).toEqual('some string');
  });

  it('strips milliseconds', () => {
    const patch = {dateTimeAttr: dayjs('2012-01-02 14:15:16.123', 'YYYY-MM-DD HH:mm:ss.SSS')};
    const normalizedPatch = formFieldsToInstanceItem(patch, 'test', MOCK_METADATA);
    expect(normalizedPatch.dateTimeAttr).toEqual('2012-01-02T14:15:16.000');
  });
});

describe('instanceItemToFormFields', () => {
  it('handles undefined item', () => {
    const fields = instanceItemToFormFields(undefined, 'test', MOCK_METADATA, ['stringAttr']);
    expect(fields).toEqual({});
  });

  it('handles undefined relation attribute values', () => {
    const item = {};
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA,[
      'compositionO2Oattr',
      'compositionO2Mattr',
      'associationO2Oattr',
      'associationM2Oattr',
      'associationM2Mattr',
    ]);
    expect(fields).toEqual(item);
  });

  it('transforms fileRef', () => {
    const fileRef = 'fs://2021/03/25/917a7cc9-3e36-ed57-2d75-db45b5c10d7a.txt?name=test-file.txt';
    const item = {
      fileRefAttr: fileRef
    };
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA, ['fileRefAttr']);
    expect(fields.fileRefAttr).toEqual(fileRef);
  });

  it('does not transform compositions', () => {
    const item = {
      compositionO2Oattr: {
        id: '86722b66-379b-4abf-9a1f-e984637827b3',
        dateAttr: '2020-03-01'
      },
      compositionO2Mattr: [
        {
          id: 'c6a1cee6-f562-48a0-acbe-9625e0b278b1',
          dateAttr: '2020-03-02'
        },
        {
          id: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76',
          dateAttr: '2020-03-03'
        },
      ],
    };
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA, ['compositionO2Oattr', 'compositionO2Mattr']);
    expect(fields).toEqual({
      compositionO2Oattr: {
        id: '86722b66-379b-4abf-9a1f-e984637827b3',
        dateAttr: dayjs('2020-03-01', 'YYYY-MM-DD')
      },
      compositionO2Mattr: [
        {
          id: 'c6a1cee6-f562-48a0-acbe-9625e0b278b1',
          dateAttr: dayjs('2020-03-02', 'YYYY-MM-DD')
        },
        {
          id: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76',
          dateAttr: dayjs('2020-03-03', 'YYYY-MM-DD')
        },
      ],
    });
  });

  it('transforms one-to-one associations', () => {
    const item = {
      associationO2Oattr: {
        id: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76',
        dateAttr: '2020-03-01'
      }
    };
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA, ['associationO2Oattr']);
    expect(fields).toEqual({
      associationO2Oattr: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76'
    })
  });

  it('transforms to-many associations', () => {
    const item = {
      associationO2Mattr: [
        {
          id: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76',
          dateAttr: '2020-03-01'
        },
        {
          id: '86722b66-379b-4abf-9a1f-e984637827b3',
          dateAttr: '2020-03-02'
        }
      ]
    };
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA, ['associationO2Mattr']);
    expect(fields).toEqual({
        associationO2Mattr: ['9b4188bf-c382-4b89-aedf-b6bcee6f2f76', '86722b66-379b-4abf-9a1f-e984637827b3']
      }
    );
  });

  it('handles null attribute value', () => {
    const item = {
      stringAttr: null
    };
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA, ['stringAttr']);
    expect(fields).toEqual(item);
  });

  it('transforms temporal properties', () => {
    const item = {
      dateAttr: '2020-03-01'
    };
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA, ['dateAttr']);
    expect(dayjs.isDayjs(fields.dateAttr)).toBeTruthy();
    expect(fields.dateAttr.format('YYYY-MM-DD')).toEqual('2020-03-01');
  });

  it('does not transform string properties', () => {
    const item = {
      stringAttr: 'some value'
    };
    const fields = instanceItemToFormFields(item, 'test', MOCK_METADATA, ['stringAttr']);
    expect(fields).toEqual(item);
  });
});

describe('prepareForCommit()', () => {
  it('removes temporary id', () => {
    const item = {
      stringAttr: 'some value',
      id: '_CUBA_TEMPORARY_ENTITY_ID_7283974224'
    };
    expect(prepareForCommit(item, 'test', MOCK_METADATA)).toEqual({
      stringAttr: 'some value'
    });
  });

  it('does not remove normal id', () => {
    const item = {
      stringAttr: 'some value',
      id: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76'
    };
    expect(prepareForCommit(item, 'test', MOCK_METADATA)).toEqual(item);
  });

  it('removes read-only properties', () => {
    const item = {
      stringAttr: 'some value',
      id: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76',
      readOnlyStringAttr: 'init'
    };
    const expected = {
      stringAttr: 'some value',
      id: '9b4188bf-c382-4b89-aedf-b6bcee6f2f76',
    };
    const actual = prepareForCommit(item, 'test', MOCK_METADATA);
    expect(actual).toEqual(expected);

    const item2 = {
      stringAttr: 'some value',
      id: '_CUBA_TEMPORARY_ENTITY_ID_7283974224',
      readOnlyStringAttr: 'init'
    };
    const expected2 = {
      stringAttr: 'some value',
    };
    const actual2 = prepareForCommit(item2, 'test', MOCK_METADATA);
    expect(actual2).toEqual(expected2);
  });
});

const MOCK_METADATA: MetaClassInfo[] = [
  {
    entityName: 'test',
    className: 'test',
    idAttributeName: "id",
    persistentEntity: true,
    properties: [
      {
        name: "fileRefAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "fileRef",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "stringAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "String",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "readOnlyStringAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "String",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: true,
        isTransient: false,
      },
      {
        name: 'dateAttr',
        attributeType: 'DATATYPE' as AttributeType,
        type: 'Date',
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: 'dateTimeAttr',
        attributeType: 'DATATYPE' as AttributeType,
        type: 'DateTime',
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "associationO2Oattr",
        attributeType: "ASSOCIATION" as AttributeType,
        type: "scr_AssociationO2OTestEntity",
        cardinality: "ONE_TO_ONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "associationO2Mattr",
        attributeType: "ASSOCIATION" as AttributeType,
        type: "scr_AssociationO2MTestEntity",
        cardinality: "ONE_TO_MANY" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "associationM2Mattr",
        attributeType: "ASSOCIATION" as AttributeType,
        type: "scr_AssociationM2MTestEntity",
        cardinality: "MANY_TO_MANY" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "associationM2Oattr",
        attributeType: "ASSOCIATION" as AttributeType,
        type: "scr_AssociationM2OTestEntity",
        cardinality: "MANY_TO_ONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "compositionO2Oattr",
        attributeType: "COMPOSITION" as AttributeType,
        type: "scr_CompositionO2OTestEntity",
        cardinality: "ONE_TO_ONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
      {
        name: "compositionO2Mattr",
        attributeType: "COMPOSITION" as AttributeType,
        type: "scr_CompositionO2MTestEntity",
        cardinality: "ONE_TO_MANY" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
    ]
  },
  {
    entityName: 'scr_CompositionO2OTestEntity',
    className: 'CompositionO2OTestEntity',
    idAttributeName: "id",
    persistentEntity: true,
    properties: [
      {
        name: "dateAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "Date",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
    ]
  },
  {
    entityName: 'scr_CompositionO2MTestEntity',
    className: 'CompositionO2MTestEntity',
    idAttributeName: "id",
    persistentEntity: true,
    properties: [
      {
        name: "dateAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "Date",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
    ]
  },
  {
    entityName: 'scr_AssociationO2OTestEntity',
    className: 'AssociationO2OTestEntity',
    idAttributeName: "id",
    persistentEntity: true,
    properties: [
      {
        name: "dateAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "Date",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
    ]
  },
  {
    entityName: 'scr_AssociationO2MTestEntity',
    className: 'AssociationO2MTestEntity',
    idAttributeName: "id",
    persistentEntity: true,
    properties: [
      {
        name: "dateAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "Date",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
    ]
  },
  {
    entityName: 'scr_AssociationM2OTestEntity',
    className: 'AssociationM2OTestEntity',
    idAttributeName: "id",
    persistentEntity: true,
    properties: [
      {
        name: "dateAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "Date",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
    ]
  },
  {
    entityName: 'scr_AssociationM2MTestEntity',
    className: 'AssociationM2MTestEntity',
    idAttributeName: "id",
    persistentEntity: true,
    properties: [
      {
        name: "dateAttr",
        attributeType: "DATATYPE" as AttributeType,
        type: "Date",
        cardinality: "NONE" as Cardinality,
        // --
        mandatory: false,
        readOnly: false,
        isTransient: false,
      },
    ]
  }
];
