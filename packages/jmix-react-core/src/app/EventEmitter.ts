interface IKeyFuncVal {
  [k: string]: (...args: any[]) => any;
}

export class EventEmitter<Events extends IKeyFuncVal, Key extends keyof Events = keyof Events> {
  logEmits: boolean = false;
  private listeners: Map<Key, Set<Events[Key]>> = new Map();

  emit<K extends Key>(eventName: K, ...restParams: Parameters<Events[K]>) {    const events = this.listeners.get(eventName);


    if (events) {
      events.forEach((fn) => {
        fn.call(null, ...restParams);
      });
    }
  }

  on<K extends Key>(eventName: K, fn: Events[K]): () => void {
    if (!this.listeners.get(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    const events = this.listeners.get(eventName);

    events?.add(fn);

    // or use unsubscribe function
    return () => {
      this.off(eventName, fn);
    };
  }

  once<K extends Key>(eventName: K, fn: Events[K]): () => void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const unsubscribe = this.on(eventName, (...args: any[]) => {
      fn(...args);
      unsubscribe();
    });

    return unsubscribe;
  }

  off<K extends Key>(eventName: K, fn: Events[K]) {
    const events = this.listeners.get(eventName);

    if (events) events.delete(fn);
  }
}
