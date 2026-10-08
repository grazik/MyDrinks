import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { ActiveFiltersBar } from "./ActiveFiltersBar";

const meta: Meta<typeof ActiveFiltersBar> = {
  title: "Molecules/ActiveFiltersBar",
  component: ActiveFiltersBar,
  tags: ["autodocs"],
  args: {
    onRemove: fn(),
    onClearAll: fn(),
    onOpenAllFilters: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ActiveFiltersBar>;

export const NoFilters: Story = {
  args: {
    resultCount: 42,
    appliedFilters: [],
  },
};

export const WithFilters: Story = {
  args: {
    resultCount: 3,
    appliedFilters: ["whisky", "rum", "lime"],
  },
};

export const NoResults: Story = {
  args: {
    resultCount: 0,
    appliedFilters: ["mezcal", "espresso"],
  },
};
