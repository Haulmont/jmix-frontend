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
import { CompositionO2MTestEntity } from "../../jmix/entities/scr_CompositionO2MTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_CompositionO2MTestEntity";
const ROUTING_PATH = "/compositionO2MBrowserTable";

const SCR_COMPOSITIONO2MTESTENTITY_LIST = gql`
  query scr_CompositionO2MTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_CompositionO2MTestEntityOrderBy
    $filter: [inp_scr_CompositionO2MTestEntityFilterCondition]
    $loadItems: Boolean!
  ) {
    scr_CompositionO2MTestEntityCount
    scr_CompositionO2MTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) @include(if: $loadItems) {
      id
      _instanceName
      name
      quantity
      datatypesTestEntity {
        id
        _instanceName
      }
    }

    scr_DatatypesTestEntityList {
      id
      _instanceName
    }
  }
`;

const DELETE_SCR_COMPOSITIONO2MTESTENTITY = gql`
  mutation Delete_scr_CompositionO2MTestEntity($id: String!) {
    delete_scr_CompositionO2MTestEntity(id: $id)
  }
`;

const CompositionO2MBrowserTable = observer(
  (props: EntityListProps<CompositionO2MTestEntity>) => {
    const { entityList, onEntityListChange, reverseAttrName } = props;

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
    } = useEntityList<CompositionO2MTestEntity>({
      listQuery: SCR_COMPOSITIONO2MTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_COMPOSITIONO2MTESTENTITY,
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
        columnDefinitions={["name", "quantity", "datatypesTestEntity"].filter(
          columnDef => columnDef !== reverseAttrName
        )}
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

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "compositionO2MBrowserTable",
  <CompositionO2MBrowserTable />,
  ENTITY_NAME,
  "CompositionO2MBrowserTable"
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "compositionO2MBrowserTable",
  <CompositionO2MBrowserTable />
);

export default CompositionO2MBrowserTable;
