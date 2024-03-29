import React from "react";
import { Form, Button, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";
import {
  createUseAntdForm,
  createUseAntdFormValidation,
  RetryDialog,
  Field,
  GlobalErrorsAlert,
  Spinner,
  useMasterDetailEditor,
  useCreateAntdResetForm,
  useEntityPersistCallbacks,
  useSubmitFailedCallback,
  ant_to_jmixFront,
  useChangeConfirm
} from "@haulmont/jmix-react-antd";
import {
  createAntdFormValidationMessages,
  EntityEditorProps
} from "@haulmont/jmix-react-web";
import { gql } from "@apollo/client";
import { Car } from "../../jmix/entities/scr_Car";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/carMasterDetail";

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

const CarMasterDetailEditor = observer((props: EntityEditorProps<Car>) => {
  const {
    onCommit,
    entityInstance,
    submitBtnCaption = "common.submit"
  } = props;
  const [form] = useForm();
  const onSubmitFailed = useSubmitFailedCallback();
  const { setDirty } = useChangeConfirm();

  const fieldComponentProps = {
    onBlur: setDirty
  };

  const {
    relationOptions,
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError },
    upsertMutationResult: { loading: upsertLoading },
    serverValidationErrors,
    intl,
    handleSubmit,
    handleCancelBtnClick
  } = useMasterDetailEditor<Car>({
    loadQuery: LOAD_SCR_CAR,
    upsertMutation: UPSERT_SCR_CAR,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    onCommit,
    entityInstance,
    useEntityEditorForm: createUseAntdForm(form),
    useEntityEditorFormValidation: createUseAntdFormValidation(form),
    resetEntityEditorForm: useCreateAntdResetForm(form),
    persistEntityCallbacks: useEntityPersistCallbacks(),
    uiKit_to_jmixFront: ant_to_jmixFront
  });

  if (queryLoading) {
    return <Spinner />;
  }

  if (queryError != null) {
    console.error(queryError);
    return <RetryDialog onRetry={executeLoadQuery} />;
  }

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={onSubmitFailed}
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
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="model"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="regNumber"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="purchaseDate"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="manufactureDate"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="wheelOnRight"
        formItemProps={{
          style: { marginBottom: "12px" },
          valuePropName: "checked"
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="carType"
        formItemProps={{
          style: { marginBottom: "12px" },
          rules: [{ required: true }]
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="ecoRank"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="maxPassengers"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="price"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="mileage"
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="garage"
        associationOptions={relationOptions?.get("scr_Garage")}
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <Field
        entityName={ENTITY_NAME}
        propertyName="technicalCertificate"
        associationOptions={relationOptions?.get("scr_TechnicalCertificate")}
        formItemProps={{
          style: { marginBottom: "12px" }
        }}
        componentProps={fieldComponentProps}
      />

      <GlobalErrorsAlert serverValidationErrors={serverValidationErrors} />

      <Form.Item style={{ textAlign: "center" }}>
        <Space size={8}>
          <Button htmlType="button" onClick={handleCancelBtnClick}>
            <FormattedMessage id="common.cancel" />
          </Button>
          <Button type="primary" htmlType="submit" loading={upsertLoading}>
            <FormattedMessage id={submitBtnCaption} />
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
});

export default CarMasterDetailEditor;
