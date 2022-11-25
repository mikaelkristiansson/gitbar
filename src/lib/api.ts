import type { AuthState, Review, User } from '../types';
import { getClient, ResponseType, Body } from '@tauri-apps/api/http';

export const getUserData = async (
  token: string,
  hostname: string
): Promise<User> => {
  const client = await getClient();
  const response: {
    data: {
      id: number;
      login: string;
      name: string;
      avatar_url: string;
    };
  } = await client.get(`https://api.${hostname}/user`, {
    responseType: ResponseType.JSON,
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const { data } = response;

  return {
    id: data.id,
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
  };
};

export const getReviews = async (account: AuthState): Promise<Review> => {
  const search = `type:pr state:open review-requested:${account.user?.login}`;
  const text = `
  {
    search(query: "${search}", type: ISSUE, first: 100) {
      issueCount
      edges {
        node {
          ... on PullRequest {
            repository {
              nameWithOwner
            }
            author {
              login
            }
            createdAt
            number
            url
            title
            labels(first:100) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
  const body = {
    query: text,
  };
  const client = await getClient();
  const response: {
    data: {
      data: {
        search: Review;
      };
    };
  } = await client.post(
    `https://api.${account.hostname}/graphql`,
    Body.text(JSON.stringify(body)),
    {
      headers: {
        Authorization: `token ${account.token}`,
      },
    }
  );
  const { data } = response;
  return data.data.search;
};
