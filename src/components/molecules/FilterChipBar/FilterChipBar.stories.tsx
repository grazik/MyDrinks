import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { fn } from "storybook/test";
import { FilterChipBar } from "./FilterChipBar";

const CHIPS = [
  "Vodka",
  "Rum",
  "Gin",
  "Tequila",
  "Whiskey",
  "Mezcal",
  "Pisco",
  "Aperol",
  "Campari",
  "Prosecco",
];

const meta: Meta<typeof FilterChipBar> = {
  title: "Molecules/FilterChipBar",
  component: FilterChipBar,
  tags: ["autodocs"],
  args: {
    heading: "Filter by ingredient",
    chips: CHIPS,
    onToggle: fn(),
    onShowAll: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof FilterChipBar>;

export const NoSelection: Story = {
  args: {
    activeIngredients: [],
  },
};

export const WithActive: Story = {
  args: {
    activeIngredients: ["Vodka", "Gin"],
  },
};

export const Collapsed: Story = {
  args: {
    activeIngredients: [],
    visibleLimit: 4,
  },
};

export const Interactive: Story = {
  args: {
    visibleLimit: 5,
  },
  render: (args) => {
    const [active, setActive] = useState<string[]>([]);
    const toggle = (name: string) =>
      setActive((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    return (
      <FilterChipBar {...args} activeIngredients={active} onToggle={toggle} />
    );
  },
};
