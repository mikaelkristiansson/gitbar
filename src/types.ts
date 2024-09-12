export interface User {
  login: string;
  name?: string;
  id: number;
  avatar_url: string;
  html_url?: string;
  company?: string;
  email?: string;
}

export interface AuthState {
  token?: string;
  hostname: string;
  user: User | null;
}

export interface SettingsState {
  openAtStartup: boolean;
  isCompactMode: boolean;
  fetchInterval: number;
}

export interface GithubSettings {
  archive: boolean;
  type: 'review-requested' | 'author' | 'mentions' | 'assignee';
  state: 'open' | 'closed' | 'all';
}

export enum Appearance {
  light = 'light',
  dark = 'dark',
}

export interface AuthTokenOptions {
  hostname: string;
  token: string;
}

export interface Review {
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
      statusCheckRollup: {
        state: 'SUCCESS' | 'FAILURE';
      };
      isReadByViewer: boolean;
    };
  }>;
}
