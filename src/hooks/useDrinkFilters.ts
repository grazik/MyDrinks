import { usePathname, useSearchParams } from "next/navigation";
import { IngredientCategory } from "@/src/constants/IngredientCategory";
import { ActiveDrinkFilters } from "@/src/utils/ingredients/ingredients";

export const useDrinkFilters = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const activeFilters: ActiveDrinkFilters = {
    [IngredientCategory.SPIRITS]: params
      .get(IngredientCategory.SPIRITS)
      ?.split(","),
    [IngredientCategory.ADDITIONAL]: params
      .get(IngredientCategory.ADDITIONAL)
      ?.split(","),
  };

  const commit = (searchParams: URLSearchParams) => {
    const query = searchParams.toString();
    window.history.pushState({}, "", query ? `${pathname}?${query}` : pathname);
  };

  const toggleFilter =
    (type: IngredientCategory) => (ingredientName: string) => {
      const searchParams = new URLSearchParams(params);
      const currentFilterState = activeFilters[type];

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

      commit(searchParams);
    };

  const clearFilters = () => {
    const searchParams = new URLSearchParams(params);
    Object.values(IngredientCategory).forEach((type) =>
      searchParams.delete(type),
    );
    commit(searchParams);
  };

  return [activeFilters, toggleFilter, clearFilters] as const;
};
