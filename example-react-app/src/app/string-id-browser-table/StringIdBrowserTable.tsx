import React, { useContext } from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import {
  EntityPermAccessControl,
  ScreensContext
} from "@haulmont/jmix-react-core";
import {
  DataTable,
  RetryDialog,
  useEntityList,
  EntityListProps,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";
import { StringIdTestEntity } from "../../jmix/entities/scr_StringIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdBrowserTable";

const SCR_STRINGIDTESTENTITY_LIST = gql`
  query scr_StringIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_StringIdTestEntityOrderBy
    $filter: [inp_scr_StringIdTestEntityFilterCondition]
    $loadItems: Boolean!
  ) {
    scr_StringIdTestEntityCount
    scr_StringIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) @include(if: $loadItems) {
      identifier
      _instanceName
      description
      productCode

      createTs
      createdBy
      updateTs
      updatedBy
      deleteTs
      deletedBy
      version

      datatypesTestEntity {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
    }

    scr_DatatypesTestEntityList {
      id
      _instanceName
    }

    scr_DatatypesTestEntity3List {
      id
      _instanceName
    }
  }
`;

const DELETE_SCR_STRINGIDTESTENTITY = gql`
  mutation Delete_scr_StringIdTestEntity($id: String!) {
    delete_scr_StringIdTestEntity(id: $id)
  }
`;

const StringIdBrowserTable = observer(
  (props: EntityListProps<StringIdTestEntity>) => {
    const { entityList, onEntityListChange, reverseAttrName } = props;
    const screens = useContext(ScreensContext);

    const {
      items,
      count,
      relationOptions,
      executeListQuery,
      listQueryResult: { loading, error },
      handleRowSelectionChange,
      handleFilterChange,
      handleSortOrderChange,
      handlePaginationChange,
      deleteSelectedRow,
      handleCreateBtnClick,
      handleEditBtnClick,
      goToParentScreen,
      store
    } = useEntityList<StringIdTestEntity>({
      listQuery: SCR_STRINGIDTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_STRINGIDTESTENTITY,
      screens,
      currentScreen: screens.currentScreen,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityList,
      onEntityListChange,
      reverseAttrName
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
          disabled={store.selectedRowKey == null}
          type="default"
          onClick={handleEditBtnClick.bind(null, store.selectedRowKey)}
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
          disabled={store.selectedRowKey == null}
          onClick={deleteSelectedRow.bind(null, items)}
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
        current={store.pagination?.current}
        pageSize={store.pagination?.pageSize}
        entityName={ENTITY_NAME}
        loading={loading}
        error={error}
        enableFiltersOnColumns={entityList != null ? [] : undefined}
        enableSortingOnColumns={entityList != null ? [] : undefined}
        columnDefinitions={[
          "description",
          "productCode",
          "createTs",
          "createdBy",
          "updateTs",
          "updatedBy",
          "deleteTs",
          "deletedBy",
          "datatypesTestEntity",
          "datatypesTestEntity3"
        ].filter(columnDef => columnDef !== reverseAttrName)}
        onRowSelectionChange={handleRowSelectionChange}
        onFilterChange={handleFilterChange}
        onSortOrderChange={handleSortOrderChange}
        onPaginationChange={handlePaginationChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
    );
  }
);

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "stringIdBrowserTable",
  <StringIdBrowserTable />,
  ENTITY_NAME,
  "StringIdBrowserTable"
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "stringIdBrowserTable",
  <StringIdBrowserTable />
);

export default StringIdBrowserTable;
