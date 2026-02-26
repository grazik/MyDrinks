import type { Meta, StoryObj } from "@storybook/nextjs";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Atoms/Banner",
  component: Banner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: "Your order has been placed successfully.",
  },
};

export const Danger: Story = {
  args: {
    children: "An error occurred. Please try again.",
    variant: "danger",
  },
};
