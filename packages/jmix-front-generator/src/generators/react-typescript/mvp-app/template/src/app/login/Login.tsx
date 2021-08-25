import React, {ChangeEvent, useCallback, useState} from "react";
import {Button, Form, Input, notification} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import "./Login.css";
import {securityStore} from "../../index";
import {LoginAttemptResult} from "../security/security";

const Login = observer(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [performingLoginRequest, setPerformingLoginRequest] = useState(false);

  const changeLogin = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    [setUsername]
  );
  const changePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [setPassword]
  );

  const doLogin = useCallback(async () => {
    setPerformingLoginRequest(true);
    const loginAttemptResult = await securityStore.login(username, password);
    switch (loginAttemptResult) {
      case LoginAttemptResult.SUCCESS:
        return;
      case LoginAttemptResult.UNAUTHORIZED:
        notification.error({message: 'Login does not exist or incorrect password'});
        return;
      case LoginAttemptResult.UNKNOWN_ERRROR:
        notification.error({message: 'Login failed'});
        return;
    }
  }, [setPerformingLoginRequest, username, password]);

  return (
    <div className="login-form-container">
      <div className="login-form">
        <div className="title">jmix2-petclinic</div>
        <Form layout="vertical" onFinish={doLogin}>
          <Form.Item>
            <Input
              id="input_login"
              placeholder='Login'
              onChange={changeLogin}
              value={username}
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Input
              id="input_password"
              placeholder='Password'
              onChange={changePassword}
              value={password}
              type="password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block={true}
              loading={performingLoginRequest}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Login;
