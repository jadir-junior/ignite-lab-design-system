import "../src/styles/global.css";

import { initialize, mswDecorator } from "msw-storybook-addon";

import { themes } from "@storybook/theming";

// Initialize MSW
initialize({
  onUnhandledRequest: "bypass",
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
};

export const decorators = [mswDecorator];
