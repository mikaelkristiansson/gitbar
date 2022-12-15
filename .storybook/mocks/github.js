import { writable } from 'svelte/store';

const reviews = {
    count: 0,
    data: [],
};

const fetchReviews = async () => {
    const res = mockData;
    let prevCount;
    github.subscribe(({ reviews }) => (prevCount = reviews.count));

    if (res.issueCount > prevCount) {
        const title = res.edges[0].node.title;
        const author = res.edges[0].node.author.login;
        // notification(`${title} - @${author}`);
    }
    if (res.issueCount !== prevCount) {
        github.update(prev => ({
            ...prev,
            reviews: {
                count: res.issueCount,
                data: res.edges,
            },
        }));
    }
};

export const github = writable({
    reviews,
    fetchReviews,
});

const mockData = {
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
