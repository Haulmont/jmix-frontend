import {Button, Result} from "antd";
import React from "react";
import {FormattedMessage} from "react-intl";
import {useHistory} from "react-router-dom";

export const Page404 = () => {
  const history = useHistory();

  return (
    <Result status='404'
            title='404'
            subTitle={<FormattedMessage id={'common.404'}/>}
            extra={
              <Button type='primary'
                      onClick={() => history.goBack()}
              >
                <FormattedMessage id={'common.back'} />
              </Button>
            }
    />
  );
};