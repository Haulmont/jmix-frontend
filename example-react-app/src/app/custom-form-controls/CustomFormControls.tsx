import React, { useCallback, useState } from "react";
import {
  createAntdFormValidationMessages,
  registerScreen
} from "@haulmont/jmix-react-web";
import { Button, Card, Form, Space } from "antd";
import styles from "../App.module.css";
import {
  EntityForm,
  ColorPickerField,
  CheckboxField,
  TextField,
  DateField,
  TimeField,
  TextArea,
  MaskedField,
  SliderField,
  EntityPickerField,
  SelectField,
  SourceCodeField,
  FileUploadField
} from "@haulmont/jmix-react-antd";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import "ace-builds/src-noconflict/mode-javascript";

const ROUTING_PATH = "/customFormControls";

const CustomFormControls = () => {
  const [result, setResult] = useState<Record<string, unknown> | undefined>();

  const handleSubmit = useCallback((values: Record<string, unknown>) => {
    setResult(values);
  }, []);

  const handleClearForm = useCallback(() => {
    setResult(undefined);
  }, []);

  const [form] = useForm();
  const intl = useIntl();

  return (
    <Card className={styles.narrowLayout}>
      <EntityForm
        entityName="scr_DatatypesTestEntity"
        onFinish={handleSubmit}
        onFinishFailed={() => {}}
        layout="vertical"
        form={form}
        initialValues={{
          manufacturer: "Initial Manufacturer",
          regNumber: "Initial Reg Number",
          mileage: 100000,
          wheelOnRight: true,
          fromDate: dayjs("2020-01-01"),
          fromTime: dayjs("2020-01-01T23:05:13"),
          carType: { carType: "SEDAN" },
          createdBy: "console.log('hello')"
        }}
        validateMessages={createAntdFormValidationMessages(intl)}
      >
        <TextField
          propertyName="stringAttr"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <TextField
          entityName="scr_Car"
          propertyName="manufacturer"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <EntityPickerField
          entityName="scr_Car"
          propertyName="carType"
          transformValue={e => e.carType + " transformed"}
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <EntityPickerField
          entityName="scr_Car"
          propertyName="model"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <DateField
          entityName="scr_CarRent"
          propertyName="fromDate"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <TimeField
          entityName="scr_CarRent"
          propertyName="fromTime"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <CheckboxField
          entityName="scr_Car"
          propertyName="wheelOnRight"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <ColorPickerField
          entityName="scr_Car"
          propertyName="color"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <TextArea
          entityName="scr_Car"
          propertyName="regNumber"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <SliderField
          entityName="scr_Car"
          propertyName="mileage"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
          max={300000}
        />
        <MaskedField
          mask="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          formatChars={{
            x: "[0-9a-fA-F]"
          }}
          entityName="scr_Car"
          propertyName="technicalCertificate"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <SelectField
          entityName="scr_Garage"
          propertyName="name"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
          options={[
            {
              label: "Name 1",
              value: "name1"
            },
            {
              label: "Name 2",
              value: "name2"
            }
          ]}
        />
        <SourceCodeField
          entityName="scr_Car"
          propertyName="createdBy"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
          mode="javascript"
        />
        <FileUploadField
          entityName="scr_Garage"
          propertyName="capacity"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />

        <Form.Item style={{ textAlign: "center" }}>
          <Space size={8}>
            <Button htmlType="button" onClick={handleClearForm}>
              Clear form
            </Button>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="common.submit" />
            </Button>
          </Space>
        </Form.Item>
      </EntityForm>

      {result && (
        <>
          <div>Result:</div>
          <pre role="log">{JSON.stringify(result, null, 2)}</pre>
        </>
      )}
    </Card>
  );
};

registerScreen({
  component: CustomFormControls,
  caption: "screen.CustomFormControls",
  screenId: "CustomFormControls",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default CustomFormControls;
