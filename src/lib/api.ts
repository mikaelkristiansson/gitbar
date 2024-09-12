import type { AuthState, GithubSettings, Review, User } from '../types';
import { getClient, ResponseType, Body } from '@tauri-apps/api/http';

export const getUserData = async (token: string, hostname: string): Promise<User> => {
  const client = await getClient();
  const response: {
    data: User;
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
    html_url: data.html_url,
    company: data.company,
    email: data.email,
  };
};

export const getReviews = async (account: AuthState, settings: GithubSettings): Promise<Review> => {
  const search = `type:pr state:${settings.state} archived:${settings.archive} ${settings.type}:${account.user?.login}`;
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
            labels(first: 10) {
              edges {
                node {
                  color
                  name
                }
              }
            }
            statusCheckRollup {
              state
            }
            isReadByViewer
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
  } = await client.post(`https://api.${account.hostname}/graphql`, Body.text(JSON.stringify(body)), {
    headers: {
      Authorization: `token ${account.token}`,
    },
  });
  const { data } = response;
  return data.data.search;
};
