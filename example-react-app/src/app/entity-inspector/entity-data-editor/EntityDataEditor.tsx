import { DocumentNode, gql } from "@apollo/client";
import { 
  Metadata, 
  useMetadata, 
  EntityNamesInfo, 
  getPropertyInfoNN, 
  MetaPropertyInfo, 
  EntityInstance, 
  HasId, 
  MayHaveInstanceName,
  getAllEntityPropertiesNames,
  getAllPersistentEntitiesNames,
  isToOneAssociation
} from "@haulmont/jmix-react-core";
import {
  useEntityEditor, 
  createUseAntdForm, 
  createUseAntdFormValidation, 
  Spinner, 
  RetryDialog,
  createAntdFormValidationMessages,
  GlobalErrorsAlert,
  Field
} from "@haulmont/jmix-react-ui";
import { FormattedMessage } from "react-intl";
import { observer } from "mobx-react";
import React, {useMemo, useCallback, useState} from "react";
import { generateGqlQuery, GqlQueryType } from "../gqlQueryGeneration";
import { useForm } from "antd/es/form/Form";
import { Form, Button, Card } from "antd";
import { useEffect } from "react";
import { ScreenItem, ViewerModes } from "../EntityInspector";
import {EntityDataViewer} from "../entity-data-viewer";
import { getEntityNamesInfo } from "../entity-inspector-main";
import {DashOutlined} from '@ant-design/icons';
import './EntityDataEditor.css';

interface Props {
  entityNamesInfo: EntityNamesInfo,
  entityAttrs: string [],
  entityId?: string,
  routingPath: string,
  setScreens: React.Dispatch<React.SetStateAction<ScreenItem[]>>
}

interface AssocAttrValue {
  [attrName: string] : string
}

export const EntityDataEditor = observer(({entityNamesInfo, entityAttrs, entityId, setScreens, routingPath}: Props) => {
  const {entityName} = entityNamesInfo;

  const metadata: Metadata = useMetadata();

  const entityAttrsInfo: MetaPropertyInfo[] = useMemo(() => {
    return entityAttrs.map((attr) => {
      return getPropertyInfoNN(attr, entityName, metadata.entities)
    })
  }, [entityAttrs, entityName, metadata])
  
  const loadQuery: DocumentNode = useMemo(() => {
    const query = generateGqlQuery(entityNamesInfo, metadata, entityAttrs, GqlQueryType.DataById);
    return gql`${query}`;
  }, [entityNamesInfo, entityAttrs]);

  const upsertMutation: DocumentNode = useMemo(() => {
    const query = generateGqlQuery(entityNamesInfo, metadata, entityAttrs, GqlQueryType.Upsert);
    return gql`${query}`;
  }, [entityNamesInfo, entityAttrs]);

  const [assocAttrsValues, setAssocAttrsValues] = useState<AssocAttrValue>({});


  const [form] = useForm();
  const {
    relationOptions,
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    serverValidationErrors,
    intl,
    handleSubmit,
    handleSubmitFailed,
  } = useEntityEditor<Object>({
    loadQuery,
    upsertMutation,
    entityName,
    routingPath,
    entityId,
    useEntityEditorForm: createUseAntdForm(form),
    useEntityEditorFormValidation: createUseAntdFormValidation(form)
  });

  useEffect(() => {
    const assocAttrsEntries = Object.entries(assocAttrsValues);
    const currentFieldsValues = form.getFieldsValue()
    let updatedFieldsValues = {...currentFieldsValues};
    assocAttrsEntries.forEach(([key, value]) => {
      updatedFieldsValues = {
        ...updatedFieldsValues,
        [key]: value
      }
    });
    form.setFieldsValue(updatedFieldsValues);
  }, [assocAttrsValues]);

  const onAssocFieldChange = useCallback((attrName: string) => {
    const onChange = (value: string) => {
      setAssocAttrsValues((values) => {
        return {
          ...values,
          [`${attrName}`]: value
        }
      })
    }
    return onChange;
  }, []);

  const onEntitySelect = useCallback((attrName: string) => {
    const onSelect = (value: string) => {
      onAssocFieldChange(attrName)(value);
      setScreens((screens) => {
        return [...screens].slice(0, screens.length - 1);
      })
    }
    return onSelect;
  }, []);

  const cancelEditBtnHandler = useCallback(() => {
    setScreens((screens) => {
      return [...screens].slice(0, screens.length-1);
    })
  }, []);

  if (queryLoading) {
    return <Spinner />;
  }

  if (queryError != null) {
    return <RetryDialog onRetry={executeLoadQuery} />;
  }

  return (
    <Card className="narrow-layout">
      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        layout="vertical"
        form={form}
        validateMessages={createAntdFormValidationMessages(intl)}
      >
        {renderFields(entityAttrsInfo, entityName, routingPath, setScreens, onAssocFieldChange, onEntitySelect, metadata, relationOptions)}

        <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

        <Form.Item style={{ textAlign: "center" }}>
          <Button htmlType="button" onClick={cancelEditBtnHandler}>
            <FormattedMessage id="common.cancel" />
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={upsertLoading}
            style={{ marginLeft: "8px" }}
          >
            <FormattedMessage id={"common.submit"} />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
})

function renderFields(
  entityAttrsInfo: MetaPropertyInfo[],
  entityName: string,
  routingPath: string,
  setScreens: React.Dispatch<React.SetStateAction<ScreenItem[]>>,
  onAssocFieldChange: (attrName: string) => (value: string) => void,
  onEntitySelect: (attrName: string) => (value: string) => void,
  metadata: Metadata,
  relationOptions?: Map<string, EntityInstance<unknown, HasId, MayHaveInstanceName>[]>
) : JSX.Element[] {
  return entityAttrsInfo
    .filter((attrInfo) => {
      const condition =  attrInfo.type !== "fileRef" && attrInfo.name !== "id";
      return condition;
    })
    .map((attrInfo) => {
      const entityAttrs =getAllEntityPropertiesNames(attrInfo.type, metadata)!;
      const entityNamesInfo = getEntityNamesInfo(getAllPersistentEntitiesNames(metadata), attrInfo.type);

      if(isToOneAssociation(attrInfo)) {
        return (
          <div className={"m2o-association-field-container"}>
            <div className={"m2o-association-field-wrapper"}>
              <Field
                entityName={entityName}
                propertyName={attrInfo.name}
                associationOptions={relationOptions?.get(attrInfo.type)}
                formItemProps={{
                  rules: attrInfo.mandatory ? [{required: true}] : undefined,
                }}
                componentProps={{
                  onChange: onAssocFieldChange(attrInfo.name)
                }}
                key={attrInfo.name}
              />
            </div>
            <DashOutlined
              className={"m2o-association-field-entity-picker-icon"}
              onClick={() => {
                setScreens((screens) => {
                  return [
                    ...screens,
                    {
                      component: EntityDataViewer,
                      props: {
                        onEntitySelect: onEntitySelect(attrInfo.name),
                        mode: ViewerModes.ViewWithSelection,
                        setScreens,
                        entityAttrs,
                        entityNamesInfo,
                        routingPath
                      },
                      caption: `${attrInfo.type} view`,
                      id: screens.length
                    }
                  ]
                })
              }}
            />
          </div>
        )
      }
      return (
        <Field
          entityName={entityName}
          propertyName={attrInfo.name}
          disabled={attrInfo.readOnly}
          formItemProps={{
            rules: attrInfo.mandatory ? [{required: true}] : undefined,
            valuePropName: attrInfo.type === "Boolean" ? "checked" : undefined
          }}
          key={attrInfo.name}
        />
      )
  })
}

export type {
  Props as DataEditorProps
}
