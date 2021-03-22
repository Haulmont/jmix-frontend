import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react";
import { Row, Col } from "antd";
import { FavoriteCar } from "jmix/entities/mpg$FavoriteCar";
import { Card } from "antd";
import { useCollection } from "@haulmont/jmix-react-core";
import {
  addPagingParams,
  createPagingConfig,
  defaultGridPagingConfig,
  EntityProperty,
  Paging,
  setPagination,
  Spinner
} from "@haulmont/jmix-react-ui";
import { getStringId } from "@haulmont/jmix-rest";
import { useLocation, useHistory } from "react-router";

const FIELDS = ["notes", "car", "user"];

export const MpgFavoriteCarCardsGrid = observer(() => {
  const location = useLocation();
  const history = useHistory();

  const pagination = useLocalObservable(() => ({
    // to disable paging config pass 'true' as disabled param in function below
    config: createPagingConfig(location.search, false, defaultGridPagingConfig),
    onChange(current: number, pageSize: number) {
      history.push(
        addPagingParams("mpgFavoriteCarCardsGrid", current, pageSize)
      );
      this.config = { ...this.config, current, pageSize };
    }
  }));

  const { current: dataCollection } = useCollection<FavoriteCar>(
    FavoriteCar.NAME,
    {
      view: "favoriteCar-view",
      loadImmediately: false
    }
  );

  const { status, items, count } = dataCollection;

  useEffect(() => setPagination(pagination.config, dataCollection, true), [
    dataCollection,
    pagination.config
  ]);

  if (status === "LOADING") return <Spinner />;

  return (
    <div className="narrow-layout">
      <Row gutter={[12, 12]}>
        {items.map(e => (
          <Col key={e.id ? getStringId(e.id) : undefined} xl={8} sm={24}>
            <Card title={e._instanceName} style={{ height: "100%" }}>
              {FIELDS.map(p => (
                <EntityProperty
                  entityName={FavoriteCar.NAME}
                  propertyName={p}
                  value={e[p]}
                  key={p}
                />
              ))}
            </Card>
          </Col>
        ))}
      </Row>

      {!pagination.config.disabled && (
        <div style={{ margin: "12px 0 12px 0", float: "right" }}>
          <Paging
            paginationConfig={pagination.config}
            onPagingChange={pagination.onChange}
            total={count ?? undefined}
          />
        </div>
      )}
    </div>
  );
});
