import type { Meta, StoryObj } from "@storybook/nextjs";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Atoms/TextField",
  component: TextField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    id: "email",
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const WithValue: Story = {
  args: {
    id: "email",
    name: "email",
    label: "Email address",
    defaultValue: "user@example.com",
  },
};

export const Password: Story = {
  args: {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

export const WithError: Story = {
  args: {
    id: "email",
    name: "email",
    label: "Email address",
    defaultValue: "not-an-email",
    errors: "This field is required",
  },
};
