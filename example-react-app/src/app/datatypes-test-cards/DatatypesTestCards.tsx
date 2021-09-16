import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  useEntityList,
  registerScreen
} from "@haulmont/jmix-react-web";
import {
  Paging,
  Spinner,
  RetryDialog,
  saveHistory
} from "@haulmont/jmix-react-antd";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesTestCards";

const SCR_DATATYPESTESTENTITY_LIST = gql`
  query scr_DatatypesTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_DatatypesTestEntityOrderBy
    $filter: [inp_scr_DatatypesTestEntityFilterCondition]
  ) {
    scr_DatatypesTestEntityCount(filter: $filter)
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
      charAttr
      timeAttr
      uuidAttr
      localDateTimeAttr
      offsetDateTimeAttr
      localDateAttr
      localTimeAttr
      offsetTimeAttr
      enumAttr
      associationO2Oattr {
        id
        _instanceName
      }
      associationO2Mattr {
        id
        _instanceName
      }
      associationM2Oattr {
        id
        _instanceName
      }
      associationM2Mattr {
        id
        _instanceName
      }
      compositionO2Oattr {
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
      compositionO2Mattr {
        id
        _instanceName
        name
        quantity
        deeplyNestedO2Mattr {
          id
          _instanceName
          name
        }
      }
      intIdentityIdTestEntityAssociationO2OAttr {
        id
        _instanceName
      }
      integerIdTestEntityAssociationM2MAttr {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
      readOnlyStringAttr
      name
    }
  }
`;

const DatatypesTestCards = observer(() => {
  const {
    items,
    count,
    executeListQuery,
    listQueryResult: { loading, error },
    handlePaginationChange,
    entityListState
  } = useEntityList<DatatypesTestEntity>({
    listQuery: SCR_DATATYPESTESTENTITY_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    onPagination: saveHistory
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || items == null) {
    return <Spinner />;
  }

  return (
    <div className={styles.narrowLayout}>
      {items.map(item => (
        <Card
          title={item._instanceName}
          key={item.id ? getStringId(item.id) : undefined}
          style={{ marginBottom: "12px" }}
        >
          {getFields(item).map(fieldName => (
            <EntityProperty
              entityName={DatatypesTestEntity.NAME}
              propertyName={fieldName}
              value={item[fieldName]}
              key={fieldName}
            />
          ))}
        </Card>
      ))}

      <div style={{ margin: "12px 0 12px 0", float: "right" }}>
        <Paging
          paginationConfig={entityListState.pagination ?? {}}
          onPagingChange={handlePaginationChange}
          total={count}
        />
      </div>
    </div>
  );
});

registerScreen({
  component: DatatypesTestCards,
  caption: "screen.DatatypesTestCards",
  screenId: "DatatypesTestCards",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default DatatypesTestCards;
