export type Optional<T> = T | undefined | null;

export function flatMap<T, U>(value: Optional<T>, fn: (val: T) => Optional<U>): Optional<U> {
	return value != null ? fn(value) : undefined;
}

Array.prototype.mapNotNull = function <T, U>(callback: (value: T, index: number, array: T[]) => U | null | undefined): U[] {
	return this.map(callback).filter((item): item is U => item != null);
};

declare global {
	interface Array<T> {
		mapNotNull<U>(callback: (value: T, index: number, array: T[]) => U | null | undefined): U[];
	}
	interface Object {
		notNull<T, U>(value: Optional<T>, fn: (val: T) => Optional<U>): Optional<U>;
	  }
	
}

Object.prototype.notNull = function<T, U>(value: Optional<T>, fn: (val: T) => Optional<U>): Optional<U> {
	return value != null ? fn(value) : undefined;
};