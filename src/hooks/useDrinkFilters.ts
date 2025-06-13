import { usePathname, useSearchParams } from "next/navigation";
import { IngredientCategory } from "@/constants/IngredientCategory";

export const useDrinkFilters = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const activeFilers = {
    [IngredientCategory.SPIRITS]: params
      .get(IngredientCategory.SPIRITS)
      ?.split(","),
    [IngredientCategory.ADDITIONAL]: params
      .get(IngredientCategory.ADDITIONAL)
      ?.split(","),
  };

  const updateQueryParam =
    (type: IngredientCategory) => (ingredientName: string) => {
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

      window.history.pushState(
        {},
        "",
        `${pathname}?${searchParams.toString()}`,
      );
    };

  return [activeFilers, updateQueryParam] as const;
};
