import type { AuthState, SettingsState } from '../types';
import { invoke } from '@tauri-apps/api';

export const loadState = (): {
  account?: AuthState;
  settings?: SettingsState;
} => {
  const existing = localStorage.getItem('gitbar-storage');
  const { auth: account, settings } = (existing && JSON.parse(existing)) || {};
  return { account, settings };
};

export const saveState = (
  account: AuthState,
  settings: SettingsState
): void => {
  const settingsString = JSON.stringify({ auth: account, settings });
  localStorage.setItem('gitbar-storage', settingsString);
};

export const clearState = (): void => {
  invoke('set_review_count', { count: '' });
  localStorage.clear();
};
