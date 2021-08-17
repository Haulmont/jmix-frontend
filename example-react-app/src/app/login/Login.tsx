import React, { useState, useCallback } from "react";
import { ChangeEvent } from "react";
import { Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useMainStore, JmixServerError } from "@haulmont/jmix-react-core";
import styles from "./Login.module.css";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { FormattedMessage, useIntl } from "react-intl";
import JmixDarkIcon from "../icons/JmixDarkIcon";
import { loginMapJmixRestErrorToIntlId } from "@haulmont/jmix-react-web";

const Login = observer(() => {
  const intl = useIntl();

  const mainStore = useMainStore();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [performingLoginRequest, setPerformingLoginRequest] = useState(false);

  const changeLogin = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value),
    [setLogin]
  );
  const changePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [setPassword]
  );

  const doLogin = useCallback(() => {
    setPerformingLoginRequest(true);
    mainStore
      .login(login, password)
      .then(
        action(() => {
          setPerformingLoginRequest(false);
        })
      )
      .catch(
        action((error: JmixServerError) => {
          setPerformingLoginRequest(false);

          const loginMessageErrorIntlId = loginMapJmixRestErrorToIntlId(error);
          message.error(intl.formatMessage({ id: loginMessageErrorIntlId }));
        })
      );
  }, [setPerformingLoginRequest, mainStore, intl, login, password]);

  return (
    <div className={styles.loginForm}>
      <JmixDarkIcon className={styles.logo} />

      <div className={styles.title}>scr-jmix</div>

      <Form layout="vertical" onFinish={doLogin}>
        <Form.Item>
          <Input
            id="input_login"
            placeholder={intl.formatMessage({ id: "login.placeholder.login" })}
            onChange={changeLogin}
            value={login}
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Input
            id="input_password"
            placeholder={intl.formatMessage({
              id: "login.placeholder.password"
            })}
            onChange={changePassword}
            value={password}
            type="password"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <div className={styles.languageSwitcherContainer}>
            <LanguageSwitcher />
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block={true}
            loading={performingLoginRequest}
          >
            <FormattedMessage id="login.loginBtn" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default Login;
