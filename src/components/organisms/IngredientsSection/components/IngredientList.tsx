"use client";

import { use } from "react";
import { virginOrderContext } from "@/src/contexts/VirginOrderContext/virginOrderContext";
import type { RecipeLine } from "@/src/utils/ingredients/ingredients";

type IngredientListProps = {
  lines: RecipeLine[];
};

export const IngredientList = ({ lines }: IngredientListProps) => {
  const { isVirgin } = use(virginOrderContext);

  return (
    <ul className="ingredients-section__list">
      {lines.map(({ id, name, amount, unit, isAlcoholic }) => {
        const isSkipped = isVirgin && isAlcoholic;

        return (
          <li
            key={id}
            className={[
              "ingredients-section__list-item",
              "body-text",
              isSkipped && "ingredients-section__list-item--skipped",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <p>
              {name}
              {isSkipped && (
                <span className="ingredients-section__skip-flag">skip</span>
              )}
            </p>
            <p className="body-text--dark">
              {amount} {unit}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
