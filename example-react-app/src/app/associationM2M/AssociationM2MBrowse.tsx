import React, { useContext } from "react";
import { observer } from "mobx-react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  EntityPermAccessControl,
  ScreensContext
} from "@haulmont/jmix-react-core";
import {
  DataTable,
  RetryDialog,
  useEntityList,
  EntityListProps
} from "@haulmont/jmix-react-ui";
import { AssociationM2MTestEntity } from "../../jmix/entities/scr_AssociationM2MTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_AssociationM2MTestEntity";
const ROUTING_PATH = "/associationM2MManagement";

const SCR_ASSOCIATIONM2MTESTENTITY_LIST = gql`
  query scr_AssociationM2MTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_AssociationM2MTestEntityOrderBy
    $filter: [inp_scr_AssociationM2MTestEntityFilterCondition]
    $loadItems: Boolean!
  ) {
    scr_AssociationM2MTestEntityCount
    scr_AssociationM2MTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) @include(if: $loadItems) {
      id
      _instanceName
      name
    }
  }
`;

const DELETE_SCR_ASSOCIATIONM2MTESTENTITY = gql`
  mutation Delete_scr_AssociationM2MTestEntity($id: String!) {
    delete_scr_AssociationM2MTestEntity(id: $id)
  }
`;

const AssociationM2MBrowse = observer(
  (props: EntityListProps<AssociationM2MTestEntity>) => {
    const { entityList, onEntityListChange } = props;
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
      store
    } = useEntityList<AssociationM2MTestEntity>({
      listQuery: SCR_ASSOCIATIONM2MTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_ASSOCIATIONM2MTESTENTITY,
      screens,
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
        columnDefinitions={["name"]}
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

export default AssociationM2MBrowse;
