const calcHappyTicket = (n: number): bigint => {
  const initSeq = new Array(10).fill(1n);

  return calcHappyTicketIter(n, 1, initSeq)
    .reduce((acc, item) => acc + item * item, 0n);
}

const calcHappyTicketIter = (n: number, i: number, prevSeq: bigint[]): bigint[] => {
  if (n == i || n == 1)
    return [...prevSeq];

  const k = n * 9 + 1;

  const newSeq = new Array(k)
    .fill(0n)
    .map((seqItem, iSeq) => {
      const startIndex = iSeq - 9 < 0 ? 0 : iSeq - 9;
      const prevSeqSlice = prevSeq.slice(startIndex, iSeq + 1);
      if (prevSeqSlice.length == 0)
        return seqItem;

      return prevSeqSlice.reduce((acc, item) => acc + item, 0n)
    });

  return calcHappyTicketIter(n, i + 1, [...newSeq]);
}

export default (inputValue: string): string => {
  const n = parseInt(inputValue, 10);
  const result = calcHappyTicket(n)

  return result.toString();
}

