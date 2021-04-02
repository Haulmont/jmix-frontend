import React from "react";
import { Form, Alert, Button, Card } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import { useObserver } from "mobx-react";
import { PATH, NEW_SUBPATH } from "./GraphQLManagement";
import { Link, Redirect } from "react-router-dom";
import { toJS} from "mobx";
import { FormattedMessage, useIntl } from "react-intl";
import {
  createAntdFormValidationMessages,
  RetryDialog
} from "@haulmont/jmix-react-ui";
import {useMainStore} from "@haulmont/jmix-react-core";
import {
  Field,
  MultilineText,
  Spinner,
} from "@haulmont/jmix-react-ui";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import "../../app/App.css";
import { Car } from "../../jmix/entities/scr$Car";
import {EntityEditorStore, useEntityEditorStore, useEntityInstance, useFormSubmitCallbacks} from "./lib/jmix-react-ui";

type Props = {
  entityId: string;
};

function isNewEntity(entityId: string) {
  return entityId === NEW_SUBPATH;
}

const LOAD_SCR_CAR = gql`
  query scr_CarById($id: String!) {
    scr_CarById(id: $id) {
      _instanceName
      id
      manufacturer
      model
      regNumber
      purchaseDate
      manufactureDate
      wheelOnRight
      carType
      ecoRank
      maxPassengers
      price
      mileage
    }
  }
`;

const UPSERT_SCR_CAR = gql`
  mutation Upsert_scr_Car($car: inp_scr_Car!) {
    upsert_scr_Car(car: $car) {
      id
    }
  }
`;

const GraphQLEdit = (props: Props) => {
  const { entityId } = props;

  const intl = useIntl();
  const mainStore = useMainStore();
  const [form] = useForm();

  const [loadItem, { loading: queryLoading, error: queryError, data }] = useLazyQuery(LOAD_SCR_CAR);
  const [upsertItem, { loading: upsertLoading }] = useMutation(UPSERT_SCR_CAR);

  const store: EntityEditorStore = useEntityEditorStore();

  /* TODO It won't react to change of mainStore.metadata (or anything) unless it also causes a re-render.
   * TODO Probably it's better to leave it as it is since we will get rid of metadata anyway.
   */
  useEntityInstance({
    entityId,
    loadItem,
    isNewEntity: isNewEntity(entityId),
    formRef: store.formRef,
    queryLoading,
    queryError,
    data,
    metadata: mainStore.metadata,
    queryName: 'scr_CarById',
    entityName: Car.NAME
  });

  const [handleFinish, handleFinishFailed] = useFormSubmitCallbacks({
    intl,
    form,
    mainStore,
    upsertItem,
    entityId,
    isNewEntity: isNewEntity(entityId),
    store
  });

  return useObserver(() => {
    if (store.updated) {
      return <Redirect to={PATH} />;
    }

    if (queryLoading || mainStore.metadata == null) {
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
            entityName={Car.NAME}
            propertyName="manufacturer"
            formItemProps={{
              style: { marginBottom: "12px" },
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="model"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="regNumber"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="purchaseDate"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="manufactureDate"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="wheelOnRight"
            formItemProps={{
              style: { marginBottom: "12px" },
              valuePropName: "checked"
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="carType"
            formItemProps={{
              style: { marginBottom: "12px" },
              rules: [{ required: true }]
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="ecoRank"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="maxPassengers"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="price"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="mileage"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="garage"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={Car.NAME}
            propertyName="technicalCertificate"
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

export default GraphQLEdit;
