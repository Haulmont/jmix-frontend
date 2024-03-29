import React, { useCallback, useState } from "react";
import {
  createAntdFormValidationMessages,
  registerScreen, openScreen
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
  NumberField, notifications, NotificationType, modals
} from "@haulmont/jmix-react-antd";
import {redirect} from "@haulmont/jmix-react-core";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import "ace-builds/src-noconflict/mode-javascript";
import {gql, useQuery} from "@apollo/client";
import {HasId, MayHaveInstanceName} from "@haulmont/jmix-react-core";
import { Car } from "../../jmix/entities/scr_Car";

const ROUTING_PATH = "/customFormControls";

const SCR_DATATYPESTESTENTITY_LIST = gql`
  query scr_DatatypesTestEntityList {
    scr_DatatypesTestEntityList {
      id
      _instanceName
    }
  }
`;


const CustomFormControls = () => {
  const [result, setResult] = useState<Record<string, unknown> | undefined>();

  const handleSubmit = useCallback((values: Record<string, unknown>) => {
    setResult(values);
  }, []);

  const handleClearForm = useCallback(() => {
    setResult(undefined);
  }, []);

    const {data: carList} = useQuery(gql`
        query LoadList {
            scr_CarList {
                id
                manufacturer
            }
        }
    `);

    const {data: oneCar} = useQuery<{scr_CarById?: Car}>(gql`
        query LoadOne {
            scr_CarById(id: "fc63ccfc-e8e9-5486-5c38-98ae42f729da") {
                id
                manufacturer
            }
        }
    `);

  const [form] = useForm();
  const intl = useIntl();

  const { data } = useQuery<{scr_DatatypesTestEntityList: Array<HasId & MayHaveInstanceName>}>(
    SCR_DATATYPESTESTENTITY_LIST
  );

  const showNotifications= () => notifications.show({duration: 10, title: 'Notification title', description: 'Notification description', key: '1', type: NotificationType.INFO})
  const openNewScreen = () => openScreen('ExampleCustomScreen', '/exampleCustomScreen')
  const openModal = () =>  modals.open({
    title: 'Modal Title',
    onOk: () => {
      //handle ok
    },
    onCancel: () => {
      //handle cancel
    }
  })
  const openLink = () => redirect('/exampleCustomScreen')

  const saveChanges = () => form.submit()

  return (
      <>
        <Card className={styles.narrowLayout} style={{marginBottom: 20}} title={'User Actions'}>
          <Button style={{marginBottom: 10, marginRight: 10}} onClick={showNotifications}>Show notification</Button>
          <Button style={{marginBottom: 10, marginRight: 10}} onClick={openModal}>Open modal</Button>
          <Button style={{marginBottom: 10, marginRight: 10}} onClick={openNewScreen}>Open screen</Button>
          <Button style={{marginBottom: 10, marginRight: 10}} onClick={openLink}>Open link</Button>
          <Button style={{marginBottom: 10}} onClick={saveChanges}>Save entity changes</Button>
            {carList != null ?
                <p className='items-list'>List of items loaded</p> : null}
            {oneCar != null ? <p className='one-item'>One item loaded</p> : null}
        </Card>
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
                associationOptions={data === undefined ? [] : data.scr_DatatypesTestEntityList}
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
      </>
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
