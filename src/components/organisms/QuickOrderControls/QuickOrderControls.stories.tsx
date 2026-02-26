import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { QuickOrderControls } from "./QuickOrderControls";

const meta: Meta<typeof QuickOrderControls> = {
  title: "Organisms/QuickOrderControls",
  component: QuickOrderControls,
  tags: ["autodocs"],
  args: {
    onOrder: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof QuickOrderControls>;

export const Active: Story = {
  args: {
    available: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click 'Order Now' to place an order. The Toast confirmation uses `position: fixed` and appears at the top-center of the iframe.",
      },
    },
  },
};

export const ActiveWithDelay: Story = {
  args: {
    available: true,
    onOrder: () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
};

export const Unavailable: Story = {
  args: {
    available: false,
  },
};
