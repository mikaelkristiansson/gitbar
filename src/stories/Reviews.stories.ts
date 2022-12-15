import type { Meta, StoryObj } from '@storybook/svelte';
import Reviews from 'src/components/Reviews.svelte';
import type { Review } from 'src/types';

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

const mockUser = {
    token: '123',
    hostname: 'github.com',
    user: {
        login: 'asdf',
        name: 'antman',
        id: '123',
        avatar_url: 'https://www.imdb.com/title/tt0478970/',
        html_url: 'https://www.imdb.com/title/tt0478970/',
        company: 'marvel',
        email: 'asdf@asdf.com',
    },
};

const search = `type:pr state:open review-requested:${mockUser.user?.login}`;

const mockData: Review = {
    issueCount: 1,
    edges: [
        {
            node: {
                repository: {
                    nameWithOwner: 'test/repo',
                },
                author: {
                    login: 'antman',
                },
                createdAt: '2022-01-01T00:00:00Z',
                number: '42069',
                url: 'https://www.imdb.com/title/tt0478970/',
                title: 'asdf',
                labels: {
                    nodes: [{ name: 'qwer' }],
                },
            },
        },
    ],
};
