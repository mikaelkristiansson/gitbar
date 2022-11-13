import { AuthState, SettingsState } from '../types';
import { invoke } from '@tauri-apps/api';

export const loadState = (): {
  accounts?: AuthState;
  settings?: SettingsState;
} => {
  const existing = localStorage.getItem('gitbar-storage');
  const { auth: accounts, settings } = (existing && JSON.parse(existing)) || {};
  return { accounts, settings };
};

export const saveState = (
  accounts: AuthState,
  settings: SettingsState
): void => {
  const settingsString = JSON.stringify({ auth: accounts, settings });
  localStorage.setItem('gitbar-storage', settingsString);
};

export const clearState = (): void => {
  invoke('set_review_count', { count: '' });
  localStorage.clear();
};
