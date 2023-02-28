/**
 * Convert a number to a string, while leaving anything non-numeric alone
 * @param n the input maybe-number
 * @returns {*|string} a string if the input was a number, or the input itself if not
 */
export function numToString(n) {
	if (typeof n !== "number") {
		return n;
	}

	return n + "";
}