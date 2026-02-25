import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/nextjs", options: {} },
  staticDirs: ["../public"],
  docs: { autodocs: "tag" },

  webpackFinal: async (config) => {
    // Path alias: @/* → project root
    config.resolve!.alias = {
      ...config.resolve!.alias,
      "@": path.resolve(__dirname, ".."),
    };

    // SVGR — mirror next.config.ts exactly
    const fileLoaderRule = config.module!.rules!.find(
      (rule: any) => rule?.test?.test?.(".svg")
    ) as any;

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
      config.module!.rules!.push(
        { ...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/ },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/] },
          use: ["@svgr/webpack"],
        }
      );
    }

    return config;
  },
};

export default config;
