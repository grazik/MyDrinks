import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { QuickOrderControlsClient } from "./QuickOrderControlsClient";

const meta: Meta<typeof QuickOrderControlsClient> = {
  title: "Organisms/QuickOrderControls",
  component: QuickOrderControlsClient,
  tags: ["autodocs"],
  args: {
    onOrder: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof QuickOrderControlsClient>;

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
