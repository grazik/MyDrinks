import type { Meta, StoryObj } from "@storybook/nextjs";
import { Cta } from "./Cta";

const meta: Meta<typeof Cta> = {
  title: "Atoms/Cta",
  component: Cta,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Cta>;

export const SolidPrimary: Story = {
  args: {
    children: "Order Now",
    fill: "solid",
    tone: "primary",
  },
};

export const SolidDanger: Story = {
  args: {
    children: "Cancel Order",
    fill: "solid",
    tone: "danger",
  },
};

export const OutlinePrimary: Story = {
  args: {
    children: "View Drinks",
    fill: "outline",
    tone: "primary",
  },
};

export const OutlineDanger: Story = {
  args: {
    children: "Remove",
    fill: "outline",
    tone: "danger",
  },
};

export const Disabled: Story = {
  args: {
    children: "Unavailable",
    fill: "solid",
    tone: "primary",
    disabled: true,
  },
};

export const AsLink: Story = {
  args: {
    children: "Browse Drinks",
    href: "/drinks",
    fill: "solid",
    tone: "primary",
  },
};
