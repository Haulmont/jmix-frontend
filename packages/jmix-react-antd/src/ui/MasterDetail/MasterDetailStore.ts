import {action, makeObservable, observable} from 'mobx';

export class MasterDetailStore {
    selectedEntityId: string | undefined = undefined;
    isOpenEditor: boolean = false;

    constructor() {
        makeObservable(this, {
            selectedEntityId: observable,
            isOpenEditor: observable,
            setSelectedEntityId: action,
            setIsOpenEditor: action,
        });
    }

    setSelectedEntityId(selectedEntityId: string | undefined) {
        this.selectedEntityId = selectedEntityId;
    }

    setIsOpenEditor(isOpenEditor: boolean) {
        this.isOpenEditor = isOpenEditor;
    }
}
