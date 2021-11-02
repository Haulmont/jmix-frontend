import React, {useCallback, useState} from "react";
import {createAntdFormValidationMessages, registerScreen} from "@haulmont/jmix-react-web";
import {Button, Card, Form, Space} from "antd";
import styles from "../App.module.css";
import {TextField} from "@haulmont/jmix-react-antd";
import {FormattedMessage, useIntl} from "react-intl";
import {useForm} from "antd/es/form/Form";

const ROUTING_PATH = "/customFormControls";

const CustomFormControls = () => {
  const [result, setResult] = useState<Record<string, unknown> | undefined>();

  const handleSubmit = useCallback((values: Record<string, unknown>) => {
    setResult(values);
  }, []);

  const handleClearForm = useCallback(() => {
    setResult(undefined);
  }, [])

  const [form] = useForm();
  const intl = useIntl();

  return (
    <Card className={styles.narrowLayout}>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={() => {}}
        layout="vertical"
        form={form}
        validateMessages={createAntdFormValidationMessages(intl)}
      >

        <TextField
          entityName={'scr_Car'}
          propertyName="manufacturer"
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
              <FormattedMessage id='common.submit' />
            </Button>
          </Space>
        </Form.Item>
      </Form>

      {result && (
        <>
          <div>Result:</div>
          <pre role='log'>{JSON.stringify(result, null, 2)}</pre>
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
