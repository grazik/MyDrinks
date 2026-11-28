import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { ToggleSwitch } from "./ToggleSwitch";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Atoms/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  args: {
    label: "Make it virgin",
    hint: "Without tequila & triple sec · 0% alcohol",
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Off: Story = {
  args: {
    isChecked: false,
  },
};

export const On: Story = {
  args: {
    isChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    isChecked: true,
    isDisabled: true,
  },
};
