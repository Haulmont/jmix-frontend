import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import {
  createAntdFormValidationMessages,
  createUseAntdForm,
  RetryDialog,
  Field,
  MultilineText,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  registerEntityEditorScreen
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { Car } from "../../jmix/entities/scr$Car";

const ENTITY_NAME = "scr$Car";
const UPSERT_INPUT_NAME = "car";
const ROUTING_PATH = "/carEditor";

const LOAD_SCR_CAR = gql`
  query scr_CarById($id: String = "", $loadItem: Boolean!) {
    scr_CarById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
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
      garage {
        id
        _instanceName
      }
      technicalCertificate {
        id
        _instanceName
      }
      photo

      version
      createdBy
      createdDate
      lastModifiedBy
      lastModifiedDate
    }

    scr_GarageList {
      id
      _instanceName
    }

    scr_TechnicalCertificateList {
      id
      _instanceName
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

const CarEditor = observer((props: EntityEditorProps<Car>) => {
  const {
    onCommit,
    entityInstance,
    submitBtnCaption = "common.submit"
  } = props;

  const [form] = useForm();

  const {
    relationOptions,
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    entityEditorState,
    intl,
    handleSubmit,
    handleSubmitFailed,
    handleCancelBtnClick
  } = useEntityEditor<Car>({
    loadQuery: LOAD_SCR_CAR,
    upsertMutation: UPSERT_SCR_CAR,
    entityName: ENTITY_NAME,
    upsertInputName: UPSERT_INPUT_NAME,
    routingPath: ROUTING_PATH,
    onCommit,
    entityInstance,
    useEntityEditorForm: createUseAntdForm(form)
  });

  if (queryLoading) {
    return <Spinner />;
  }

  if (queryError != null) {
    console.error(queryError);
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
        <Field
          entityName={ENTITY_NAME}
          propertyName="manufacturer"
          formItemProps={{
            style: { marginBottom: "12px" },
            rules: [{ required: true }]
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="model"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="regNumber"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="purchaseDate"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="manufactureDate"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="wheelOnRight"
          formItemProps={{
            style: { marginBottom: "12px" },
            valuePropName: "checked"
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="carType"
          formItemProps={{
            style: { marginBottom: "12px" },
            rules: [{ required: true }]
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="ecoRank"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="maxPassengers"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="price"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="mileage"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="garage"
          associationOptions={relationOptions?.get("scr_Garage")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="technicalCertificate"
          associationOptions={relationOptions?.get("scr_TechnicalCertificate")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="photo"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        {entityEditorState.globalErrors.length > 0 && (
          <Alert
            message={
              <MultilineText lines={toJS(entityEditorState.globalErrors)} />
            }
            type="error"
            style={{ marginBottom: "24px" }}
          />
        )}

        <Form.Item style={{ textAlign: "center" }}>
          <Button htmlType="button" onClick={handleCancelBtnClick}>
            <FormattedMessage id="common.cancel" />
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={upsertLoading}
            style={{ marginLeft: "8px" }}
          >
            <FormattedMessage id={submitBtnCaption} />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

registerEntityEditorScreen(ENTITY_NAME, "carEditor", <CarEditor />);

export default CarEditor;
