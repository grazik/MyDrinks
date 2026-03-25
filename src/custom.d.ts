type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type Nullable<T> = T | null;
