import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  RetryDialog,
  Spinner,
  useEntityList,
  registerScreen
} from "@haulmont/jmix-react-ui";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesTestCards";

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

export const DatatypesTestCards = observer(() => {
  const {
    executeListQuery,
    listQueryResult: { loading, error, data },
    handlePaginationChange,
    entityListState
  } = useEntityList<DatatypesTestEntity>({
    listQuery: SCR_DATATYPESTESTENTITY_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data?.scr_DatatypesTestEntityList ?? [];
  const pagesTotal = data?.scr_DatatypesTestEntityCount ?? 0;

  return (
    <div className="narrow-layout">
      {dataSource.map(e => (
        <Card
          title={e._instanceName}
          key={e.id ? getStringId(e.id) : undefined}
          style={{ marginBottom: "12px" }}
        >
          {getFields(e).map(p => (
            <EntityProperty
              entityName={DatatypesTestEntity.NAME}
              propertyName={p}
              value={e[p]}
              key={p}
            />
          ))}
        </Card>
      ))}

      <div style={{ margin: "12px 0 12px 0", float: "right" }}>
        <Paging
          paginationConfig={entityListState.pagination ?? {}}
          onPagingChange={handlePaginationChange}
          total={pagesTotal}
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
