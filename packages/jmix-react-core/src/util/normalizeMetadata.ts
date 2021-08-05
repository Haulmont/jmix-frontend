import {AttributeType, Cardinality, MetaClassInfo, MetaPropertyInfo, Metadata, EnumInfo} from '../app/MetadataProvider'

export interface ProjectModelEntityAttr {
    // Same with the MetaPropertyInfo
    name: string;
    readOnly: boolean;
    mandatory: boolean;

    // Little differences with the MetaPropertyInfo
    transient: boolean;
    // mappingType: AttributeType,
    mappingType: string;
    // cardinality?: 'ONE_TO_ONE' | 'MANY_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_MANY'
    cardinality?: string;

    // Differences with the MetaPropertyInfo
    type: {
        packageName: string,
        className: string,
        fqn: string,
        label: string,
        entityName?: string,
    };
}

export interface ProjectModelEntity {
    name?: string;
    className: string;
    idAttributeName: string;
    persistentEntity: boolean;
    attributes: ProjectModelEntityAttr[];
}

export interface ProjectModelEnum {
    className: string
    fqn: string
    values: ({name: string, id: string | number})[]
}

export interface ProjectModelMetadata {
    entities: ProjectModelEntity[],
    enums: ProjectModelEnum[]
}

const transformType = (type: any, mappingType: AttributeType): string => {
    switch (mappingType) {
        case 'DATATYPE': return type.label;
        case 'ENUM': return type.fqn;
        case 'ASSOCIATION': return type.entityName;
        case 'COMPOSITION': return type.entityName;
        default: throw new Error(`Unknown mappingType: ${mappingType}`);
    }
}
const transformEnumsToEnumInfos = (enums: ProjectModelEnum[]): EnumInfo[] => {
    return enums.map(enumElem => ({
        name: enumElem.fqn,
        values: enumElem.values.map((value) => ({...value, caption: value.name}))
    }))
}

const transformAttrToProperty = (attr: ProjectModelEntityAttr): MetaPropertyInfo => {
    return {
        // Same with the MetaPropertyInfo
        name: attr.name,
        mandatory: attr.mandatory,
        readOnly: attr.readOnly,

        // Little differences with the MetaPropertyInfo
        attributeType: attr.mappingType as AttributeType,
        isTransient: attr.transient,
        cardinality: attr.cardinality as Cardinality || "NONE",

        // Differences with the MetaPropertyInfo
        type: transformType(attr.type, attr.mappingType as AttributeType),
    }
}

const transformEntitiesToMetaClasseses = (entities: ProjectModelEntity[]): MetaClassInfo[] => {
    return entities.map(entity => ({
        entityName: entity.name || 'UnknownEntityName',
        className: entity.className || 'UnknownClassName',
        idAttributeName: entity.idAttributeName,
        persistentEntity: entity.persistentEntity,
        properties: entity.attributes.map(transformAttrToProperty)
    }))
}

export const normalizeMetadata = (projectModelMetadata: ProjectModelMetadata): Metadata => ({
    entities: transformEntitiesToMetaClasseses(projectModelMetadata.entities),
    enums: transformEnumsToEnumInfos(projectModelMetadata.enums),
})