import * as fs from "fs";
import * as path from "path";

const COUNT_OF_ITEMS = 1000000000; // для удобства подсчета
const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

let bufView = new Uint16Array(COUNT_OF_ITEMS);

for (let i = 0; i < bufView.length; i++) {
  bufView[i] = getRandom(0, 65535);
}

fs.writeFileSync(path.join(__dirname, "binFile"), bufView);
