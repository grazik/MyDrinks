import { usePathname, useRouter, useSearchParams } from "next/navigation";

export enum FilterCategory {
  SPIRITS = "spirits",
  INGREDIENTS = "ingredients",
}

export const useDrinkFilters = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const activeFilers = {
    [FilterCategory.SPIRITS]: params.get(FilterCategory.SPIRITS)?.split(","),
    [FilterCategory.INGREDIENTS]: params
      .get(FilterCategory.INGREDIENTS)
      ?.split(","),
  };

  const updateQueryParam =
    (type: FilterCategory) => (ingredientName: string) => {
      const searchParams = new URLSearchParams(params);
      const currentFilterState = activeFilers[type];

      if (!currentFilterState) {
        searchParams.set(type, ingredientName);
      } else {
        const shouldDelete = currentFilterState.includes(ingredientName);

        const newFilters = shouldDelete
          ? currentFilterState.filter((name) => name !== ingredientName)
          : [...currentFilterState, ingredientName];

        if (newFilters.length > 0) {
          searchParams.set(type, newFilters.join(","));
        } else {
          searchParams.delete(type);
        }
      }

      push(`${pathname}?${searchParams.toString()}`, { scroll: false });
    };

  return [activeFilers, updateQueryParam] as const;
};
