import * as React from "react";
import { observer } from "mobx-react";
import { IReactionDisposer, reaction, action, observable } from "mobx";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Card, message } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  EntityPermAccessControl,
  screens
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  setPagination,
  Spinner,
  routerData,
  referencesListByEntityName,
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

import { Car } from "../../jmix/entities/scr$Car";
import { SerializedEntity } from "@haulmont/jmix-rest";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import { PaginationConfig } from "antd/es/pagination";

type Props = MainStoreInjected & WrappedComponentProps;

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/carManagement";

@injectMainStore
@observer
class CarCardsComponent extends React.Component<Props> {
  dataCollection = collection<Car>(Car.NAME, {
    view: "car-edit",
    loadImmediately: false
  });

  reactionDisposers: IReactionDisposer[] = [];
  fields = [
    "manufacturer",
    "model",
    "regNumber",
    "purchaseDate",
    "manufactureDate",
    "wheelOnRight",
    "carType",
    "ecoRank",
    "maxPassengers",
    "price",
    "mileage",
    "garage",
    "technicalCertificate"
  ];

  @observable paginationConfig: PaginationConfig = { ...defaultPagingConfig };

  componentDidMount(): void {
    this.reactionDisposers.push(
      reaction(
        () => this.dataCollection.status,
        status => {
          const { intl } = this.props;
          if (status === "ERROR") {
            message.error(intl.formatMessage({ id: "common.requestFailed" }));
          }
        }
      )
    );

    // to disable paging config pass 'true' as disabled param in function below
    this.paginationConfig = createPagingConfig(routerData.location.search);

    this.reactionDisposers.push(
      reaction(
        () => this.paginationConfig,
        paginationConfig =>
          setPagination(paginationConfig, this.dataCollection, true)
      )
    );
    setPagination(this.paginationConfig, this.dataCollection, true);
  }

  componentWillUnmount() {
    this.reactionDisposers.forEach(dispose => dispose());
  }

  @action onPagingChange = (current: number, pageSize: number) => {
    // If we on root screen
    if (screens.currentScreenIndex === 0) {
      routerData.history.push(
        addPagingParams("carManagement", current, pageSize)
      );
      this.paginationConfig = { ...this.paginationConfig, current, pageSize };
    }
  };

  showDeletionDialog = (e: SerializedEntity<Car>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        { id: "management.browser.delete.areYouSure" },
        { instanceName: e._instanceName }
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({ id: "common.cancel" }),
      onOk: () => {
        return this.dataCollection.delete(e);
      }
    });
  };

  onCrateBtnClick = () => {
    const registeredReferral = referencesListByEntityName[ENTITY_NAME];

    screens.push({
      title: registeredReferral.entityItemNew.title,
      content: registeredReferral.entityItemNew.content
    });
  };

  onEditBtnClick = (itemId: string) => {
    const registeredReferral = referencesListByEntityName[ENTITY_NAME];

    // If we on root screen
    if (screens.currentScreenIndex === 0) {
      routerData.history.replace(ROUTING_PATH + "/" + itemId);
    }

    screens.push({
      title: registeredReferral.entityItemEdit.title,
      content: registeredReferral.entityItemEdit.content,
      params: {
        entityId: itemId
      }
    });
  };

  render() {
    const { status, items, count } = this.dataCollection;
    const { mainStore } = this.props;

    if (status === "LOADING" || mainStore?.isEntityDataLoaded() !== true) {
      return <Spinner />;
    }

    return (
      <div className="narrow-layout">
        <EntityPermAccessControl entityName={Car.NAME} operation="create">
          <div style={{ marginBottom: "12px" }}>
            <Button
              htmlType="button"
              type="primary"
              onClick={this.onCrateBtnClick}
              icon={<PlusOutlined />}
            >
              <span>
                <FormattedMessage id="common.create" />
              </span>
            </Button>
          </div>
        </EntityPermAccessControl>

        {items == null || items.length === 0 ? (
          <p>
            <FormattedMessage id="management.browser.noItems" />
          </p>
        ) : null}
        {items.map(e => (
          <Card
            title={e._instanceName}
            key={e.id ? e.id : undefined}
            style={{ marginBottom: "12px" }}
            actions={[
              <DeleteOutlined
                key="delete"
                onClick={() => this.showDeletionDialog(e)}
              />,
              <EditOutlined onClick={() => this.onEditBtnClick(e.id!)} />
            ]}
          >
            {this.fields.map(p => (
              <EntityProperty
                entityName={Car.NAME}
                propertyName={p}
                value={e[p]}
                key={p}
              />
            ))}
          </Card>
        ))}

        <div style={{ margin: "12px 0 12px 0", float: "right" }}>
          <Paging
            paginationConfig={this.paginationConfig}
            onPagingChange={this.onPagingChange}
            total={count}
          />
        </div>
      </div>
    );
  }
}

const CarCards = injectIntl(CarCardsComponent);

export default CarCards;
