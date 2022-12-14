import type { Meta, StoryObj } from '@storybook/svelte';

import Login from './Login.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta: Meta<Login> = {
    title: 'Gitbar/Login',
    component: Login,
};

export default meta;
type Story = StoryObj<Login>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Default: Story = {
    args: {},
};
