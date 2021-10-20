import { observer } from "mobx-react";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { CheckOutlined, CloseOutlined, EnterOutlined } from "@ant-design/icons";
import { Button, Card, Spin, Empty, Result } from "antd";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { useCallback, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  EntityListScreenProps,
  guessDisplayName,
  guessLabel,
  OpenInBreadcrumbParams,
  Screens,
  useDefaultBrowserHotkeys,
  useScreens
} from "@amplicode/react-core";
import { ReadOnlyOwnerDetails } from "../read-only-owner-details/ReadOnlyOwnerDetails";

const ROUTE = "read-only-owner-list-with-details";

const OWNER_LIST = gql(/* GraphQL */ `
  query Get_Owner_List {
    ownerList {
      id
      firstName
      lastName
      city
    }
  }
`);

export const ReadOnlyOwnerListWithDetails = observer(
  ({ onSelect }: EntityListScreenProps) => {
    const screens: Screens = useScreens();
    const intl = useIntl();
    const match = useRouteMatch<{ entityId: string }>(`/${ROUTE}/:entityId`);
    const history = useHistory();

    const { loading, error, data } = useQuery(OWNER_LIST);

    // Entity list can work in select mode, which means that you can select an entity instance and it will be passed to onSelect callback.
    // This functionality is used in EntityLookupField.
    const isSelectMode = onSelect != null;

    const openEditor = useCallback(
      (id?: string) => {
        const params: OpenInBreadcrumbParams = {
          breadcrumbCaption: intl.formatMessage({
            id: "screen.ReadOnlyOwnerDetails"
          }), // TODO specify message id
          component: ReadOnlyOwnerDetails // TODO specify component name
        };
        if (id != null) {
          params.props = { id };
        }
        screens.openInBreadcrumb(params);
        // Append /id to existing url
        history.push(id ? `/${ROUTE}/${id}` : `/${ROUTE}/new`);
      },
      [screens, history, intl]
    );

    useEffect(() => {
      if (
        screens.activeTab?.breadcrumbs.length === 1 &&
        match?.params.entityId != null
      ) {
        openEditor(match.params.entityId);
      }
    }, [match, openEditor, screens]);

    useDefaultBrowserHotkeys();

    if (loading) {
      return <Spin />;
    }

    if (error) {
      return (
        <Result
          status="error"
          title={<FormattedMessage id="common.requestFailed" />}
        />
      );
    }

    const items = data?.ownerList;

    return (
      <div className="narrow-layout">
        {isSelectMode && (
          <div style={{ marginBottom: "12px" }}>
            <Button
              htmlType="button"
              key="close"
              title='intl.formatMessage({id: "common.close"})'
              type="primary"
              icon={<CloseOutlined />}
              onClick={screens.closeActiveBreadcrumb}
            >
              <span>
                <FormattedMessage id="common.close" />
              </span>
            </Button>
          </div>
        )}

        {items == null || items.length === 0 ? (
          <Empty />
        ) : (
          items.map((e: any) => (
            <Card
              key={e["id"]}
              title={guessDisplayName(e)}
              style={{ marginBottom: "12px" }}
              actions={getCardActions({
                screens,
                entityInstance: e,
                onSelect,
                intl,
                openEditor
              })}
            >
              <Fields entity={e} />
            </Card>
          ))
        )}
      </div>
    );
  }
);

const Fields = ({ entity }: { entity: any }) => (
  <>
    {Object.keys(entity)
      .filter(p => p !== "id" && entity[p] != null)
      .map(p => (
        <div key={p}>
          <strong>{guessLabel(p)}:</strong> {renderFieldValue(entity, p)}
        </div>
      ))}
  </>
);

function renderFieldValue(entity: any, property: string): string {
  return typeof entity[property] === "object"
    ? guessDisplayName(entity[property])
    : String(entity[property]);
}

interface CardActionsInput {
  screens: Screens;
  entityInstance: any;
  onSelect?: (entityInstance: this["entityInstance"]) => void;
  intl: IntlShape;
  openEditor: (id?: string) => void;
}

function getCardActions(input: CardActionsInput) {
  const { screens, entityInstance, onSelect, intl, openEditor } = input;

  if (onSelect == null) {
    return [
      <EnterOutlined
        key="details"
        title={intl.formatMessage({ id: "common.viewDetails" })}
        onClick={() => {
          openEditor(entityInstance.id);
        }}
      />
    ];
  }

  if (onSelect != null) {
    return [
      <CheckOutlined
        key="select"
        title={intl.formatMessage({
          id: "EntityLookupField.selectEntityInstance"
        })}
        onClick={() => {
          if (onSelect != null) {
            onSelect(entityInstance);
            screens.closeActiveBreadcrumb();
          }
        }}
      />
    ];
  }
}
