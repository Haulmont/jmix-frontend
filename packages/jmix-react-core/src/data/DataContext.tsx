import { action, computed, IObservableArray, observable, makeObservable } from "mobx";
import {getJmixREST} from "../app/JmixAppProvider";

export interface DataContainer {
  entityName: string;
  changedItems: IObservableArray;
  status: DataContainerStatus
}

export type DataContainerStatus = 'CLEAN' | 'LOADING' | 'DONE' | 'ERROR';
export type DataContainerError = 'COMMIT_ERROR' | 'LOAD_ERROR';

export interface Containers {
  [containerId: string]: DataContainer;
}

class DataContext<T extends Containers> {

  containers: T;

  constructor(containers: T) {
    this.containers = containers;

    makeObservable(this, {
      containers: observable,
      save: action,
      hasChanges: computed
    });

  }

  save = () => {
    for (const containerName in this.containers) {
      if (!Object.prototype.hasOwnProperty.call(this.containers, containerName)) {
        continue;
      }
      const container = this.containers[containerName];
      container.changedItems.forEach((entity) => {
        getJmixREST()!.commitEntity(container.entityName, entity);
      })
    }
  };

  get hasChanges(): boolean {
    if (!this.containers || Object.getOwnPropertyNames(this.containers).length < 1) {
      return false;
    }
    for (const containerName in this.containers) {
      if (!Object.prototype.hasOwnProperty.call(this.containers, containerName)) {
        continue;
      }
      if (this.containers[containerName].changedItems != null && this.containers[containerName].changedItems.length > 0) {
        return true;
      }
    }
    return false;
  }
}


export function data<T extends Containers>(containers: T): DataContext<T> {
  return new DataContext<T>(containers);
}
