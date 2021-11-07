import * as fs from "fs";
import ErrnoException = NodeJS.ErrnoException;
import {countSort} from "./countSort";
import * as path from "path";

fs.readFile(path.join(__dirname, "binFile"), (err:ErrnoException | null, buf: Buffer) => {
  if (err) throw err;

  let bufView = new Uint16Array(buf.buffer);

  console.time("count sort");
  let sortedData = countSort(bufView);
  console.timeEnd("count sort");

  fs.writeFileSync(path.join(__dirname, "sortedBinFile"), sortedData)
});