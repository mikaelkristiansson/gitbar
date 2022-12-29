import type { AuthState, GithubReview, GithubUser, Review, User } from '../types';
import { getClient, ResponseType, Body } from '@tauri-apps/api/http';
import { mapGithubReview, mapGithubUser } from '../lib/formatters';

export const getGithubUserData = async (
  token: string,
  hostname: string
): Promise<User> => {
  const client = await getClient();
  const response: {
    data: GithubUser;
  } = await client.get(`https://api.${hostname}/user`, {
    responseType: ResponseType.JSON,
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const { data } = response;

  return mapGithubUser(data);
};

export const getGithubReviews = async (account: AuthState): Promise<Review> => {
  const search = `type:pr state:open review-requested:${account.user?.name}`;
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
            changedFiles
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
        search: GithubReview;
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
  return mapGithubReview(data.data.search);
};
