import { observer } from "mobx-react";
import { Card } from "antd";
import { registerScreen } from "@haulmont/jmix-react-web";
import {
  Spinner,
  RetryDialog,
  Calendar,
  useCalendar
} from "@haulmont/jmix-react-antd";
import { gql } from "@apollo/client";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesCalendar";

const EVENT_TITLE_PROPERTY_NAME = "stringAttr";
const EVENT_DESCRIPTION_PROPERTY_NAME = "stringAttr";
const EVENT_START_DAY_PROPERTY_NAME = "dateAttr";
const EVENT_END_DAY_PROPERTY_NAME = "dateTimeAttr";

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

const DatatypesCalendar = observer(() => {
  const {
    events,
    executeListQuery,
    listQueryResult: { loading, error },
    currentMonthDayjs,
    handleCalendarPaginationChange
  } = useCalendar<DatatypesTestEntity>({
    listQuery: SCR_DATATYPESTESTENTITY_LIST,
    routingPath: ROUTING_PATH,
    entityName: ENTITY_NAME,
    eventStartDayPropertyName: EVENT_START_DAY_PROPERTY_NAME,
    eventEndDayPropertyName: EVENT_END_DAY_PROPERTY_NAME,
    eventTitlePropertyName: EVENT_TITLE_PROPERTY_NAME,
    eventDescriptionPropertyName: EVENT_DESCRIPTION_PROPERTY_NAME
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || events == null) {
    return <Spinner />;
  }

  return (
    <Card>
      <Calendar
        events={events}
        value={currentMonthDayjs}
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
