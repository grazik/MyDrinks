import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    message: "Order placed!",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Hidden: Story = {
  args: {
    visible: false,
  },
};

export const Visible: Story = {
  args: {
    visible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Toast uses `position: fixed` and appears at the top-center of the viewport. In the Storybook iframe this behaves exactly as in production.",
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);
    const trigger = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 2500);
    };
    return (
      <>
        <Toast {...args} visible={visible} />
        <button type="button" onClick={trigger} style={{ marginTop: "60px" }}>
          Trigger Toast
        </button>
      </>
    );
  },
};
