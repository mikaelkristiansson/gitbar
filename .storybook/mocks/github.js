import { writable } from 'svelte/store';

const mockData = {
    issueCount: 1,
    edges: Array.from({ length: 5 }, () => ({
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
    })),
};

const reviews = mockData;

export const github = writable({
    reviews,
    fetchReviews: async () =>
        github.update(prev => ({
            ...prev,
            reviews: {
                count: mockData.issueCount,
                data: mockData.edges,
            },
        })),
});
