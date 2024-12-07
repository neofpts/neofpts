/**
 * Dual-purpose function for handling overloaded calls.
 */
export const hello = <
	A extends (...args: any[]) => any,
	B extends (...args: any[]) => any,
>(
	arity: number,
	implementation: A & B,
): A & B => implementation;
