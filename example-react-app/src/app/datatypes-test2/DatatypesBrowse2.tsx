import React from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import {
  EntityInstance,
  getFields,
  EntityPermAccessControl,
  toIdString
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  Spinner,
  RetryDialog,
  useEntityList
} from "@haulmont/jmix-react-ui";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { PATH, NEW_SUBPATH } from "./DatatypesManagement2";
import { FormattedMessage } from "react-intl";
import { PaginationConfig } from "antd/es/pagination";
import { gql } from "@apollo/client";

type Props = {
  paginationConfig: PaginationConfig;
  onPagingChange: (current: number, pageSize: number) => void;
};

const SCR_DATATYPESTESTENTITY_LIST = gql`
  query scr_DatatypesTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_DatatypesTestEntityOrderBy
    $filter: [inp_scr_DatatypesTestEntityFilterCondition]
  ) {
    scr_DatatypesTestEntityCount
    scr_DatatypesTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      bigDecimalAttr
      booleanAttr
      dateAttr
      dateTimeAttr
      doubleAttr
      integerAttr
      longAttr
      stringAttr
      timeAttr
      uuidAttr
      localDateTimeAttr
      offsetDateTimeAttr
      localDateAttr
      localTimeAttr
      offsetTimeAttr
      enumAttr
      name
      readOnlyStringAttr
    }
  }
`;

const DELETE_SCR_DATATYPESTESTENTITY = gql`
  mutation Delete_scr_DatatypesTestEntity($id: String!) {
    delete_scr_DatatypesTestEntity(id: $id)
  }
`;

const DatatypesBrowse2 = (props: Props) => {
  const { paginationConfig, onPagingChange } = props;

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    showDeletionDialog
  } = useEntityList<DatatypesTestEntity>({
    listQuery: SCR_DATATYPESTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_DATATYPESTESTENTITY,
    paginationConfig
  });

  return useObserver(() => {
    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={loadItems} />;
    }

    if (loading || data == null || !mainStore.isEntityDataLoaded()) {
      return <Spinner />;
    }

    const dataSource = data.scr_DatatypesTestEntityList;
    const pagesTotal = data.scr_DatatypesTestEntityCount;

    return (
      <div className="narrow-layout">
        <EntityPermAccessControl
          entityName={DatatypesTestEntity.NAME}
          operation="create"
        >
          <div style={{ marginBottom: "12px" }}>
            <Link to={PATH + "/" + NEW_SUBPATH}>
              <Button htmlType="button" type="primary" icon={<PlusOutlined />}>
                <span>
                  <FormattedMessage id="common.create" />
                </span>
              </Button>
            </Link>
          </div>
        </EntityPermAccessControl>

        <List
          itemLayout="horizontal"
          bordered
          dataSource={dataSource}
          renderItem={(item: EntityInstance<DatatypesTestEntity>) => (
            <List.Item
              actions={[
                <EntityPermAccessControl
                  entityName={DatatypesTestEntity.NAME}
                  operation="delete"
                >
                  <DeleteOutlined
                    key="delete"
                    onClick={() => showDeletionDialog(item)}
                  />
                </EntityPermAccessControl>,
                <EntityPermAccessControl
                  entityName={DatatypesTestEntity.NAME}
                  operation="update"
                >
                  <Link to={PATH + "/" + toIdString(item.id)} key="edit">
                    <EditOutlined />
                  </Link>
                </EntityPermAccessControl>
              ]}
            >
              <div style={{ flexGrow: 1 }}>
                {getFields(item).map(p => (
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

        {!paginationConfig.disabled && (
          <div style={{ margin: "12px 0 12px 0", float: "right" }}>
            <Paging
              paginationConfig={paginationConfig}
              onPagingChange={onPagingChange}
              total={pagesTotal}
            />
          </div>
        )}
      </div>
    );
  });
};

export default DatatypesBrowse2;
