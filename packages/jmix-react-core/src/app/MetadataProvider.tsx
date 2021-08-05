import React, { createContext, useContext } from "react";

export type Cardinality = 'NONE' | 'ONE_TO_ONE' | 'MANY_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_MANY';

export type AttributeType = 'DATATYPE' | 'ENUM' | 'ASSOCIATION' | 'COMPOSITION';
  
export interface MetaPropertyInfo {
    // Same with the ProjectModelEntityAttr
    name: string;
    mandatory: boolean;
    readOnly: boolean;
    
    // Little differences with the ProjectModelEntityAttr
    isTransient: boolean;
    attributeType: AttributeType;
    cardinality: Cardinality;

    // Differences with the ProjectModelEntityAttr
    type: string;
}

export interface MetaClassInfo {
    entityName: string;
    className: string;
    idAttributeName: string;
    persistentEntity: boolean;
    properties: MetaPropertyInfo[];
}

export interface EnumValueInfo {
    name: string;
    id: string | number;
    caption: string;
}
export interface EnumInfo {
    name: string;
    values: EnumValueInfo[];
}

export interface Metadata {
    entities: MetaClassInfo[];
    enums: EnumInfo[];
}

let globalMetadata: Metadata | undefined;

export const MetadataContext = createContext<Metadata>({
    entities: [],
    enums: [],
});

export function getMetadata(): Metadata {
    if (!globalMetadata) throw new Error('JmixAppProvider isn\'t initalized!')
    return globalMetadata;
}

export const useMetadata = (): Metadata => {
    const metadata = useContext(MetadataContext);
    return metadata;
}

export interface MetadataProviderProps {
    metadata: Metadata;
    children: React.ReactNode | React.ReactNode[] | null;
}

export const MetadataProvider = ({
    metadata,
    children
}: MetadataProviderProps) => {
    globalMetadata = metadata

    return (
        <MetadataContext.Provider value={metadata}>
            {children}
        </MetadataContext.Provider>
    )
};

export interface MetadataInjected {
    metadata: Metadata;
}

export const injectMetadata = <P extends MetadataInjected>(
    Component: React.ComponentType<P>
): React.ComponentType<Omit<P, "metadata">> => (props) => (
    <MetadataContext.Consumer>
        {metadata => <Component metadata={metadata} {...props as any} />}
    </MetadataContext.Consumer> 
)
