import {BinTree} from "./BinTree";

const binTree = new BinTree();
const binTree2 = new BinTree();
const elementCount = 10000;
// Рандомные значения
const randomValues: number[] = new Array(elementCount).fill(0);
randomValues.map(_item => Math.floor(Math.random() * 10000000) + 1)
console.time("Insert random")
for (const element of randomValues) {
    binTree.insert(element);
}
console.timeEnd("Insert random")

console.time("Find random")
for (const element of randomValues) {
    binTree.search(element);
}
console.timeEnd("Find random")

console.time("Remove random")
for (const element of randomValues) {
    binTree.remove(element);
}
console.timeEnd("Remove random")

console.log('--------')

// Последовательные значения
console.time("Insert increase")
for (let i = 0; i < elementCount; i++) {
    binTree2.insert(i);
}
console.timeEnd("Insert increase")

console.time("Find increase")
for (let i = 0; i < elementCount; i++) {
    binTree2.search(i);
}
console.timeEnd("Find increase")

console.time("Remove increase")
for (let i = 0; i < elementCount; i++) {
    binTree2.remove(i);
}
console.timeEnd("Remove increase")
