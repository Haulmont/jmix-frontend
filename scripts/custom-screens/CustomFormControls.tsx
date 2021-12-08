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
  RadioButton,
  DropdownField,
  FileUploadField,
  RichTextArea,
  Button as CustomButton,
  NumberField
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
          createdBy: "console.log('hello')",
          vanEntry: "<p><strong>testing </strong>editor</p>",
          datatypesTestEntity: "db9faa31-dfa3-4b97-943c-ba268888cdc3"
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
        <NumberField
          propertyName="doubleAttr"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <EntityPickerField
          entityName="scr_AssociationO2MTestEntity"
          propertyName="datatypesTestEntity"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
          associationOptions={[
            {
              id: "db9faa31-dfa3-4b97-943c-ba268888cdc3",
              _instanceName: "com.company.scr.entity.test.DatatypesTestEntity-db9faa31-dfa3-4b97-943c-ba268888cdc3 [detached]"
            }
          ]}
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
        <DropdownField
          entityName="scr_Garage"
          propertyName="address"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
          options={[
            {
              label: "Address 1",
              value: "address1"
            },
            {
              label: "Address 2",
              value: "address2"
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
        <RichTextArea
          entityName="scr_Garage"
          propertyName="vanEntry"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
        />
        <RadioButton
          entityName="scr_Car"
          propertyName="maxPassengers"
          formItemProps={{
            style: { marginBottom: "12px" }
          }}
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2", disabled: true },
            { label: "Option 3", value: "option3" }
          ]}
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
            <CustomButton type="primary" htmlType="submit">
              <FormattedMessage id="common.submit" />
            </CustomButton>
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
