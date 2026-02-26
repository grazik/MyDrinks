import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Inactive: Story = {
  args: {
    children: "Vodka",
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    children: "Vodka",
    isActive: true,
  },
};
