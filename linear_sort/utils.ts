import fs from "fs";

export const readBytes = (fd: number, buf: Buffer | Uint16Array, position?: number): number => {
  return fs.readSync(fd, buf, 0, buf.byteLength, position || null);
}

export const isFilledBuffer = (buf: Buffer, insertIndex: number): boolean => {
  return true;
}

export const toArrayBuffer = (buf: Buffer): ArrayBuffer => {
  let ab = new ArrayBuffer(buf.length);
  let view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}