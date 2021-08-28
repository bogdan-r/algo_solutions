const getMoveCount = (moves: bigint): number => {
  let movesCount = 0;

  while (moves != 0n) {
    moves &= (moves - 1n);
    movesCount++;
  }

  return movesCount;
}

const leftShuffle = (pos: bigint): bigint => {
  const aCol = 0x101010101010101n;
  if ((pos & aCol) == pos) return  0n;
  let result = pos >> 1n;
  let currentShuffle = result;

  while ((aCol & currentShuffle) != currentShuffle) {
    currentShuffle = currentShuffle >> 1n;
    result = currentShuffle | result;
  }
  return result;
}

const rightShuffle = (pos: bigint): bigint => {
  const aCol = 0x8080808080808080n;
  if ((pos & aCol) == pos) return  0n;
  let result = pos << 1n;
  let currentShuffle = result;

  while ((aCol & currentShuffle) != currentShuffle) {
    currentShuffle = currentShuffle << 1n;
    result = currentShuffle | result;
  }
  return result;
}

const topShuffle = (pos: bigint): bigint => {
  const maxULongDig = 2n ** 64n - 1n;
  let currentShuffle = pos << 8n;
  if (currentShuffle >= maxULongDig) return 0n;
  let result = currentShuffle;

  while (maxULongDig >= currentShuffle) {
    currentShuffle = currentShuffle << 8n;
    if (maxULongDig > currentShuffle) {
      result = currentShuffle | result;
    }
  }
  return result;
}

const bottomShuffle = (pos: bigint): bigint => {
  let currentShuffle = pos >> 8n;
  if (currentShuffle == 0n) return 0n;
  let result = currentShuffle;

  while (currentShuffle > 0n) {
    currentShuffle = currentShuffle >> 8n;
    result = currentShuffle | result;
  }
  return result;
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

  let result = topShuffle(fig) | leftShuffle(fig) | rightShuffle(fig) | bottomShuffle(fig) | leftTopShuffle(fig) | rightTopShuffle(fig) | leftBottomShuffle(fig) | rightBottomShuffle(fig);

  const bitMask = result.toString();

  let movesCount = getMoveCount(result);

  return `${movesCount}\r\n${bitMask}`.trim();
};