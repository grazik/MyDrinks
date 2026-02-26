import type { Preview } from "@storybook/nextjs";
import "../src/styles/index.scss";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#010B13" },
        { name: "surface", value: "#21384A" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          :root {
            --font-heading: 'Montserrat', system-ui, sans-serif;
            --font-body: 'Lato', system-ui, sans-serif;
          }
        `}</style>
        <Story />
      </>
    ),
  ],
};

export default preview;
