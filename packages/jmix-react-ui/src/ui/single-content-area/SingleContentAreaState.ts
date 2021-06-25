import {action, makeObservable, observable} from "mobx";
import { ReactNode } from "react";

export class SingleContentAreaState {
  @observable screenId?: string;
  @observable.ref content: ReactNode | null = null;

  activateScreen = action((screenId: string, content: ReactNode) => {
    if (this.screenId === screenId) {
      return;
    }

    this.screenId = screenId;
    this.content = content;
  });

  constructor() {
    makeObservable(this);
  }
}

export const singleContentArea = new SingleContentAreaState();