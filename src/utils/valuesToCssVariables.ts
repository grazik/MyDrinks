import {
  isArrayNonNullable,
  objectEntries,
  objectFromEntries,
} from "@/src/types/generic.types";

export const valuesToCssVariables = <T extends Record<string, string | number>>(
  mapper: T,
) => {
  type Keys = keyof T;
  type Values = T[Keys];

  return (
    values: Partial<Record<Keys, string | null | number>>,
  ): Partial<Record<Values, string | number>> => {
    const entries = objectEntries(values)
      .filter((entry): entry is [Keys, string | number] =>
        isArrayNonNullable(entry),
      )
      .map(([key, value]): [Values, string | number] => [mapper[key], value]);

    return objectFromEntries(entries);
  };
};
