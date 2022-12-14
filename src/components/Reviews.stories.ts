import type { Meta, StoryObj } from '@storybook/svelte';

import Reviews from './Reviews.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta: Meta<Reviews> = {
    title: 'Gitbar/Reviews',
    component: Reviews,
};

export default meta;
type Story = StoryObj<Reviews>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Default: Story = {
    args: {},
};
