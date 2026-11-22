import { usePathname, useSearchParams } from "next/navigation";
import { IngredientCategory } from "@/src/constants/IngredientCategory";
import { DrinkType } from "@/src/constants/DrinkType";
import { ActiveDrinkFilters } from "@/src/utils/ingredients/ingredients";

const CATEGORIES = Object.values(IngredientCategory);
const DRINK_TYPES = Object.values(DrinkType);
const DRINK_TYPE_PARAM = "type";

const parseDrinkType = (value: string | null) =>
  DRINK_TYPES.find((drinkType) => drinkType === value) ?? DrinkType.ALL;

export const useDrinkFilters = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const drinkType = parseDrinkType(params.get(DRINK_TYPE_PARAM));
  const isMocktailView = drinkType === DrinkType.MOCKTAIL;

  const activeFilters: ActiveDrinkFilters = {
    [IngredientCategory.SPIRITS]: isMocktailView
      ? undefined
      : params.get(IngredientCategory.SPIRITS)?.split(","),
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

  const setDrinkType = (nextDrinkType: DrinkType) => {
    const searchParams = new URLSearchParams(params);

    if (nextDrinkType === DrinkType.ALL) {
      searchParams.delete(DRINK_TYPE_PARAM);
    } else {
      searchParams.set(DRINK_TYPE_PARAM, nextDrinkType);
    }

    if (nextDrinkType === DrinkType.MOCKTAIL) {
      searchParams.delete(IngredientCategory.SPIRITS);
    }

    commit(searchParams);
  };

  const clearFilters = () => {
    const searchParams = new URLSearchParams(params);
    CATEGORIES.forEach((category) => searchParams.delete(category));
    commit(searchParams);
  };

  return {
    activeFilters,
    activeFilterNames,
    drinkType,
    toggleFilter,
    removeFilter,
    clearFilters,
    setDrinkType,
  };
};
