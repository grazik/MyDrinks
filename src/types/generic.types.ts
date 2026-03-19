export type UnionToIntersection<U> = (
  U extends unknown ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

export type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export const isNonNullable = <T>(item: T): item is NonNullable<T> =>
  item !== null && item !== undefined;

export const isArrayNonNullable = <T extends unknown[]>(
  array: T,
): array is NonNullableFields<T> => array.every(isNonNullable);

export const objectEntries = <T extends object>(
  obj: T,
): Array<[keyof T, T[keyof T]]> =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

export const objectFromEntries = <K extends PropertyKey, V>(
  entries: Array<[K, V]>,
): Record<K, V> => Object.fromEntries(entries) as Record<K, V>;
