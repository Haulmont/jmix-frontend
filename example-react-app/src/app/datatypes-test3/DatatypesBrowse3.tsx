import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  EntityPermAccessControl,
  screens,
  ScreensContext,
  Screens
} from "@haulmont/jmix-react-core";
import {
  DataTable,
  Spinner,
  referencesListByEntityName
} from "@haulmont/jmix-react-ui";

import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { SerializedEntity } from "@haulmont/jmix-rest";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesManagement3";

interface IDatatypesBrowse3ComponentProps {
  screens: Screens;
}

@injectMainStore
@observer
class DatatypesBrowse3Component extends React.Component<
  MainStoreInjected & WrappedComponentProps & IDatatypesBrowse3ComponentProps
> {
  dataCollection = collection<DatatypesTestEntity>(DatatypesTestEntity.NAME, {
    view: "datatypesTestEntity-view"
  });
  @observable selectedRowKey: string | undefined;

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
        this.selectedRowKey = undefined;
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

  onEditBtnClick = () => {
    const registeredReferral = referencesListByEntityName[ENTITY_NAME];

    // If we on root screen
    if (this.props.screens.currentScreenIndex === 0) {
      window.history.pushState(
        {},
        "",
        ROUTING_PATH + "/" + this.selectedRowKey
      );
    }

    this.props.screens.push({
      title: registeredReferral.entityItemEdit.title,
      content: registeredReferral.entityItemEdit.content,
      params: {
        entityId: this.selectedRowKey
      }
    });
  };

  render() {
    if (this.props.mainStore?.isEntityDataLoaded() !== true) return <Spinner />;

    const buttons = [
      <EntityPermAccessControl
        entityName={DatatypesTestEntity.NAME}
        operation="create"
        key="create"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          onClick={this.onCrateBtnClick}
          type="primary"
          icon={<PlusOutlined />}
        >
          <span>
            <FormattedMessage id="common.create" />
          </span>
        </Button>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={DatatypesTestEntity.NAME}
        operation="update"
        key="update"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={!this.selectedRowKey}
          onClick={this.onEditBtnClick}
          type="default"
        >
          <FormattedMessage id="common.edit" />
        </Button>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={DatatypesTestEntity.NAME}
        operation="delete"
        key="delete"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={!this.selectedRowKey}
          onClick={this.deleteSelectedRow}
          type="default"
        >
          <FormattedMessage id="common.remove" />
        </Button>
      </EntityPermAccessControl>
    ];

    return (
      <DataTable
        dataCollection={this.dataCollection}
        fields={this.fields}
        onRowSelectionChange={this.handleRowSelectionChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
    );
  }

  getRecordById(id: string): SerializedEntity<DatatypesTestEntity> {
    const record:
      | SerializedEntity<DatatypesTestEntity>
      | undefined = this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };
}

const DatatypesBrowse3 = injectIntl(DatatypesBrowse3Component);

export default observer(() => {
  const screens = React.useContext(ScreensContext);

  return <DatatypesBrowse3 screens={screens} />;
});
