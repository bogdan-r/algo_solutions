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
	const fig = 1n << BigInt(input);
	const noA = 0xfefefefefefefefen;
	const noH = 0x7f7f7f7f7f7f7f7fn;
	const figNoA = fig & noA;
	const figNoH = fig & noH;

	let result = checkOverflow(figNoA << 7n) | checkOverflow(fig << 8n) | checkOverflow(figNoH << 9n) |
							 (figNoA >> 1n) |               (figNoH << 1n) |
							 (figNoA >> 9n) | (fig >> 8n) | (figNoH >> 7n);

	const bitMask = result.toString();

	let movesCount = getMoveCount(result);

	return `${movesCount}\r\n${bitMask}`.trim();
};