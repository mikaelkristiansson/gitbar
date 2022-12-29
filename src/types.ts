export interface User {
  name: string;
  id: string | number;
  url?: string;
  avatar?: string;
  organisation: string;
  project?: string;
}

export interface GithubUser {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
  html_url?: string;
  company?: string;
  email?: string;
}

export interface AzureUser {
  displayName: string,
  publicAlias: string,
  emailAddress: string,
  coreRevision: number,
  timeStamp: string,
  id: string,
  revision: number
}

export interface ExtendedAzureUser extends AzureUser {
  organisation: string;
  project: string;
}

export interface AuthState {
  token?: string;
  hostname: string;
  type: 'github' | 'azure',
  user: User | null;
}

export interface SettingsState {
  openAtStartup: boolean;
  fetchInterval: number;
}

export enum Appearance {
  light = 'light',
  dark = 'dark',
}

export interface AuthTokenOptions {
  hostname: string;
  token: string;
  type: 'github' | 'azure',
  organisation?: string;
  project?: string;
}

export interface Review {
  count: number;
  issues: Array<{
    repository: string;
    author: string;
    createdAt: string;
    number: string | number;
    url: string;
    title: string;
  }>
}

export interface GithubReview {
  issueCount: number;
  edges: Array<{
    node: {
      repository: {
        nameWithOwner: string;
      };
      author: {
        login: string;
      };
      createdAt: string;
      number: string;
      url: string;
      title: string;
      labels: {
        nodes: Array<{
          name: string;
        }>;
      };
    };
  }>;
}

interface PullRequest {
  repository: {
    id: string;
    name: string;
    url: string;
    project: {
      id: string;
      name: string;
      state: string;
    }
  };
  status: string;
  createdBy: {
    displayName: string;
    uniqueName: string;
  };
  creationDate: string;
  pullRequestId: number;
  title: string;
  url: string;
}

export interface AzureReview {
  value: PullRequest[],
  count: number;
}
