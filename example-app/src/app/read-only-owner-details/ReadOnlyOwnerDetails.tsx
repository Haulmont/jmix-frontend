import { useCallback } from "react";
import { Card, Spin, Result, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  useScreens,
  EntityDetailsScreenProps,
  guessDisplayName,
  guessLabel
} from "@amplicode/react-core";

const OWNER = gql(/* GraphQL */ `
  query Get_Owner($id: Long) {
    owner(id: $id) {
      id
      firstName
      lastName
      city
      address
      email
      telephone
    }
  }
`);

export const ReadOnlyOwnerDetails = ({ id }: EntityDetailsScreenProps) => {
  const screens = useScreens();
  const history = useHistory();

  const { loading: queryLoading, error: queryError, data } = useQuery(OWNER, {
    variables: {
      id
    }
  });

  const goToParentScreen = useCallback(() => {
    history.push("."); // Remove entity id part from url
    screens.closeActiveBreadcrumb();
  }, [screens, history]);

  const item = data?.["owner"];

  if (queryLoading) {
    return <Spin />;
  }

  if (queryError) {
    return (
      <Result
        status="error"
        title={<FormattedMessage id="common.requestFailed" />}
      />
    );
  }

  if (item == null) {
    return <Empty />;
  }

  return (
    <Card className="narrow-layout">
      <Descriptions
        layout="horizontal"
        title={guessDisplayName(item)}
        column={1}
      >
        {Object.keys(item)
          .filter(p => p != id)
          .map((p: string) => {
            const propertyName = p as keyof typeof item;
            return (
              <Descriptions.Item
                label={<strong>{guessLabel(propertyName)}</strong>}
              >
                {typeof item[propertyName] === "object"
                  ? guessDisplayName(item[propertyName])
                  : String(item[propertyName])}
              </Descriptions.Item>
            );
          })}
      </Descriptions>
      <Button htmlType="button" onClick={goToParentScreen}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
};

export default ReadOnlyOwnerDetails;
