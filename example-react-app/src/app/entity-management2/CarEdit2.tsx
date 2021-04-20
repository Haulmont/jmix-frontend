import React from "react";
import { Form, Alert, Button, Card } from "antd";
import { useObserver } from "mobx-react";
import { PATH, NEW_SUBPATH } from "./CarManagement2";
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
import { Car } from "../../jmix/entities/scr$Car";

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
      photo
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

const CarEdit2 = (props: Props) => {
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
    loadQuery: LOAD_SCR_CAR,
    upsertMutation: UPSERT_SCR_CAR,
    entityId,
    queryName: "scr_CarById",
    entityName: Car.NAME,
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

          <Field
            entityName={Car.NAME}
            propertyName="photo"
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

export default CarEdit2;
