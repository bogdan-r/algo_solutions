const findMax = (arr: Uint16Array): number => {
  let maxI = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[maxI] <= arr[i]) {
      maxI = i;
    }
  }

  return arr[maxI];
};

export const countSort = function(arr: Uint16Array): Uint16Array {
  const max = findMax(arr);
  const occurrences = [];

  for (let i = 0; i < max + 1; i++) {
    occurrences[i] = 0;
  }

  for (let j = 0; j < arr.length; j++) {
    occurrences[arr[j]]++;
  }

  let index = 0;
  for (let j = 0; j < occurrences.length; j++) {
    for (let i = 0; i < occurrences[j]; i++) {
      arr[index] = j;
      index++;
    }
  }

  return arr;
};
