import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { QuickOrderControlsClient } from "./QuickOrderControlsClient";
import { VirginOrderProvider } from "@/src/contexts/VirginOrderContext/VirginOrderProvider";

const meta: Meta<typeof QuickOrderControlsClient> = {
  title: "Organisms/QuickOrderControls",
  component: QuickOrderControlsClient,
  tags: ["autodocs"],
  args: {
    onOrder: fn(),
  },
  decorators: [
    (Story) => (
      <VirginOrderProvider>
        <Story />
      </VirginOrderProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QuickOrderControlsClient>;

export const Active: Story = {
  args: {
    isAvailable: true,
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
    isAvailable: true,
    onOrder: () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
};

export const VirginAvailable: Story = {
  args: {
    isAvailable: true,
    isVirginAvailable: true,
    omittedIngredientNames: ["tequila", "triple sec"],
  },
};

export const Unavailable: Story = {
  args: {
    isAvailable: false,
  },
};
