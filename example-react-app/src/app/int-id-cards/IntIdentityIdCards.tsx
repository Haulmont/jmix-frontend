import React, { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react";
import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";
import { Card } from "antd";
import { useCollection } from "@haulmont/jmix-react-core";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig,
  EntityProperty,
  Paging,
  setPagination,
  Spinner
} from "@haulmont/jmix-react-ui";
import { getStringId } from "@haulmont/jmix-rest";
import { useLocation, useHistory } from "react-router";

const FIELDS = [
  "description",
  "updateTs",
  "updatedBy",
  "deleteTs",
  "deletedBy",
  "createTs",
  "createdBy"
];

export const IntIdentityIdCards = observer(() => {
  const location = useLocation();
  const history = useHistory();

  const pagination = useLocalObservable(() => ({
    // to disable paging config pass 'true' as disabled param in function below
    config: createPagingConfig(location.search, false, defaultPagingConfig),
    onChange(current: number, pageSize: number) {
      history.push(addPagingParams("intIdentityIdCards", current, pageSize));
      this.config = { ...this.config, current, pageSize };
    }
  }));

  const { current: dataCollection } = useCollection<IntIdentityIdTestEntity>(
    IntIdentityIdTestEntity.NAME,
    {
      view: "_local",
      loadImmediately: true
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
      {items.map(e => (
        <Card
          title={e._instanceName}
          key={e.id ? getStringId(e.id) : undefined}
          style={{ marginBottom: "12px" }}
        >
          {FIELDS.map(p => (
            <EntityProperty
              entityName={IntIdentityIdTestEntity.NAME}
              propertyName={p}
              value={e[p]}
              key={p}
            />
          ))}
        </Card>
      ))}

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
