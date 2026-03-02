export type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export const isNonNullable = <T>(item: T): item is NonNullable<T> =>
  item !== null && item !== undefined;

export const isArrayNonNullable = <T extends unknown[]>(
  array: T,
): array is NonNullableFields<T> => array.every(isNonNullable);
