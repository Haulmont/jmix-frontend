import { DocumentNode, gql } from "@apollo/client";
import { 
  Metadata, 
  useMetadata, 
  getPropertyInfoNN, 
  MetaPropertyInfo, 
  EntityInstance
} from "@haulmont/jmix-react-core";
import {
  useEntityEditor, 
  createAntdFormValidationMessages,
} from "@haulmont/jmix-react-web";
import {
  createUseAntdForm, 
  createUseAntdFormValidation, 
  Spinner, 
  RetryDialog,
  GlobalErrorsAlert,
  useEntityPersistCallbacks,
  ant_to_jmixFront,
  useSubmitFailedCallback
} from "@haulmont/jmix-react-antd";
import { FormattedMessage } from "react-intl";
import { observer } from "mobx-react";
import React, { useMemo, useCallback, useEffect } from "react";
import { generateGqlQueryDataById, generateGqlMutationUpsert } from "../gqlQueryGeneration";
import { useForm } from "antd/es/form/Form";
import { Form, Button, Card } from "antd";
import { EntityNamesInfo, ScreensControl } from "../EntityInspector.types";
import { Fields } from "./fields";
import styles from './EntityDataEditor.less';

interface Props {
  entityNamesInfo: EntityNamesInfo,
  entityAttrs: string [],
  entityId?: string,
  routingPath: string,
  screensControl: ScreensControl,
  onCommit?: (value: this['entityInstance']) => void;
  entityInstance?: EntityInstance<object>;
}

export const EntityDataEditor = observer(({
  entityNamesInfo, 
  entityAttrs, 
  entityId, 
  screensControl, 
  routingPath,
  onCommit,
  entityInstance
}: Props) => {
  const {entityName, className} = entityNamesInfo;
  const {closeActiveScreen} = screensControl;
  const metadata: Metadata = useMetadata();

  const entityAttrsInfo: MetaPropertyInfo[] = useMemo(() => {
    return entityAttrs.map((attr) => {
      return getPropertyInfoNN(attr, entityName, metadata.entities)
    })
  }, [entityAttrs, entityName, metadata])
  
  const loadQuery: DocumentNode = useMemo(() => {
    const query = generateGqlQueryDataById(entityName, metadata, entityAttrs);
    return gql`${query}`;
  }, [entityNamesInfo, entityAttrs]);

  const upsertMutation: DocumentNode = useMemo(() => {
    const query = generateGqlMutationUpsert(entityName, className);
    return gql`${query}`;
  }, [entityNamesInfo, entityAttrs]);

  const [form] = useForm();
  const onSubmitFailed = useSubmitFailedCallback();

  const {
    relationOptions,
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading, error: upsertError, data: upsertData },
    serverValidationErrors,
    intl,
    handleSubmit,
  } = useEntityEditor<Object>({
    loadQuery,
    upsertMutation,
    entityName,
    routingPath,
    entityId,
    onCommit,
    entityInstance,
    persistEntityCallbacks: useEntityPersistCallbacks(),
    uiKit_to_jmixFront: ant_to_jmixFront,
    useEntityEditorForm: createUseAntdForm(form),
    useEntityEditorFormValidation: createUseAntdFormValidation(form)
  });

  useEffect(() => {
    if(upsertData && !upsertError) {
      closeActiveScreen();
    }
  }, [upsertError, upsertData])

  const updateFormField = useCallback((fieldName: string) => {
    const onChange = (value: string) => {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        [fieldName]: value
      });
    }
    return onChange;
  }, [form]);


  const onEntitySelectFactory = useCallback((attrName: string) => {
    const onSelect = (value: string) => {
      updateFormField(attrName)(value);
      closeActiveScreen();
    }
    return onSelect;
  }, [updateFormField, closeActiveScreen]);

  const cancelEditBtnHandler = useCallback(() => {
    closeActiveScreen();
  }, [closeActiveScreen]);

  const onFinish = useCallback((value) => {
    handleSubmit(value);

    if(onCommit) {
      closeActiveScreen();
    }
  }, [handleSubmit, onCommit, closeActiveScreen])

  if (queryLoading) {
    return <Spinner />;
  }

  if (queryError != null) {
    return <RetryDialog onRetry={executeLoadQuery} />;
  }

  return (
    <Card className="narrow-layout">
      <Form
        onFinish={onFinish}
        onFinishFailed={onSubmitFailed}
        layout="vertical"
        form={form}
        validateMessages={createAntdFormValidationMessages(intl)}
      >
        <Fields
          entityAttrsInfo={entityAttrsInfo}
          entityName={entityName}
          routingPath={routingPath}
          screensControl={screensControl}
          onEntitySelectFactory={onEntitySelectFactory}
          relationOptions={relationOptions}
        />

        <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

        <Form.Item className={styles['form-item']}>
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
