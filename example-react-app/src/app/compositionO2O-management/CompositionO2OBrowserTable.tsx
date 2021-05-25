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
import { CompositionO2OTestEntity } from "../../jmix/entities/scr_CompositionO2OTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_CompositionO2OTestEntity";
const ROUTING_PATH = "/compositionO2OBrowserTable";

const SCR_COMPOSITIONO2OTESTENTITY_LIST = gql`
  query scr_CompositionO2OTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_CompositionO2OTestEntityOrderBy
    $filter: [inp_scr_CompositionO2OTestEntityFilterCondition]
    $loadItems: Boolean!
  ) {
    scr_CompositionO2OTestEntityCount
    scr_CompositionO2OTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) @include(if: $loadItems) {
      id
      _instanceName
      name
      quantity
      nestedComposition {
        id
        _instanceName
        name
      }
    }

    scr_DeeplyNestedTestEntityList {
      id
      _instanceName
    }
  }
`;

const DELETE_SCR_COMPOSITIONO2OTESTENTITY = gql`
  mutation Delete_scr_CompositionO2OTestEntity($id: String!) {
    delete_scr_CompositionO2OTestEntity(id: $id)
  }
`;

const CompositionO2OBrowserTable = observer(
  (props: EntityListProps<CompositionO2OTestEntity>) => {
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
    } = useEntityList<CompositionO2OTestEntity>({
      listQuery: SCR_COMPOSITIONO2OTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_COMPOSITIONO2OTESTENTITY,
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
        columnDefinitions={["name", "quantity", "nestedComposition"].filter(
          columnDef => columnDef !== reverseAttrName
        )}
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
  "compositionO2OBrowserTable",
  <CompositionO2OBrowserTable />,
  ENTITY_NAME,
  "CompositionO2OBrowserTable"
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "compositionO2OBrowserTable",
  <CompositionO2OBrowserTable />
);

export default CompositionO2OBrowserTable;
