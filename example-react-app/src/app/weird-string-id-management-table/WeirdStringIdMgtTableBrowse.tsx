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
  screens
} from "@haulmont/jmix-react-core";
import {
  DataTable,
  Spinner,
  routerData,
  referencesListByEntityName
} from "@haulmont/jmix-react-ui";

import { WeirdStringIdTestEntity } from "../../jmix/entities/scr_WeirdStringIdTestEntity";
import { SerializedEntity } from "@haulmont/jmix-rest";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdMgtTableManagement";

@injectMainStore
@observer
class WeirdStringIdMgtTableBrowseComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps
> {
  dataCollection = collection<WeirdStringIdTestEntity>(
    WeirdStringIdTestEntity.NAME,
    {
      view: "_local"
    }
  );
  @observable selectedRowKey: string | undefined;

  fields = [
    "description",
    "id",
    "createTs",
    "createdBy",
    "updateTs",
    "updatedBy",
    "deleteTs",
    "deletedBy",
    "version"
  ];

  showDeletionDialog = (e: SerializedEntity<WeirdStringIdTestEntity>) => {
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

    screens.push({
      title: registeredReferral.entityItemNew.title,
      content: registeredReferral.entityItemNew.content
    });
  };

  onEditBtnClick = () => {
    const registeredReferral = referencesListByEntityName[ENTITY_NAME];

    // If we on root screen
    if (screens.currentScreenIndex === 0) {
      routerData.history.replace(ROUTING_PATH + "/" + this.selectedRowKey);
    }

    screens.push({
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
        entityName={WeirdStringIdTestEntity.NAME}
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
        entityName={WeirdStringIdTestEntity.NAME}
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
        entityName={WeirdStringIdTestEntity.NAME}
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

  getRecordById(id: string): SerializedEntity<WeirdStringIdTestEntity> {
    const record:
      | SerializedEntity<WeirdStringIdTestEntity>
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

const WeirdStringIdMgtTableBrowse = injectIntl(
  WeirdStringIdMgtTableBrowseComponent
);

export default WeirdStringIdMgtTableBrowse;
