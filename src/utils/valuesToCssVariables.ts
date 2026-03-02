import { isArrayNonNullable } from "@/src/types/generic.types";

export const valuesToCssVariables = <T extends Record<string, string | number>>(
  mapper: T,
) => {
  type CssVariablesKeys = keyof typeof mapper;
  type CssVariablesValues = (typeof mapper)[CssVariablesKeys];

  return (
    values: Record<CssVariablesKeys, string | undefined | null | number>,
  ): Partial<Record<CssVariablesValues, string>> => {
    const valuesEntries = (Object.entries(values) as Entries<typeof values>)
      .filter(isArrayNonNullable)
      .map(([colorKey, color]) => [mapper[colorKey], color]);

    return Object.fromEntries(valuesEntries);
  };
};
