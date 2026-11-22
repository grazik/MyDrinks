import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { fn } from "storybook/test";
import { SegmentedControl } from "./SegmentedControl";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "cocktail", label: "Cocktails" },
  { value: "mocktail", label: "Mocktails" },
];

const meta: Meta<typeof SegmentedControl> = {
  title: "Molecules/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: {
    label: "Drink type",
    options: OPTIONS,
    value: "all",
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const FirstSelected: Story = {};

export const LastSelected: Story = {
  args: {
    value: "mocktail",
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};
