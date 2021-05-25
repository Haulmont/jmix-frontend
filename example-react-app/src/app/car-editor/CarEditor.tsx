import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import { useMetadata, ScreensContext } from "@haulmont/jmix-react-core";
import {
  createAntdFormValidationMessages,
  RetryDialog,
  Field,
  MultilineText,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  MultiScreenContext,
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
    submitBtnCaption = "common.submit",
    hiddenAttributes
  } = props;
  const multiScreen = useContext(MultiScreenContext);
  const screens = useContext(ScreensContext);
  const metadata = useMetadata();

  const {
    executeLoadQuery,
    loadQueryResult: { loading: queryLoading, error: queryError, data },
    upsertMutationResult: { loading: upsertLoading },
    store,
    form,
    intl,
    handleFinish,
    handleFinishFailed,
    handleCancelBtnClick
  } = useEntityEditor<Car>({
    loadQuery: LOAD_SCR_CAR,
    upsertMutation: UPSERT_SCR_CAR,
    entityId: multiScreen?.params?.entityId,
    entityName: ENTITY_NAME,
    upsertInputName: UPSERT_INPUT_NAME,
    routingPath: ROUTING_PATH,
    hasAssociations: true,
    screens,
    multiScreen,
    onCommit,
    entityInstance
  });

  if (queryLoading || metadata == null) {
    return <Spinner />;
  }

  if (queryError != null) {
    console.error(queryError);
    return <RetryDialog onRetry={executeLoadQuery} />;
  }

  return (
    <Card className="narrow-layout">
      <Form
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        layout="vertical"
        form={form}
        validateMessages={createAntdFormValidationMessages(intl)}
      >
        <Field
          entityName={ENTITY_NAME}
          propertyName="manufacturer"
          hide={hiddenAttributes?.includes("manufacturer")}
          formItemProps={{
            style: { marginBottom: "12px" },
            rules: [{ required: true }]
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="model"
          hide={hiddenAttributes?.includes("model")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="regNumber"
          hide={hiddenAttributes?.includes("regNumber")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="purchaseDate"
          hide={hiddenAttributes?.includes("purchaseDate")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="manufactureDate"
          hide={hiddenAttributes?.includes("manufactureDate")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="wheelOnRight"
          hide={hiddenAttributes?.includes("wheelOnRight")}
          formItemProps={{
            style: { marginBottom: "12px" },
            valuePropName: "checked"
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="carType"
          hide={hiddenAttributes?.includes("carType")}
          formItemProps={{
            style: { marginBottom: "12px" },
            rules: [{ required: true }]
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="ecoRank"
          hide={hiddenAttributes?.includes("ecoRank")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="maxPassengers"
          hide={hiddenAttributes?.includes("maxPassengers")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="price"
          hide={hiddenAttributes?.includes("price")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="mileage"
          hide={hiddenAttributes?.includes("mileage")}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="garage"
          hide={hiddenAttributes?.includes("garage")}
          associationOptions={data?.scr_GarageList}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="technicalCertificate"
          hide={hiddenAttributes?.includes("technicalCertificate")}
          associationOptions={data?.scr_TechnicalCertificateList}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Field
          entityName={ENTITY_NAME}
          propertyName="photo"
          hide={hiddenAttributes?.includes("photo")}
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
