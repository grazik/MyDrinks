import type { Meta, StoryObj } from "@storybook/nextjs";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ color: "#C19552" }}>
        <Story />
      </div>
    ),
  ],
};

export const InButton: Story = {
  render: () => (
    <button disabled style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Spinner /> Processing…
    </button>
  ),
};
