"use client";
import "./recipe-panel.scss";

import { useBreakpoint } from "@/src/hooks/useBreakpoint";
import { Drawer } from "@/src/components/molecules/Drawer/Drawer";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { selectedOrderContext } from "@/src/contexts/SelectedOrderContext/selectedOrderContext";
import { OrderWithDrinkWithIngredientsAndUser } from "@/src/types/order.types";
import { H2SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { markdownToHtml } from "@/src/utils/markdown";
import Image from "next/image";
import { NoOrderSelectedStatusScreen } from "@/src/components/organisms/DashboardStatusScreen/DashboardStatusScreens";

type Drink = OrderWithDrinkWithIngredientsAndUser["drink"];

const DRAWER_CONFIG = {
  mobile: "bottom",
  tablet: "right",
} as const;

const heroImageStyle = {
  objectFit: "cover",
  objectPosition: "center",
} as const;

const RecipePanelContent = ({ drink }: { drink: Drink }) => {
  const [recipeHtml, setRecipeHtml] = useState("");

  useEffect(() => {
    let cancelled = false;

    markdownToHtml(drink.recipe)
      .then((html) => {
        if (!cancelled) setRecipeHtml(html);
      })
      .catch(() => {
        if (!cancelled) setRecipeHtml("");
      });
    return () => {
      cancelled = true;
    };
  }, [drink.recipe]);

  return (
    <div className="recipe-panel__content">
      {drink.image && (
        <div className="recipe-panel__hero">
          <Image
            src={drink.image}
            alt={drink.name}
            fill={true}
            style={heroImageStyle}
          />
        </div>
      )}
      <div className="recipe-panel__body">
        <h2 className="main-heading">{drink.name}</h2>
        <section>
          <H2SectionHeading>Ingredients</H2SectionHeading>
          <ul className="recipe-panel__ingredients">
            {drink.ingredients.map(({ id, amount, unit, ingredient }) => (
              <li key={id} className="body-text">
                <strong>
                  {amount} {unit}
                </strong>{" "}
                – {ingredient.name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <H2SectionHeading>Instructions</H2SectionHeading>
          <div
            className="body-text recipe-panel__recipe"
            dangerouslySetInnerHTML={{ __html: recipeHtml }}
          />
        </section>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="recipe-panel__empty">
    <NoOrderSelectedStatusScreen />
  </div>
);

export const RecipePanel = () => {
  const breakpoint = useBreakpoint();
  const { setSelectedOrder, selectedOrder } = useContext(selectedOrderContext);

  useLayoutEffect(() => {
    setSelectedOrder(null);
  }, [breakpoint, setSelectedOrder]);

  if (breakpoint === "desktop") {
    return (
      <aside className="recipe-panel">
        {selectedOrder ? (
          <RecipePanelContent drink={selectedOrder.drink} />
        ) : (
          <EmptyState />
        )}
      </aside>
    );
  }

  return (
    <Drawer
      side={DRAWER_CONFIG[breakpoint]}
      isOpen={!!selectedOrder}
      onClose={() => {
        setSelectedOrder(null);
      }}
      label={""}
    >
      {selectedOrder && <RecipePanelContent drink={selectedOrder.drink} />}
    </Drawer>
  );
};
