import React, { useEffect, useCallback, useState } from "react";
import {
  gql,
  useLazyQuery,
  useMutation,
  FetchResult,
  ApolloError,
  ApolloCache
} from "@apollo/client";
import {
  Form,
  Button,
  Card,
  message,
  Alert,
  Spin,
  Result,
  Input,
  InputNumber,
  Checkbox,
  Select
} from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  useMultiScreen,
  useParentScreen,
  registerEntityEditor
} from "@haulmont/jmix-react-ui";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/mvpScreenEditor";

const SCR__CAR_BY_ID = gql`
  query scr_CarById($id: String!) {
    scr_CarById(id: $id) {
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

const UPSERT_SCR__CAR = gql`
  mutation Upsert_scr_Car($car: inp_scr_Car!) {
    upsert_scr_Car(car: $car) {
      id
    }
  }
`;

const MvpScreenEditor = observer(() => {
  const multiScreen = useMultiScreen();
  const [form] = useForm();
  const intl = useIntl();

  const id = multiScreen?.params?.entityId;

  // TODO: id variable name
  const [
    loadItem,
    { loading: queryLoading, error: queryError, data }
  ] = useLazyQuery(SCR__CAR_BY_ID, {
    variables: {
      id
    }
  });

  const goToParentScreen = useParentScreen(ROUTING_PATH);
  const handleCancel = useCallback(() => {
    goToParentScreen();
    window.scrollTo(0, 0);
  }, [goToParentScreen]);

  const [executeUpsertMutation] = useMutation(UPSERT_SCR__CAR);

  const [formError, setFormError] = useState<string | undefined>();

  const handleSubmit = useCallback(
    values => {
      executeUpsertMutation({
        variables: {
          car: formValuesToData(values, id)
        },
        update(cache: ApolloCache<any>, result: FetchResult) {
          const updateResult = result.data?.["upsert_scr_Car"];
          // Reflect the update in Apollo cache
          cache.modify({
            fields: {
              ["scr_CarList"](existingRefs = []) {
                const updatedItemRef = cache.writeFragment({
                  id: `scr_Car:${updateResult.id}`,
                  data: values,
                  fragment: gql(`
                  fragment New_scr_Car on scr_Car {
                    id
                  }
                `)
                });
                return [...existingRefs, updatedItemRef];
              }
            }
          });
        }
      })
        .then(({ errors }: FetchResult) => {
          if (errors == null || errors.length === 0) {
            goToParentScreen();
            window.scrollTo(0, 0);
            message.success("Saved successfully");
            return;
          }
          setFormError(errors.join("\n"));
          console.log(errors);
          message.error(intl.formatMessage({ id: "common.requestFailed" }));
        })
        .catch((e: Error | ApolloError) => {
          setFormError(e.message);
          console.log(e);
          message.error(intl.formatMessage({ id: "common.requestFailed" }));
        });
    },
    [executeUpsertMutation]
  );

  const handleSubmitFailed = useCallback(() => {
    message.error("Validation Error. Please check the data you entered.");
  }, []);

  useEffect(() => {
    if (id != null) {
      loadItem();
    }
  }, [loadItem]);

  const item = data?.["scr_CarById"];

  useEffect(() => {
    if (item != null) {
      form.setFieldsValue(dataToFormValues(item));
    }
  }, [item, form]);

  if (queryLoading) {
    return <Spin />;
  }

  if (queryError) {
    return <Result status="error" title="Query failed" />;
  }

  return (
    <Card className="narrow-layout">
      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
        layout="vertical"
        form={form}
      >
        <Form.Item
          name="carType"
          label="Car Type"
          style={{ marginBottom: "12px" }}
        >
          <Select>
            <Select.Option value="HATCHBACK">HATCHBACK</Select.Option>
            <Select.Option value="SEDAN">SEDAN</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="createdBy"
          label="Created By"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="createdDate"
          label="Created Date"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ecoRank"
          label="Eco Rank"
          style={{ marginBottom: "12px" }}
        >
          <Select>
            <Select.Option value="EURO1">EURO1</Select.Option>
            <Select.Option value="EURO2">EURO2</Select.Option>
            <Select.Option value="EURO3">EURO3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="garage"
          label="Garage"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastModifiedBy"
          label="Last Modified By"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastModifiedDate"
          label="Last Modified Date"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="manufactureDate"
          label="Manufacture Date"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="manufacturer"
          label="Manufacturer"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="maxPassengers"
          label="Max Passengers"
          style={{ marginBottom: "12px" }}
        >
          <InputNumber precision={0} />
        </Form.Item>

        <Form.Item
          name="mileage"
          label="Mileage"
          style={{ marginBottom: "12px" }}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item name="model" label="Model" style={{ marginBottom: "12px" }}>
          <Input />
        </Form.Item>

        <Form.Item name="photo" label="Photo" style={{ marginBottom: "12px" }}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" style={{ marginBottom: "12px" }}>
          <Input />
        </Form.Item>

        <Form.Item
          name="purchaseDate"
          label="Purchase Date"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="regNumber"
          label="Reg Number"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="technicalCertificate"
          label="Technical Certificate"
          style={{ marginBottom: "12px" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="version"
          label="Version"
          style={{ marginBottom: "12px" }}
        >
          <InputNumber precision={0} />
        </Form.Item>

        <Form.Item
          name="wheelOnRight"
          label="Wheel On Right"
          style={{ marginBottom: "12px" }}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>

        {formError && (
          <Alert
            message={formError}
            type="error"
            style={{ marginBottom: "18px" }}
          />
        )}

        <Form.Item style={{ textAlign: "center" }}>
          <Button htmlType="button" onClick={handleCancel}>
            <FormattedMessage id="common.cancel" />
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={false} // TODO
            style={{ marginLeft: "8px" }}
          >
            <FormattedMessage id={"common.submit"} />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

function formValuesToData(values: any, id?: string): any {
  return {
    ...values,
    id
  };
}

function dataToFormValues(data: any): any {
  return data;
}

registerEntityEditor({
  component: MvpScreenEditor,
  caption: "screen.MvpScreenEditor",
  screenId: "MvpScreenEditor",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default MvpScreenEditor;
