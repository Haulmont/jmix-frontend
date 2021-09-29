import React from "react";
import { observer } from "mobx-react";
import { Card, List, Tooltip, Badge } from "antd";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { EntityInstance, getDateProperty } from "@haulmont/jmix-react-core";
import { registerScreen } from "@haulmont/jmix-react-web";
import {
  Spinner,
  RetryDialog,
  Calendar,
  CalendarHeader,
  useCalendar
} from "@haulmont/jmix-react-antd";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesCalendar";

const TITLE_PROPERTY_NAME = "stringAttr";
const DESCRIPTION_PROPERTY_NAME = "stringAttr";
const EVENT_START_PROPERTY_NAME = "dateAttr";
const EVENT_END_PROPERTY_NAME = "dateTimeAttr";

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

interface CalendarItemProps {
  item: EntityInstance<DatatypesTestEntity>;
}

const CalendarItem = ({ item }: CalendarItemProps) => (
  <div title="">
    <Tooltip title={item[DESCRIPTION_PROPERTY_NAME]}>
      <Badge status="default" text={item[TITLE_PROPERTY_NAME]} />
    </Tooltip>
  </div>
);

const DatatypesCalendar = observer(() => {
  const {
    items,
    executeListQuery,
    listQueryResult: { loading, error },
    currentMonthDayjs,
    handleCalendarPaginationChange
  } = useCalendar<DatatypesTestEntity>({
    listQuery: SCR_DATATYPESTESTENTITY_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    eventStartPropertyName: EVENT_START_PROPERTY_NAME,
    eventEndPropertyName: EVENT_END_PROPERTY_NAME
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || items == null) {
    return <Spinner />;
  }

  return (
    <Card>
      <Calendar
        headerRender={props => <CalendarHeader {...props} />}
        value={currentMonthDayjs}
        dateCellRender={date => (
          <List size="small">
            {items
              .filter(item => {
                const eventStart = getDateProperty<DatatypesTestEntity>(
                  ENTITY_NAME,
                  item,
                  EVENT_START_PROPERTY_NAME
                );
                const eventEnd = getDateProperty<DatatypesTestEntity>(
                  ENTITY_NAME,
                  item,
                  EVENT_END_PROPERTY_NAME
                );

                return (
                  date.isAfter(eventStart?.startOf("day")) &&
                  date.isBefore(eventEnd?.endOf("day"))
                );
              })
              .map(item => (
                <List.Item key={item.id}>
                  <CalendarItem item={item} />
                </List.Item>
              ))}
          </List>
        )}
        onPanelChange={handleCalendarPaginationChange}
      />
    </Card>
  );
});

registerScreen({
  component: DatatypesCalendar,
  caption: "screen.DatatypesCalendar",
  screenId: "DatatypesCalendar",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default DatatypesCalendar;
