import * as React from "react";
import { observer } from "mobx-react";
import { observable, makeObservable } from "mobx";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
  DataTable,
  Spinner,
  referencesListByEntityName
} from "@haulmont/jmix-react-ui";

import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";
import { SerializedEntity, getStringId } from "@haulmont/jmix-rest";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdMgtTableManagement";

interface IIntIdentityIdMgtTableBrowseComponentProps {
  screens: Screens;
}

class IntIdentityIdMgtTableBrowseComponent extends React.Component<
  MainStoreInjected &
    WrappedComponentProps &
    IIntIdentityIdMgtTableBrowseComponentProps
> {
  dataCollection = collection<IntIdentityIdTestEntity>(
    IntIdentityIdTestEntity.NAME,
    {
      view: "_local"
    }
  );
  selectedRowKey: string | null = null;

  fields = [
    "description",
    "updateTs",
    "updatedBy",
    "deleteTs",
    "deletedBy",
    "createTs",
    "createdBy",
    "version"
  ];

  showDeletionDialog = (e: SerializedEntity<IntIdentityIdTestEntity>) => {
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
        this.selectedRowKey = null;
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
      redirect(ROUTING_PATH + "/" + this.selectedRowKey);
    }

    this.props.screens.push({
      title: registeredReferral.entityItemEdit.title,
      content: registeredReferral.entityItemEdit.content,
      params: {
        entityId: this.selectedRowKey!
      }
    });
  };

  constructor(props) {
    super(props);

    makeObservable(this, {
      selectedRowKey: observable
    });
  }

  render() {
    if (this.props.mainStore?.isEntityDataLoaded() !== true) return <Spinner />;

    const buttons = [
      <EntityPermAccessControl
        entityName={IntIdentityIdTestEntity.NAME}
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
        entityName={IntIdentityIdTestEntity.NAME}
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
        entityName={IntIdentityIdTestEntity.NAME}
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

  getRecordById(id: string): SerializedEntity<IntIdentityIdTestEntity> {
    const record:
      | SerializedEntity<IntIdentityIdTestEntity>
      | undefined = this.dataCollection.items.find(
      record => getStringId(record.id!) === id
    );

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

const IntIdentityIdMgtTableBrowse = injectIntl(
  injectMainStore(observer(IntIdentityIdMgtTableBrowseComponent))
);

export default observer(() => {
  const screens = React.useContext(ScreensContext);

  return <IntIdentityIdMgtTableBrowse screens={screens} />;
});
