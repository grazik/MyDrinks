import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { fn } from "storybook/test";
import { QuantityStepper } from "./QuantityStepper";

const meta: Meta<typeof QuantityStepper> = {
  title: "Atoms/QuantityStepper",
  component: QuantityStepper,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof QuantityStepper>;

export const AtMin: Story = {
  args: {
    value: 1,
    min: 1,
  },
};

export const MidRange: Story = {
  args: {
    value: 3,
  },
};

export const AtMax: Story = {
  args: {
    value: 5,
    max: 5,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState(1);
    return (
      <QuantityStepper
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange(v);
        }}
      />
    );
  },
};
