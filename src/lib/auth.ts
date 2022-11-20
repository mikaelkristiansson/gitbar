import { writable } from 'svelte/store';
import {
  Appearance,
  type AuthTokenOptions,
  type SettingsState,
} from '../types';
import { getUserData } from './api';
import { disable, enable } from './auto-start';
import { clearState, loadState, saveState } from './storage';

export const defaultSettings: SettingsState = {
  openAtStartup: false,
  appearance: Appearance.SYSTEM,
  fetchInterval: 30000,
};

const signIn = async ({ token, hostname }: AuthTokenOptions) => {
  const user = await getUserData(token, hostname);
  if (user) {
    const account = {
      token,
      hostname,
      user,
    };
    auth.update((prevAuth) => ({
      ...prevAuth,
      account,
    }));
    saveState(account, defaultSettings);
  }
};

const signOut = () => {
  auth.update((prevAuth) => ({
    ...prevAuth,
    account: null,
  }));
  clearState();
};

const updateSettings = (data: SettingsState) => {
  if (data['openAtStartup']) {
    switch (data['openAtStartup'] as boolean) {
      case true:
        enable();
      case false:
        disable();
    }
  }
  auth.update((prevAuth) => {
    const newSettings = {
      ...prevAuth.settings,
      ...data,
    };
    saveState(prevAuth.account, newSettings);
    return {
      ...prevAuth,
      settings: newSettings,
    };
  });
};

const prevState = loadState();

export const auth = writable({
  signIn,
  signOut,
  account: prevState.account,
  settings: prevState.settings || defaultSettings,
  updateSettings,
});
