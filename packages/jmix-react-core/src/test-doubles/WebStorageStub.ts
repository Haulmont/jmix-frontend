export class WebStorageStub implements Storage {
  storage: Record<string, string> = {};
  length: number = 0;

  clear(): void {
    this.storage = {};
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this.storage[key] ?? null;
  }

  key(_index: number): string | null {
    throw Error("not implemented");
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }
}