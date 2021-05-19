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
import { DatatypesTestEntity3 } from "../../jmix/entities/scr_DatatypesTestEntity3";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_DatatypesTestEntity3";
const ROUTING_PATH = "/datatypes3Management";

const SCR_DATATYPESTESTENTITY3_LIST = gql`
  query scr_DatatypesTestEntity3List(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_DatatypesTestEntity3OrderBy
    $filter: [inp_scr_DatatypesTestEntity3FilterCondition]
    $loadItems: Boolean!
  ) {
    scr_DatatypesTestEntity3Count
    scr_DatatypesTestEntity3List(
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

const DELETE_SCR_DATATYPESTESTENTITY3 = gql`
  mutation Delete_scr_DatatypesTestEntity3($id: String!) {
    delete_scr_DatatypesTestEntity3(id: $id)
  }
`;

const Datatypes3Browse = observer(
  (props: EntityListProps<DatatypesTestEntity3>) => {
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
    } = useEntityList<DatatypesTestEntity3>({
      listQuery: SCR_DATATYPESTESTENTITY3_LIST,
      deleteMutation: DELETE_SCR_DATATYPESTESTENTITY3,
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

export default Datatypes3Browse;
