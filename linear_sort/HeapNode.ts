
export class HeapNode<T> {
  get fileDescr(): number {
    return this._fileDescr;
  }
  private items: T[];
  private cursor: number = 0;
  private _fileDescr: number; // Да, такое себе хранить файловый дескриптор тут, но удобно


  constructor(items: T[], fd: number) {
    this.items = [...items];
    this._fileDescr = fd;
  }

  public readNextFromItems(): T | null {
    if (this.isReachedEndItems()) return null;
    const item = this.items[this.cursor];
    this.cursor++;
    return item;
  }

  public isReachedEndItems() {
    return this.cursor >= this.items.length;
  }

  public fillItems(items: T[]) {
    this.cursor = 0;
    this.items = [...items];
  }
}

export interface IHeap<T> {
  item: T,
  heap: HeapNode<T>
}

export function heapComparator<T>(firstHeap: IHeap<T>, secondHeap: IHeap<T>): boolean {
  return firstHeap.item < secondHeap.item;
}