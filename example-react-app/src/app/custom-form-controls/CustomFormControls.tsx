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
  RichTextArea
} from "@haulmont/jmix-react-antd";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { RawDraftContentState } from "draft-js";
import {JmixFormFieldProps, JmixFormFieldWrapper} from "@haulmont/jmix-react-antd";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import {observer} from "mobx-react";
import {getMainStore, useMainStore} from "@haulmont/jmix-react-core";
import classNames from "classnames";
import { EditorState, ContentState } from 'draft-js';

const ROUTING_PATH = "/customFormControls";

const CustomFormControls = () => {
  const [result, setResult] = useState<Record<string, unknown> | undefined>();

  const handleSubmit = useCallback((values: Record<string, unknown>) => {
    setResult({
      ...values
    });
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
          model: '<p><strong>one </strong><em>two</em></p>\nthree'
        }}
        validateMessages={createAntdFormValidationMessages(intl)}
      >
        <TextField
          propertyName='stringAttr'
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
          tooltipVisible
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
        <RichTextArea2
          entityName="scr_Car"
          propertyName="model"
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

const RichTextArea2 = observer(
  ({
     entityName,
     propertyName,
     formItemProps,
     ...rest
   }: JmixFormFieldProps & EditorProps) => {
    const mainStore = getMainStore();

    if (!mainStore || !mainStore.locale) {
      return null;
    }

    return (
      <JmixFormFieldWrapper
        entityName={entityName}
        propertyName={propertyName}
        formItemProps={formItemProps}
        renderField={isReadOnly => (
          <RichTextEditor isReadOnly={isReadOnly} {...rest} />
        )}
      />
    );
  }
);

const RichTextEditor = ({isReadOnly, value, onChange, ...rest}: any) => {
  console.log('value', value);

  const mainStore = useMainStore();

  const handleChange = useCallback((state: RawDraftContentState) => {
    onChange(rawStateToString(state));
  }, [onChange]);

  return (
    <Editor
      readOnly={isReadOnly}
      wrapperClassName={classNames(styles.richTextAreaWrapper)}
      editorClassName={classNames(styles.richTextAreaEditor)}
      localization={{
        locale: mainStore.locale
      }}
      defaultEditorState={stringToEditorState(value)}
      onChange={handleChange}
      {...rest}
    />
  );
}

function stringToEditorState(input: string): EditorState {
  const {contentBlocks, entityMap} = htmlToDraft(input);
  return EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap));
}

function rawStateToString(state: RawDraftContentState): string {
  return draftToHtml(state);
}