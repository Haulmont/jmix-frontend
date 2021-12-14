import React from "react";
import {EntityProperty, registerScreen, useEntityList} from "@haulmont/jmix-react-web";
import appStyles from "../App.module.css";
import {Card, List, Space} from "antd";
import {EntityInstance, getFields} from "@haulmont/jmix-react-core";
import {Car} from "../../jmix/entities/scr_Car";
import {gql} from "@apollo/client";
import {Paging, EntityFilter} from "@haulmont/jmix-react-antd";
import {observer} from "mobx-react";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/customEntityFilterTest";
const SCR_CAR_LIST = gql`
    query scr_CarList(
        $limit: Int
        $offset: Int
        $orderBy: inp_scr_CarOrderBy
        $filter: [inp_scr_CarFilterCondition]
    ) {
        scr_CarCount(filter: $filter)
        scr_CarList(
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            filter: $filter
        ) {
            id
            _instanceName
            manufacturer
            model
            regNumber
            purchaseDate
            manufactureDate
            wheelOnRight
            carType
            ecoRank
            maxPassengers
            price
            mileage
            garage {
                id
                _instanceName
            }
            technicalCertificate {
                id
                _instanceName
            }
            version
            createdBy
            createdDate
            lastModifiedBy
            lastModifiedDate
        }
    }
`;

const CustomEntityFilterTest = observer(() => {
    const {
        items,
        listQueryResult: {loading},
        entityListState: {pagination},
        handlePaginationChange,
        handleFilterChange,
        count,
    } = useEntityList<Car>({
        listQuery: SCR_CAR_LIST,
        entityName: ENTITY_NAME,
        routingPath: ROUTING_PATH,
    });

    return (
        <div className={appStyles.narrowLayout}>
            <Space direction="vertical" style={{width: "100%"}}>
                <Card title="EntityFilter" size="small">
                    <Space direction="vertical" style={{width: "100%"}} size="middle">
                        <EntityFilter
                            entityName={ENTITY_NAME}
                            onFilterApply={handleFilterChange}
                        />
                        <List
                            itemLayout="horizontal"
                            bordered
                            loading={loading}
                            dataSource={items}
                            renderItem={(item: EntityInstance<Car>) => (
                                <List.Item>
                                    <div style={{flexGrow: 1}}>
                                        {getFields(item).map(p => (
                                            <EntityProperty
                                                entityName={ENTITY_NAME}
                                                propertyName={p}
                                                value={item[p]}
                                                key={p}
                                            />
                                        ))}
                                    </div>
                                </List.Item>
                            )}
                        />
                        <Paging
                            paginationConfig={pagination ?? {}}
                            onPagingChange={handlePaginationChange}
                            total={count}
                        />
                    </Space>
                </Card>
            </Space>
        </div>
    )
});

registerScreen({
    component: CustomEntityFilterTest,
    caption: "screen.CustomEntityFilterTest",
    screenId: "CustomEntityFilterTest",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    }
});

export default CustomEntityFilterTest;