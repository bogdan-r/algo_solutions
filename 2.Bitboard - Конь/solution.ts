// Не нашел способа обрезать числа выходящие за границы 64 бит((
const checkOverflow = (operation: bigint): bigint => {
  const maxULongDig = 2n ** 64n - 1n;

  return operation > maxULongDig ? 0n : operation;
}

const getMoveCount = (moves: bigint): number => {
  let movesCount = 0;

  while (moves != 0n) {
    moves &= (moves - 1n);
    movesCount++;
  }

  return movesCount;
}

export default (input: string) => {
  const knightBits = 1n << BigInt(input);
  const noA = 0xfefefefefefefefen;
  const noAB = 0xFcFcFcFcFcFcFcFcn;
  const noGH = 0x3f3f3f3f3f3f3f3fn;
  const noH = 0x7f7f7f7f7f7f7f7fn;

  const movesBits = noGH & (knightBits <<  6n | knightBits >> 10n)
    |  noH & (knightBits << 15n | knightBits >> 17n)
    | noA  & (knightBits << 17n | knightBits >> 15n)
    | noAB & (knightBits << 10n | knightBits >>  6n);

  const bitMask = movesBits.toString();

  let movesCount = getMoveCount(movesBits);

  return `${movesCount}\r\n${bitMask}`.trim();
};