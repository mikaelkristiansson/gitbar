import { AuthResponse, AuthState, AuthTokenResponse, User } from '../types';
import { getClient, ResponseType, Body } from '@tauri-apps/api/http';

export const github = {
  api: 'https://api.github.com',
  // GitHub OAuth
  AUTH_SCOPE: ['read:user', 'notifications'],

  DEFAULT_AUTH_OPTIONS: {
    hostname: 'github.com',
    clientId: '', //process.env.OAUTH_CLIENT_ID,
    clientSecret: '', //process.env.OAUTH_CLIENT_SECRET,
  },
};

// export const authGitHub = (authOptions = github.DEFAULT_AUTH_OPTIONS): Promise<AuthResponse> => {
//   return new Promise((resolve, reject) => {
//     // Build the OAuth consent page URL
//     const authWindow = new BrowserWindow({
//       width: 800,
//       height: 600,
//       show: true
//     });

//     const githubUrl = `https://${authOptions.hostname}/login/oauth/authorize`;
//     const authUrl = `${githubUrl}?client_id=${authOptions.clientId}&scope=${github.AUTH_SCOPE}`;

//     const { session } = authWindow.webContents;
//     session.clearStorageData();

//     authWindow.loadURL(authUrl);

//     const handleCallback = (url: string) => {
//       const rawCode = /code=([^&]*)/.exec(url) || null;
//       const authCode = rawCode && rawCode.length > 1 ? rawCode[1] : null;
//       const error = /\?error=(.+)$/.exec(url);
//       if (authCode || error) {
//         // Close the browser if code found or error
//         authWindow.destroy();
//       }
//       // If there is a code, proceed to get token from github
//       if (authCode) {
//         resolve({ authCode, authOptions });
//       } else if (error) {
//         reject(new Error(`Oops! Something went wrong and we couldn't log you in using Github. Please try again.`));
//       }
//     };

//     // If "Done" button is pressed, hide "Loading"
//     authWindow.on('close', () => {
//       authWindow.destroy();
//     });

//     authWindow.webContents.on(
//       'did-fail-load',
//       (event: any, errorCode: any, errorDescription: any, validatedURL: any) => {
//         if (validatedURL.includes(authOptions.hostname)) {
//           authWindow.destroy();
//           reject(new Error(`Invalid Hostname. Could not load https://${authOptions.hostname}/.`));
//         }
//       }
//     );

//     authWindow.webContents.on('will-redirect', (event: any, url: string) => {
//       event.preventDefault();
//       handleCallback(url);
//     });

//     authWindow.webContents.on('will-navigate', (event: any, url: string) => {
//       event.preventDefault();
//       handleCallback(url);
//     });
//   });
// };

export const getUserData = async (
  token: string,
  hostname: string
): Promise<User> => {
  const client = await getClient();
  const response: any = await client.get(`https://api.${hostname}/user`, {
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

// export const getToken = async (
//   authCode: string,
//   authOptions = github.DEFAULT_AUTH_OPTIONS
// ): Promise<AuthTokenResponse> => {
//   const url = `https://${authOptions.hostname}/login/oauth/access_token`;
//   const data = {
//     client_id: authOptions.clientId,
//     client_secret: authOptions.clientSecret,
//     code: authCode,
//   };

//   const response = await transport.post(url, data);
//   return {
//     hostname: authOptions.hostname,
//     token: response.data.access_token,
//   };
// };

export const addAccount = (
  accounts: AuthState,
  token: string,
  hostname: string,
  user?: User
): AuthState => {
  return {
    ...accounts,
    token,
    hostname,
    user: user ?? null,
  };
  // if (hostname === github.DEFAULT_AUTH_OPTIONS.hostname) {
  //   return {
  //     ...accounts,
  //     token,
  //     user: user ?? null,
  //   };
  // }

  // return {
  //   ...accounts,
  // };
};

export const getReviews = async (account: AuthState) => {
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
  const response: any = await client.post(
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
