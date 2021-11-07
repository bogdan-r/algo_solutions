import TypedArray = NodeJS.TypedArray;

export class BufferFiller {
  get buf(): NodeJS.TypedArray {
    return this._buf;
  }
  private readonly _buf: TypedArray;
  private cursor: number = 0;

  constructor(buf: TypedArray) {
    this._buf = buf;
  }

  public push(byte: number) {
    if (this.isFilled())
      throw Error("Buffer is filled");

    this._buf[this.cursor] = byte;
    this.cursor++;
  }

  public isFilled(): boolean {
    return this.cursor >= this._buf.length;
  }

  public reset() {
    this.cursor = 0;
    // @ts-ignore
    this._buf.fill(0);
  }
}