type Optional<T> = T | undefined | null;

export function flatMap<T, U>(value: Optional<T>, fn: (val: T) => Optional<U>): Optional<U> {
    return value != null ? fn(value) : undefined;
}
