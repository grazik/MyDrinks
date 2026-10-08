import { usePathname, useSearchParams } from "next/navigation";
import { IngredientCategory } from "@/src/constants/IngredientCategory";
import { ActiveDrinkFilters } from "@/src/utils/ingredients/ingredients";

const CATEGORIES = Object.values(IngredientCategory);

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

  const activeFilterNames = CATEGORIES.flatMap(
    (category) => activeFilters[category] ?? [],
  );

  const commit = (searchParams: URLSearchParams) => {
    const query = searchParams.toString();
    window.history.pushState({}, "", query ? `${pathname}?${query}` : pathname);
  };

  const toggleFilter =
    (category: IngredientCategory) => (ingredientName: string) => {
      const searchParams = new URLSearchParams(params);
      const currentFilterState = activeFilters[category];

      if (!currentFilterState) {
        searchParams.set(category, ingredientName);
      } else {
        const shouldDelete = currentFilterState.includes(ingredientName);

        const newFilters = shouldDelete
          ? currentFilterState.filter((name) => name !== ingredientName)
          : [...currentFilterState, ingredientName];

        if (newFilters.length > 0) {
          searchParams.set(category, newFilters.join(","));
        } else {
          searchParams.delete(category);
        }
      }

      commit(searchParams);
    };

  // Ingredient names are unique across categories, so the name alone
  // identifies which category the filter lives in.
  const removeFilter = (ingredientName: string) => {
    const category = CATEGORIES.find((category) =>
      activeFilters[category]?.includes(ingredientName),
    );
    if (category) toggleFilter(category)(ingredientName);
  };

  const clearFilters = () => {
    const searchParams = new URLSearchParams(params);
    CATEGORIES.forEach((category) => searchParams.delete(category));
    commit(searchParams);
  };

  return {
    activeFilters,
    activeFilterNames,
    toggleFilter,
    removeFilter,
    clearFilters,
  };
};
