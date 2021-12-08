import React, {useCallback, useState} from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { EntityInstance } from '@haulmont/jmix-react-core';

/**
 * TypeScript types for PivotTableUI props. Based on react-pivottable documentation
 * (https://github.com/plotly/react-pivottable#properties-and-layered-architecture).
 */
export interface PivotTableUIProps {
  children?: React.ReactNode | React.ReactNode[] | null;
  hiddenAttributes?: string[];
  hiddenFromAggregators?: string[];
  hiddenFromDragDrop?: string[];
  menuLimit?: number;
  unusedOrientationCutoff?: number;
}

export interface EntityPivotTableProps<TEntity = Record<string, unknown>> extends PivotTableUIProps {
  entities: EntityInstance<TEntity>[];
  fields: Array<keyof TEntity>;
}

/**
 * Wrapper around PivotTableUI that allows using entity instances array as data.
 *
 * @example
 *     <EntityPivotTable<Car>
 *       entities={data.scr_CarList}
 *       fields={['model', 'ecoRank', 'carType', 'mileage', 'maxPassengers', 'price']}
 *     />
 */
export function EntityPivotTable<TEntity>({children, entities, fields, ...rest}: EntityPivotTableProps<TEntity>) {

  const data = entities.map(instance => {
    const record: Record<string, unknown> = {};
    fields
      .filter(field => field in instance)
      .forEach(field => {
        record[field as string] = (instance)[field];
      })
    return record;
  });

  const [uiState, setUiState] = useState(rest);

  const handleChange = useCallback(
    (state: Partial<PivotTableUIProps>) => setUiState(state),
    [setUiState]
  );

  return (
    <PivotTableUI data={data}
                  onChange={handleChange}
                  {...uiState}
    />
  );
};