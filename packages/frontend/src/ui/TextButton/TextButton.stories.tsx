import type { Meta, StoryObj } from "@storybook/react";

import { TextButton } from ".";

export default {
  title: "ui/TextButton",
  component: TextButton,
  args: {
    text: "Click me",
  },
} satisfies Meta<typeof TextButton>;

type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {
  args: {
    buttontype: "primary",
  },
};

export const Default: Story = {
  args: {
    buttontype: "default",
  },
};

export const Danger: Story = {
  args: {
    buttontype: "danger",
  },
};

export const None: Story = {
  args: {
    buttontype: "none",
  },
};
