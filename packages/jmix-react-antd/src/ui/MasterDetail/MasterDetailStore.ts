import {action, makeObservable, observable} from 'mobx';

export class MasterDetailStore {
    selectedEntityId: string | undefined = undefined;
    isOpenEditor: boolean = false;
    dirty: boolean = false;

    constructor() {
        makeObservable(this, {
            selectedEntityId: observable,
            isOpenEditor: observable,
            dirty: observable,
            setSelectedEntityId: action,
            setIsOpenEditor: action,
            setDirty: action,
        });
    }

    setSelectedEntityId(selectedEntityId: string | undefined) {
        this.selectedEntityId = selectedEntityId;
    }

    setIsOpenEditor(isOpenEditor: boolean) {
        this.isOpenEditor = isOpenEditor;
    }

    setDirty(dirty: boolean) {
      this.dirty = dirty;
    }
}
