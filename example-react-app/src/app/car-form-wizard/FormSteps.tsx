export default {}
/*import {
  Field,
  FormStepsManager,
  FormStepsStore,
  FormStepConfig,
  Spinner,
  RetryDialog,
  useEntityEditor,
  MultiScreenContext
} from "@haulmont/jmix-react-ui";
import { ScreensContext } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import gql from "graphql-tag";

const ENTITY_NAME = "scr$Car";
const UPSERT_INPUT_NAME = "car";
const ROUTING_PATH = "/formSteps";

interface FormStepProps {
  data?: Record<string, any>;
}

const formStepsConfig: FormStepConfig<FormStepProps>[] = [
  {
    name: "Step0",
    fieldNames: [
      "id",
      "_instanceName",
      "manufacturer",
      "model",
      "regNumber",
      "purchaseDate"
    ],
    component: () => (
      <>
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
      </>
    )
  },

  {
    name: "Step1",
    fieldNames: [
      "manufactureDate",
      "wheelOnRight",
      "carType",
      "ecoRank",
      "maxPassengers"
    ],
    component: () => (
      <>
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
      </>
    )
  },

  {
    name: "Step2",
    fieldNames: [
      "price",
      "mileage",
      "garage",
      "technicalCertificate",
      "photo",
      "version",
      "createdBy",
      "createdDate",
      "lastModifiedBy",
      "lastModifiedDate"
    ],
    component: ({ data }) => (
      <>
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
          associationOptions={data?.scr_GarageList}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="technicalCertificate"
          associationOptions={data?.scr_TechnicalCertificateList}
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
      </>
    )
  }
];

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

const FormSteps = observer(() => {
  const multiScreen = useContext(MultiScreenContext);
  const screens = useContext(ScreensContext);
  const [formStepsStore] = useState(() => new FormStepsStore(formStepsConfig));

  // const {
  //   load,
  //   loadQueryResult: { loading: queryLoading, error: queryError, data },
  //   handleFinish,
  //   handleFinishFailed,
  //   handleCancelBtnClick
  // } = useEntityEditor({
  //   loadQuery: LOAD_SCR_CAR,
  //   onLoadEntity: values => formStepsStore.setStepValuesFromValues(values),
  //   upsertMutation: UPSERT_SCR_CAR,
  //   entityId: multiScreen?.params?.entityId,
  //   upsertInputName: UPSERT_INPUT_NAME,
  //   entityName: ENTITY_NAME,
  //   routingPath: ROUTING_PATH,
  //   hasAssociations: true,
  //   screens,
  //   multiScreen
  // });

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
  } = useEntityEditor<any>({
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
    return <RetryDialog onRetry={load} />;
  }

  const CURRENT_STEP_COMPONENT = formStepsStore.currentStep.COMPONENT;

  return (
    <div className="narrow-layout">
      <FormStepsManager
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        formStepsStore={formStepsStore}
        onCancel={handleCancelBtnClick}
      >
        <CURRENT_STEP_COMPONENT data={data} />
      </FormStepsManager>
    </div>
  );
});

export default FormSteps;
*/