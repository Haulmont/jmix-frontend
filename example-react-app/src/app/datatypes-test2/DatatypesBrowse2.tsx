import * as React from "react";
import { observer } from "mobx-react";
import { IReactionDisposer, reaction, observable, action } from "mobx";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Button, List, message } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  EntityPermAccessControl,
  ScreensContext,
  Screens,
  redirect
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  setPagination,
  Spinner,
  referencesListByEntityName,
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { SerializedEntity } from "@haulmont/jmix-rest";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import { PaginationConfig } from "antd/es/pagination";

interface IDatatypesBrowse2ComponentProps {
  screens: Screens;
}

type Props = MainStoreInjected &
  WrappedComponentProps &
  IDatatypesBrowse2ComponentProps;

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesManagement2";

class DatatypesBrowse2Component extends React.Component<Props> {
  dataCollection = collection<DatatypesTestEntity>(DatatypesTestEntity.NAME, {
    view: "datatypesTestEntity-view",
    loadImmediately: true
  });

  reactionDisposers: IReactionDisposer[] = [];
  fields = [
    "bigDecimalAttr",
    "booleanAttr",
    "dateAttr",
    "dateTimeAttr",
    "doubleAttr",
    "integerAttr",
    "longAttr",
    "stringAttr",
    "timeAttr",
    "uuidAttr",
    "localDateTimeAttr",
    "offsetDateTimeAttr",
    "localDateAttr",
    "localTimeAttr",
    "offsetTimeAttr",
    "enumAttr",
    "name",
    "readOnlyStringAttr",
    "associationO2Oattr",
    "associationM2Oattr",
    "compositionO2Oattr",
    "intIdentityIdTestEntityAssociationO2OAttr",
    "stringIdTestEntityAssociationO2O",
    "stringIdTestEntityAssociationM2O"
  ];

  //@observable paginationConfig: PaginationConfig = { ...defaultPagingConfig };

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
    //this.paginationConfig = createPagingConfig(window.location.search);
    /*
    this.reactionDisposers.push(
      reaction(
        () => this.paginationConfig,
        paginationConfig =>
          setPagination(paginationConfig, this.dataCollection, true)
      )
    );
    setPagination(this.paginationConfig, this.dataCollection, true);
    */
  }

  componentWillUnmount() {
    this.reactionDisposers.forEach(dispose => dispose());
  }

  onPagingChange = (current: number, pageSize: number) => {
    // If we on root screen
    /*
    if (this.props.screens.currentScreenIndex === 0) {
      routerData.history.push(
        addPagingParams("datatypesManagement2", current, pageSize)
      );
      this.paginationConfig = {...this.paginationConfig, current, pageSize};
    }*/
  };

  showDeletionDialog = (e: SerializedEntity<DatatypesTestEntity>) => {
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

    this.props.screens.push({
      title: registeredReferral.entityItemNew.title,
      content: registeredReferral.entityItemNew.content
    });
  };

  onEditBtnClick = (itemId: string) => {
    const registeredReferral = referencesListByEntityName[ENTITY_NAME];

    // If we on root screen
    if (this.props.screens.currentScreenIndex === 0) {
      redirect(ROUTING_PATH + "/" + itemId);
    }

    this.props.screens.push({
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
        <EntityPermAccessControl
          entityName={DatatypesTestEntity.NAME}
          operation="create"
        >
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

        <List
          itemLayout="horizontal"
          bordered
          dataSource={items}
          renderItem={item => (
            <List.Item
              actions={[
                <DeleteOutlined
                  key="delete"
                  onClick={() => this.showDeletionDialog(item)}
                />,
                <EditOutlined onClick={() => this.onEditBtnClick(item.id!)} />
              ]}
            >
              <div style={{ flexGrow: 1 }}>
                {this.fields.map(p => (
                  <EntityProperty
                    entityName={DatatypesTestEntity.NAME}
                    propertyName={p}
                    value={item[p]}
                    key={p}
                  />
                ))}
              </div>
            </List.Item>
          )}
        />
        {/*
        <div style={{margin: "12px 0 12px 0", float: "right"}}>
          <Paging
            paginationConfig={this.paginationConfig}
            onPagingChange={this.onPagingChange}
            total={count}
          />
        </div>
        */}
      </div>
    );
  }
}

const DatatypesBrowse2 = injectIntl(
  injectMainStore(observer(DatatypesBrowse2Component))
);

export default observer(() => {
  const screens = React.useContext(ScreensContext);

  return <DatatypesBrowse2 screens={screens} />;
});
