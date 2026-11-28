"use client";

import { use } from "react";
import { virginOrderContext } from "@/src/contexts/VirginOrderContext/virginOrderContext";
import {
  formatIngredientNames,
  IngredientListStyle,
} from "@/src/utils/drinks/drinks";

type VirginNoteProps = {
  omittedIngredientNames: string[];
  virginNote: string | null;
};

export const VirginNote = ({
  omittedIngredientNames,
  virginNote,
}: VirginNoteProps) => {
  const { isVirgin } = use(virginOrderContext);

  if (!isVirgin) return null;

  const verb = omittedIngredientNames.length === 1 ? "is" : "are";

  return (
    <p className="ingredients-section__virgin-note">
      <strong>Virgin version:</strong>{" "}
      {formatIngredientNames(
        omittedIngredientNames,
        IngredientListStyle.SENTENCE,
      )}{" "}
      {verb} left out.{virginNote && ` ${virginNote}`}
    </p>
  );
};
