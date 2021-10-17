const selectionSort = (arr: number[]): number[] => {

  for (let i = 0; i < arr.length; i++) {
    let minI = i;

    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minI]) {
        minI = j;
      }
    }

    if (i != minI) {
      let temp = arr[i];
      arr[i] = arr[minI];
      arr[minI] = temp;
    }
  }

  return arr;
}

const arrSample = [3, 4, 2, 1, 8, 9, 4, 5, 100];

let res = selectionSort(arrSample);

console.log(res);