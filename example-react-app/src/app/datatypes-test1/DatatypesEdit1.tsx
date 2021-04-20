import React from "react";
import { Form, Alert, Button, Card } from "antd";
import { useObserver } from "mobx-react";
import { PATH, NEW_SUBPATH } from "./DatatypesManagement1";
import { Link, Redirect } from "react-router-dom";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import {
  createAntdFormValidationMessages,
  RetryDialog,
  Field,
  MultilineText,
  Spinner,
  useEntityEditor
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";

type Props = {
  entityId: string;
};

function isNewEntity(entityId: string) {
  return entityId === NEW_SUBPATH;
}

const LOAD_SCR_DATATYPESTESTENTITY = gql`
  query scr_DatatypesTestEntityById($id: String!) {
    scr_DatatypesTestEntityById(id: $id) {
      _instanceName
      id
      bigDecimalAttr
      booleanAttr
      dateAttr
      dateTimeAttr
      doubleAttr
      integerAttr
      longAttr
      stringAttr
      timeAttr
      uuidAttr
      localDateTimeAttr
      offsetDateTimeAttr
      localDateAttr
      localTimeAttr
      offsetTimeAttr
      enumAttr
      name
      readOnlyStringAttr
    }
  }
`;

const UPSERT_SCR_DATATYPESTESTENTITY = gql`
  mutation Upsert_scr_DatatypesTestEntity(
    $datatypesTestEntity: inp_scr_DatatypesTestEntity!
  ) {
    upsert_scr_DatatypesTestEntity(datatypesTestEntity: $datatypesTestEntity) {
      id
    }
  }
`;

const DatatypesEdit1 = (props: Props) => {
  const { entityId } = props;

  const {
    loadItem,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    metadata
  } = useEntityEditor({
    loadQuery: LOAD_SCR_DATATYPESTESTENTITY,
    upsertMutation: UPSERT_SCR_DATATYPESTESTENTITY,
    entityId,
    queryName: "scr_DatatypesTestEntityById",
    entityName: DatatypesTestEntity.NAME,
    isNewEntity: isNewEntity(entityId)
  });

  return useObserver(() => {
    if (store.updated) {
      return <Redirect to={PATH} />;
    }

    if (queryLoading || metadata == null) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={loadItem} />;
    }

    return (
      <Card className="narrow-layout">
        <Form
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          layout="vertical"
          ref={store.formRef}
          form={form}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="bigDecimalAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="booleanAttr"
            formItemProps={{
              style: { marginBottom: "12px" },
              valuePropName: "checked"
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="dateAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="dateTimeAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="doubleAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="integerAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="longAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="stringAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="timeAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="uuidAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="localDateTimeAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="offsetDateTimeAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="localDateAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="localTimeAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="offsetTimeAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="enumAttr"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="name"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={DatatypesTestEntity.NAME}
            propertyName="readOnlyStringAttr"
            disabled={true}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          {store.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(store.globalErrors)} />}
              type="error"
              style={{ marginBottom: "24px" }}
            />
          )}

          <Form.Item style={{ textAlign: "center" }}>
            <Link to={PATH}>
              <Button htmlType="button">
                <FormattedMessage id="common.cancel" />
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              loading={upsertLoading}
              style={{ marginLeft: "8px" }}
            >
              <FormattedMessage id="common.submit" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  });
};

export default DatatypesEdit1;
