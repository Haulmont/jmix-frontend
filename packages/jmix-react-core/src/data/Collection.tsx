import {
  action,
  computed,
  IObservableArray,
  observable,
  reaction,
  runInAction,
  toJS,
  makeObservable,
} from "mobx";
import {
  EntitiesLoadOptions,
  EntitiesWithCount,
  EntityFilter,
  PredefinedView,
  SerializedEntity
} from "@haulmont/jmix-rest";
import {inject, observer} from "mobx-react";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";
import * as React from "react";
import {DataContainer, DataContainerError, DataContainerStatus} from "./DataContext";
import {getJmixREST} from "../app/JmixAppProvider";
import {sortEntityInstances} from '../util/collation';
import {WithId} from '../util/metadata';

/**
 * Retrieves entity instances from some source (such as the Generic REST API)
 * based on given criteria such as filters, sort order, limit and offset.
 * When entities are retrieved from REST API the entity graph is limited using a given view.
 * Stores retrieved entity instances.
 *
 * @typeparam T - entity type.
 */
export interface DataCollectionStore<T> extends DataContainer {
  /**
   * Retrieved entity instances. MobX observable.
   */
  items: Array<SerializedEntity<T>>;
  /**
   * A deep copy of {@link items}.
   */
  readonly readOnlyItems: Array<SerializedEntity<T>>;
  /**
   * Not implemented
   */
  readonly properties: string[];
  /**
   * Name of a view used to limit the entity graph. MobX observable.
   */
  view: string | null;
  /**
   * Sort order. Property name opionally preceeded by `+` or `-` character.
   * If the name is preceeded by `+`, or there is no preceeding character, then the sort order is ascending.
   * If the name is preceeded by `-`, then the sort order is descending.
   * MobX observable.
   */
  sort: string | null;
  /**
   * An object describing the filtering criteria.
   * MobX observable.
   */
  filter: EntityFilter | null;
  /**
   * Maximum number of entities to retrieve.
   * MobX observable.
   */
  limit: number | null;
  /**
   * Position of the first entity to retrieve. Useful if you want to skip first N entities
   * (for example, in a pagination scenario).
   * MobX observable.
   */
  offset: number | null;
  /**
   * Total number of entities available in the source.
   * MobX observable.
   */
  count: number| null;
  /**
   * When the source of entity instances is REST API, the {@link load} method will by default
   * request a total count of entity instances to be sent along with the retrieved instances.
   * This number will be stored as {@link count}.
   * When `skipCount` is `true`, the total count will not be queried for.
   */
  skipCount: boolean | null;
  /**
   * Name of the ID attribute of a String ID entity.
   * Indicates that the entity is a String ID entity.
   * Mandatory for String ID entities, shall be omitted otherwise.
   */
  stringIdName: string | null;
  /**
   * Retrieves the entity instances. Once retrieval is complete, the instances will be
   * available as {@link items}.
   * When the source of entity instances is REST API, this method will by default
   * request a total count of entity instances to be sent along with the retrieved instances.
   * This number will be stored as {@link count}.
   * Use {@link skipCount} to disable this behavior.
   *
   * @returns promise that resolves when retrieval is complete.
   */
  load: () => Promise<void>;
  /**
   * Clears {@link items}.
   */
  clear: () => void;
  /**
   * Deletes an entity instance from the source.
   * @param e - entity instance to be deleted.
   * @returns promise that resolves when deletion is complete.
   */
  delete: (e: T & WithId) => Promise<any>;
}

/**
 * A variant of {@link DataCollectionStore} that works with a client-side source of entities.
 *
 * @typeparam T - entity type.
 */
export interface ClientSideDataCollectionStore<T> extends DataCollectionStore<T> {
  /**
   * The client-side source from where the entities are being retrieved.
   * An array of entity instances with default sort order and no filtering applied.
   */
  allItems: Array<SerializedEntity<T>>;
  /**
   * Sets {@link items} based on {@link allItems} and other conditions.
   * Currently it only performs client-side sorting based on {@link sort} field,
   * client-side filtering is currently not supported.
   */
  adjustItems: () => void;
}

class DataCollectionStoreImpl<T> implements DataCollectionStore<T> {

  items: Array<SerializedEntity<T>> = [];
  status: DataContainerStatus = "CLEAN";
  lastError: DataContainerError | null = null;
  view: string;
  sort: string | null = null;
  filter: EntityFilter | null = null;
  limit: number | null = null;
  offset: number | null = null;
  count: number | null = null;
  skipCount: boolean | null = null;
  stringIdName: string | null = null;

  allItems: Array<SerializedEntity<T>> = []; // Client mode only

  changedItems: IObservableArray<any> = observable([]);

  constructor(public readonly entityName: string,
              public readonly trackChanges = false,
              viewName: string = PredefinedView.INSTANCE_NAME,
              sort: string | null = null) {

    this.view = viewName;
    this.sort = sort;

    makeObservable(this, {
      items: observable,
      status: observable,
      lastError: observable,
      view: observable,
      sort: observable,
      filter: observable,
      limit: observable,
      offset: observable,
      count: observable,
      skipCount: observable,
      stringIdName: observable,
      readOnlyItems: computed,
      properties: computed
    });

    if (this.trackChanges) {
      reaction(
        () => [this.items, this.items.length],
        () => {
          this.changedItems.push(this.items)
        }
      )
    }

    reaction(() => this.status,
      status => this.lastError = status !== "ERROR" ? null : this.lastError)
  }

  load = action((): Promise<void> => {
    this.changedItems.clear();
    this.status = "LOADING";

    let loadingPromise;

    if (this.filter) {
      loadingPromise = this.handleLoadingWithCount(getJmixREST()!.searchEntitiesWithCount<T>(this.entityName, this.filter, this.entitiesLoadOptions));
    } else if (this.skipCount === true) {
      loadingPromise = this.handleLoadingNoCount(getJmixREST()!.loadEntities<T>(this.entityName, this.entitiesLoadOptions));
    } else {
      loadingPromise = this.handleLoadingWithCount(getJmixREST()!.loadEntitiesWithCount<T>(this.entityName, this.entitiesLoadOptions));
    }

    loadingPromise.catch(() => runInAction(() => {
      this.status = 'ERROR';
      this.lastError = 'LOAD_ERROR';
    }));

    return loadingPromise;
  });

  clear = action(() => {
    this.items = [];
    this.changedItems.clear();
    this.status = 'CLEAN';
  });

  delete = action((e: T & WithId): Promise<any> => {
    if (e == null || e.id == null) {
      throw new Error('Unable to delete entity without ID');
    }
    this.status = 'LOADING';
    return getJmixREST()!.deleteEntity(this.entityName, e.id)
      .then(action(() => {
        this.load();
        return true;
      }))
      .catch(action(() => {
        this.status = "ERROR";
        this.lastError = "COMMIT_ERROR";
        return true;
      }));
  });

  get readOnlyItems(): Array<SerializedEntity<T>> {
    return toJS(this.items)
  }

  get properties(): string[] {
    return [];
  }

  private get entitiesLoadOptions() {
    const loadOptions: EntitiesLoadOptions = {
      view: this.view ?? undefined,
    };
    if (this.sort) {
      loadOptions.sort = this.sort;
    }
    if (this.limit !== null && this.limit !== undefined) {
      loadOptions.limit = this.limit;
    }
    if (this.offset !== null && this.offset !== undefined) {
      loadOptions.offset = this.offset;
    }
    return loadOptions;
  }

  private handleLoadingWithCount(promise: Promise<EntitiesWithCount<T>>) {
    return promise
      .then((resp) => {
        runInAction(() => {
          this.items = fromRestModel<T>(resp.result, this.stringIdName ?? undefined);
          this.count = resp.count;
          this.status = 'DONE';
        })
      })
  }

  private handleLoadingNoCount(promise: Promise<Array<SerializedEntity<T>>>) {
    return promise
      .then((resp: Array<SerializedEntity<T>>) => {
        runInAction(() => {
          this.items = fromRestModel<T>(resp, this.stringIdName ?? undefined);
          this.count = null;
          this.status = 'DONE';
        })
      })
  }
}

class ClientSideDataCollectionStoreImpl<T> extends DataCollectionStoreImpl<T> implements ClientSideDataCollectionStore<T> {
  allItems: Array<SerializedEntity<T>> = [];

  constructor(public readonly entityName: string,
              public readonly trackChanges = false,
              viewName: string = PredefinedView.INSTANCE_NAME,
              sort?: string) {
    super(entityName, trackChanges, viewName, sort);
  }

  load = action((): Promise<void> => {
    this.adjustItems();
    return Promise.resolve();
  });

  adjustItems = action(() => {
    // Currently only sorts the items. Client-side filtering can be implemented here:
    // const filteredItems = filterEntityInstances([...this.allItems], this.filter);
    this.items = sortEntityInstances([...this.allItems], this.sort ?? undefined);
  });

  delete = action((e: T & WithId): Promise<any> => {
    this.allItems = this.allItems.filter((item: T & WithId) => (item != null && item.id !== e.id));
    this.adjustItems();
    return Promise.resolve();
  });
}

export interface DataCollectionOptions {
  /**
   * Whether to call the {@link DataCollectionStore.load} method immediately after the
   * {@link DataCollectionStore} is constructed.
   */
  loadImmediately?: boolean,
  /**
   * See {@link DataCollectionStore.view}.
   */
  view?: string,
  /**
   * See {@link DataCollectionStore.sort}.
   */
  sort?: string,
  /**
   * See {@link DataCollectionStore.limit}.
   */
  limit?: number,
  /**
   * See {@link DataCollectionStore.offset}.
   */
  offset?: number,
  /**
   * See {@link DataCollectionStore.filter}.
   */
  filter?: EntityFilter,
  /**
   * See {@link DataCollectionStore.stringIdName}.
   */
  stringIdName?: string,
  /**
   * Whether to track the changed items. When `true`, the changes will be available via
   * {@link DataContainer.changedItems} field.
   */
  trackChanges?: boolean,
}

export interface ClientSideDataCollectionOptions extends DataCollectionOptions {
  /**
   * See {@link ClientSideDataCollectionStore.allItems}.
   */
  allItems?: Array<SerializedEntity<any>>;
}

export const defaultOpts: DataCollectionOptions = {
  loadImmediately: true
};

export function fromRestModel<T>(items: Array<SerializedEntity<T>>, stringIdName?: string): Array<SerializedEntity<T>> {
  if (stringIdName == null || stringIdName === 'id') {
  return items;
} else {
  return items.map(i => {
    const item = i as any;
    if (stringIdName != null) {
      item[stringIdName] = item.id;
    }
    return item;
  });
}
}

function createStore<E>(entityName: string, opts: DataCollectionOptions): DataCollectionStore<E> {
  const dataCollection = new DataCollectionStoreImpl<E>(entityName, !!opts.trackChanges);
  setOptionsAndLoad(dataCollection, opts);
  return dataCollection;
}

function createClientSideStore<E>(entityName: string, opts: ClientSideDataCollectionOptions): ClientSideDataCollectionStore<E> {
  const dataCollection = new ClientSideDataCollectionStoreImpl<E>(entityName, !!opts.trackChanges);
  if (opts.allItems != null) {
    dataCollection.allItems = opts.allItems;
  }
  setOptionsAndLoad(dataCollection, opts);
  return dataCollection;
}

function setOptionsAndLoad<E>(dataCollection: DataCollectionStore<E>, opts: DataCollectionOptions) {
  if (opts.view != null) {
    dataCollection.view = opts.view;
  }
  if (opts.filter != null) {
    dataCollection.filter = opts.filter;
  }
  if (opts.sort != null) {
    dataCollection.sort = opts.sort;
  }
  if (opts.limit != null) {
    dataCollection.limit = opts.limit;
  }
  if (opts.offset != null) {
    dataCollection.offset = opts.offset;
  }
  if (opts.stringIdName != null) {
    dataCollection.stringIdName = opts.stringIdName;
  }
  if (typeof opts.loadImmediately === 'undefined' || opts.loadImmediately) {
    dataCollection.load();
  }
}

export const withDataCollection = (entityName: string, opts: DataCollectionOptions = defaultOpts) => <T extends IReactComponent>(target: T) => {
  return inject(() => {
    const dataCollection = createStore(entityName, opts);
    return {dataCollection}
  })(target);
};

/**
 * A hook that returns a mutable ref object containing a {@link DataCollectionStore}
 * initialized with provided entity name and options. The {@link DataCollectionStore}
 * value will be preserved between renders.
 *
 * @typeparam T - entity type.
 *
 * @param entityName
 * @param opts
 */
export const useCollection = <T extends {}>(
  entityName: string, opts: DataCollectionOptions
): React.MutableRefObject<DataCollectionStore<T>> => {
  return React.useRef(
    collection<T>(entityName, opts)
  );
};

/**
 * Initialization function that instantiates a {@link DataCollectionStore} implementation
 * which uses Generic REST API as the source.
 *
 * @typeparam E - entity type.
 *
 * @param entityName - name of the entity to be retrieved.
 * @param opts - {@link DataCollectionStore} configuration.
 */
export const collection = <E extends {}>(entityName: string, opts: DataCollectionOptions = defaultOpts): DataCollectionStore<E> => {
  return createStore<E>(entityName, opts);
};

/**
 * Initialization function that instantiates a {@link ClientSideDataCollectionStore} implementation
 *
 * @typeparam E - entity type.
 *
 * @param entityName - name of the entity to be retrieved.
 * @param opts - {@link ClientSideDataCollectionStore} configuration.
 */
export const clientSideCollection = <E extends {}>(
  entityName: string, opts: ClientSideDataCollectionOptions = defaultOpts
): ClientSideDataCollectionStore<E> => {
  return createClientSideStore<E>(entityName, opts);
};

export interface DataCollectionInjected<E> {
  dataCollection?: DataCollectionStore<E>
}

export interface DataCollectionProps<E> extends DataCollectionOptions {
  entityName: string
  children?: (store: Partial<DataCollectionStore<E>>) => React.ReactNode;
}

class CollectionComponent<E> extends React.Component<DataCollectionProps<E>> {

  store: DataCollectionStore<E>;

  constructor(props: DataCollectionProps<E>) {
    super(props);

    this.store = createStore(this.props.entityName, this.props);
    this.store.load();

    makeObservable(this, {
      store: observable,
      childrenProps: computed
    });
  }

  render() {
    return !!this.props.children && this.props.children(this.childrenProps);
  }

  get childrenProps() {
    const {items, status, load, clear} = this.store;
    return {...{items, status, load, clear}};
  }
}

export const Collection = observer(CollectionComponent);
