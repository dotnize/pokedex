export function formatDigits(num: number) {
	return num.toString().padStart(3, "0");
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function hgToKg(hg: number) {
	return hg / 10;
}

export function dmToM(dm: number) {
	return dm / 10;
}
