import { writable } from 'svelte/store';
import type { AuthTokenOptions, SettingsState } from '../types';
import { getGithubUserData } from '../api/github';
import { disable, enable } from './auto-start';
import { clearState, loadState, saveState } from './storage';
import { getAzureUserData } from '../api/azure';

export const defaultSettings: SettingsState = {
  openAtStartup: false,
  fetchInterval: 30000,
};

const signIn = async ({ token, hostname, type, organisation, project }: AuthTokenOptions) => {
  const user = await (type === 'github' ? getGithubUserData(token, hostname) : getAzureUserData(token));
  if (user) {
    if (organisation && project) {
      user['organisation'] = organisation;
      user['project'] = project;
    }
    const account = {
      token,
      hostname,
      user,
      type
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
  switch (data['openAtStartup'] as boolean) {
    case true:
      enable();
    case false:
      disable();
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
