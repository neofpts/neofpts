/**
 * Dual-purpose function for handling overloaded calls.
 */
export const dual = <
	A extends (...args: any[]) => any,
	B extends (...args: any[]) => any,
>(
	arity: number,
	implementation: A & B,
): A & B => implementation;
