import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import {
  DataTable,
  RetryDialog,
  useEntityList,
  EntityListProps,
  registerEntityList
} from "@haulmont/jmix-react-ui";
import { FormWizardTestEntity } from "../../jmix/entities/scr_FormWizardTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_FormWizardTestEntity";
const ROUTING_PATH = "/formWizardBrowserTable";

const SCR_FORMWIZARDTESTENTITY_LIST = gql`
  query scr_FormWizardTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_FormWizardTestEntityOrderBy
    $filter: [inp_scr_FormWizardTestEntityFilterCondition]
  ) {
    scr_FormWizardTestEntityCount(filter: $filter)
    scr_FormWizardTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      notNull
      date
      time
      integer
      associationO2O {
        id
        _instanceName
      }
      compositionO2O {
        id
        _instanceName
        name
      }
    }

    scr_FormWizardAssociationO2OTestEntityList {
      id
      _instanceName
    }

    scr_FormWizardCompositionO2OTestEntityList {
      id
      _instanceName
    }
  }
`;

const FormWizardBrowserTable = observer(
  (props: EntityListProps<FormWizardTestEntity>) => {
    const { entityList, onEntityListChange } = props;

    const {
      items,
      count,
      relationOptions,
      executeListQuery,
      listQueryResult: { loading, error },
      handleSelectionChange,
      handleFilterChange,
      handleSortOrderChange,
      handlePaginationChange,
      handleDeleteBtnClick,
      handleCreateBtnClick,
      handleEditBtnClick,
      goToParentScreen,
      entityListState
    } = useEntityList<FormWizardTestEntity>({
      listQuery: SCR_FORMWIZARDTESTENTITY_LIST,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityList,
      onEntityListChange
    });

    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={executeListQuery} />;
    }

    const buttons = [
      <EntityPermAccessControl
        entityName={ENTITY_NAME}
        operation="create"
        key="create"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateBtnClick}
        >
          <span>
            <FormattedMessage id="common.create" />
          </span>
        </Button>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={ENTITY_NAME}
        operation="update"
        key="update"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={entityListState.selectedEntityId == null}
          type="default"
          onClick={handleEditBtnClick}
        >
          <FormattedMessage id="common.edit" />
        </Button>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={ENTITY_NAME}
        operation="delete"
        key="delete"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={entityListState.selectedEntityId == null}
          onClick={handleDeleteBtnClick}
          key="remove"
          type="default"
        >
          <FormattedMessage id="common.remove" />
        </Button>
      </EntityPermAccessControl>
    ];

    if (entityList != null) {
      buttons.unshift(
        <Tooltip title={<FormattedMessage id="common.back" />}>
          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            icon={<LeftOutlined />}
            onClick={goToParentScreen}
            key="back"
            type="default"
            shape="circle"
          />
        </Tooltip>
      );
    }

    return (
      <DataTable
        items={items}
        count={count}
        relationOptions={relationOptions}
        current={entityListState.pagination?.current}
        pageSize={entityListState.pagination?.pageSize}
        entityName={ENTITY_NAME}
        loading={loading}
        error={error}
        enableFiltersOnColumns={entityList != null ? [] : undefined}
        enableSortingOnColumns={entityList != null ? [] : undefined}
        columnDefinitions={[
          "notNull",
          "date",
          "time",
          "integer",
          "associationO2O",
          "compositionO2O"
        ]}
        onRowSelectionChange={handleSelectionChange}
        onFilterChange={handleFilterChange}
        onSortOrderChange={handleSortOrderChange}
        onPaginationChange={handlePaginationChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
    );
  }
);

registerEntityList({
  component: FormWizardBrowserTable,
  caption: "screen.FormWizardBrowserTable",
  screenId: "FormWizardBrowserTable",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default FormWizardBrowserTable;
