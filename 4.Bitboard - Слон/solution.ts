const getMoveCount = (moves: bigint): number => {
  let movesCount = 0;

  while (moves != 0n) {
    moves &= (moves - 1n);
    movesCount++;
  }

  return movesCount;
}

const leftTopShuffle = (pos: bigint): bigint => {
  const overflowBits = 0xff01010101010101n;
  let currentShuffle = pos << 7n;
  if ((overflowBits & pos) == pos) return 0n;
  let result = currentShuffle;

  while ((overflowBits & currentShuffle) != currentShuffle) {
    currentShuffle = currentShuffle << 7n;
    result = currentShuffle | result;
  }
  return result;
}

const rightTopShuffle = (pos: bigint): bigint => {
  const overflowBits = 0xff80808080808080n;
  let currentShuffle = pos << 9n;
  if ((overflowBits & pos) == pos) return 0n;
  let result = currentShuffle;

  while ((overflowBits & currentShuffle) != currentShuffle) {
    currentShuffle = currentShuffle << 9n;
    result = currentShuffle | result;
  }
  return result;
}

const leftBottomShuffle = (pos: bigint): bigint => {
  const overflowBits = 0x1010101010101ffn;
  let currentShuffle = pos >> 9n;
  if ((overflowBits & pos) == pos) return 0n;
  let result = currentShuffle;

  while ((overflowBits & currentShuffle) != currentShuffle) {
    currentShuffle = currentShuffle >> 9n;
    result = currentShuffle | result;
  }
  return result;
}

const rightBottomShuffle = (pos: bigint): bigint => {
  const overflowBits = 0x80808080808080ffn;
  let currentShuffle = pos >> 7n;
  if ((overflowBits & pos) == pos) return 0n;
  let result = currentShuffle;

  while ((overflowBits & currentShuffle) != currentShuffle) {
    currentShuffle = currentShuffle >> 7n;
    result = currentShuffle | result;
  }
  return result;
}

export default (input: string) => {
  const fig = 1n << BigInt(input);

  let result = leftTopShuffle(fig) | rightTopShuffle(fig) | leftBottomShuffle(fig) | rightBottomShuffle(fig);

  const bitMask = result.toString();

  let movesCount = getMoveCount(result);

  return `${movesCount}\r\n${bitMask}`.trim();
};