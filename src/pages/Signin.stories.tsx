import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import { SignIn } from "./Signin";
import { expect } from "@storybook/jest";
import { rest } from "msw";

export default {
  title: "Pages/Sign in",
  component: SignIn,
  parameters: {
    msw: {
      handlers: [
        rest.post("/sessions", (req, res, ctx) => {
          return res(
            ctx.json({
              message: "Login realizado!",
            })
          );
        }),
      ],
    },
  },
} as ComponentMeta<typeof SignIn>;

export const Template: ComponentStory<typeof SignIn> = () => <SignIn />;

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  userEvent.type(canvas.getByLabelText("email"), "john.doe@gmail.com");
  userEvent.type(canvas.getByLabelText("password"), "12345678");
  userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvas.getByText("Login realizado!")).toBeInTheDocument();
  });
};
