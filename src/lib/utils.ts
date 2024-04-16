export function formatDigits(num: number) {
	return num.toString().padStart(3, "0");
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
