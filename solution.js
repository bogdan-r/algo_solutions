const spell = (spellAction) => {
	for (let i = 0; i < 25; i++) {
		for (let j = 0; j < 25; j++) {
			process.stdout.write(spellAction(i, j));
		}
			console.log("");
	}
			console.log("");
};

const spellAction1 = (x, y) => {
	return x < y ? "#" : ".";
}

const spellAction2 = (x, y) => {
	return x == y ? "#" : ".";
}

const spellAction3 = (x, y) => {
	return x == 24 - y ? "#" : ".";
}

const spellAction6 = (x, y) => {
	return x < 10 || y < 10 ? "#" : ".";
}

const spellAction7 = (x, y) => {
	return x > 15 && y > 15 ? "#" : ".";
}

const spellAction8 = (x, y) => {
	return x * y == 0 ? "#" : ".";
}

const spellAction20 = (x, y) => {
	return (x + y) % 2 == 0 ? "#" : ".";
}

const spellAction21 = (x, y) => {
	return x % (y + 1) == 0  ? "#" : ".";
}

const spellAction23 = (x, y) => {
	return x % 2 + y % 3 > 0 ? "#" : ".";
}

const spellAction24 = (x, y) => {
	return x == y || x == 24 - y ? "#" : ".";
}

const spellAction14 = (x, y) => {
	return x*y <= 400 ? "#" : ".";
}

const spellAction11 = (x, y) => {
	return x == 1 || y == 1 || x == 23 || y == 23 ? "#" : ".";
}
spell(spellAction1);
spell(spellAction2);
spell(spellAction3);
spell(spellAction6);
spell(spellAction7);
spell(spellAction8);
spell(spellAction20);
spell(spellAction21);
spell(spellAction23);
spell(spellAction24);
spell(spellAction14);
spell(spellAction11);
