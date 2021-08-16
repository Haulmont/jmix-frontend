import {action, makeObservable, observable} from 'mobx';

export class MultiSelectionTableStore {
    selectedEntityIds: string[] | undefined = undefined;

    constructor() {
        makeObservable(this, {
            selectedEntityIds: observable,
            setSelectedEntityIds: action,
        });
    }

    setSelectedEntityIds(selectedEntityIds: string[] | undefined) {
        this.selectedEntityIds = selectedEntityIds;
    }
}
