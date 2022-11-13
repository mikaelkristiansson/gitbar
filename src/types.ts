export interface User {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
}

export interface AuthState {
  token?: string;
  hostname: string;
  user: User | null;
}

export interface SettingsState {
  openAtStartup: boolean;
  appearance: Appearance;
}

export enum Appearance {
  SYSTEM = 'SYSTEM',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type RadioGroupItem = {
  label: string;
  value: string;
};

export interface AuthOptions {
  hostname: string;
  clientId?: string;
  clientSecret?: string;
}

export interface AuthTokenOptions {
  hostname: string;
  token: string;
}

export interface AuthResponse {
  authCode: string;
  authOptions: AuthOptions;
}
export interface AuthTokenResponse {
  hostname: string;
  token: string;
}
