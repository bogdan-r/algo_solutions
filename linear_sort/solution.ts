import * as fs from "fs";
import * as path from "path";
import {readBytes, toArrayBuffer} from "./utils";
import {heapComparator, HeapNode, IHeap} from "./HeapNode";
import {BufferFiller} from "./BufferFiller";
import {shellSort} from "./shellSort";
const heapq = require("heapq");

const BIN_FILE_PATHNAME = path.join(__dirname, "binFile");
const OUTPUT_BIN_FILE_PATHNAME = path.join(__dirname, "outputBinFile");
const CHUNK_SIZE = 100 * 1000 * 1000;

let bufView = Buffer.alloc(CHUNK_SIZE);

let inputBinData = fs.openSync(BIN_FILE_PATHNAME, 'r');
let outputBinData = fs.openSync(OUTPUT_BIN_FILE_PATHNAME, 'w');

let inputFileStats = fs.statSync(BIN_FILE_PATHNAME);
let chunk_count = Math.floor(inputFileStats.size / CHUNK_SIZE)

let readedBytes = -1;// = fs.readSync(inputBinData, bufView, 0, bufView.length, null);

// Разбиваем файл на отсортированные куски
let fileN = 1;
while (readedBytes != 0) {
  readedBytes = readBytes(inputBinData, bufView);

  if (readedBytes == 0) break;
  let data;
  if (readedBytes < CHUNK_SIZE) {
    data = bufView.slice(0, readedBytes);
  } else {
    data = bufView;
  }

  let uint16Array = new Uint16Array(bufView.buffer);
  shellSort(uint16Array);// Sorting
  let tempFile = fs.openSync(path.join(__dirname, `temp_${fileN}`), 'w');
  fs.writeSync(tempFile, uint16Array, 0, null, 0);
  fs.closeSync(tempFile);
  fileN++;
}


const outputTempBuf = new Uint16Array(CHUNK_SIZE / 2);
const bufFiller = new BufferFiller(outputTempBuf);
const tempBuff = new Uint16Array((CHUNK_SIZE / chunk_count) / 2);
const heap: IHeap<number>[] = [];

// инициализируем набор данных для буффера
for (let i = 0; i < chunk_count; i++) {
  const tempFileFd = fs.openSync(path.join(__dirname, `temp_${i + 1}`), 'r');

  readBytes(tempFileFd, tempBuff);

  const arrayViewBuf = [...tempBuff];
  const heapNode = new HeapNode<number>(arrayViewBuf, tempFileFd);
  const heapItem: IHeap<number | null> = {
    item: heapNode.readNextFromItems(),
    heap: heapNode
  }
  heapq.push(heap, heapItem, heapComparator); // заряжаем в кучу первую партию данных
}

console.time("sorting")
while (true) {
  const heapItem: IHeap<number> = heapq.pop(heap, heapComparator)
  if (heapItem.item == Number.MAX_SAFE_INTEGER) { // записываем остатки из буфера выходим из цикла
    fs.writeSync(outputBinData, bufFiller.buf);
    break;
  }

  if (bufFiller.isFilled()) { // Буффер заполнился, записываем в файл, сбрасываем
    fs.writeSync(outputBinData, bufFiller.buf);
    bufFiller.reset();
  }

  bufFiller.push(heapItem.item);

  const currentHeapNode = heapItem.heap;
  if(currentHeapNode.isReachedEndItems()) {
    const readedBytes = readBytes(currentHeapNode.fileDescr, tempBuff);
    if (readedBytes == 0) {
      const nextHeapItem: IHeap<number | null> = {
        item: Number.MAX_SAFE_INTEGER,
        heap: currentHeapNode
      }

      heapq.push(heap, nextHeapItem, heapComparator);
    } else {
      const arrayViewBuf = [...tempBuff];
      currentHeapNode.fillItems(arrayViewBuf);
      const nextHeapItem: IHeap<number | null> = {
        item: currentHeapNode.readNextFromItems(),
        heap: currentHeapNode
      }

      heapq.push(heap, nextHeapItem, heapComparator);
    }
  } else {
    const nextHeapItem: IHeap<number | null> = {
      item: currentHeapNode.readNextFromItems(),
      heap: currentHeapNode
    }

    heapq.push(heap, nextHeapItem, heapComparator);
  }
}
console.timeEnd("sorting")
for (let i = 0; i < chunk_count; i++) { // удаляем все временные файлы
  fs.unlinkSync(path.join(__dirname, `temp_${i + 1}`));
}
