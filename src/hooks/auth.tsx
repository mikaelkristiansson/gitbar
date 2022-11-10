import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  addAccount,
  /* authGitHub, */
  getToken,
  getUserData,
  github,
} from '../actions/api';
import {
  Appearance,
  AuthState,
  AuthTokenOptions,
  SettingsState,
} from '../types';
import { clearState, saveState } from '../utils/storage';

const defaultAccounts: AuthState = {
  token: undefined,
  user: null,
};

export const defaultSettings: SettingsState = {
  openAtStartup: false,
  appearance: Appearance.SYSTEM,
};

interface AuthContext {
  accounts: AuthState;
  isLoggedIn: boolean;
  login: () => void;
  validateToken: (data: AuthTokenOptions) => void;
  logout: () => void;
  settings: SettingsState;
  updateSetting: (name: keyof SettingsState, value: any) => void;
}

export const authContext = createContext<Partial<AuthContext>>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<AuthState>(defaultAccounts);
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  const isLoggedIn = useMemo(() => {
    return !!accounts.token;
  }, [accounts]);

  // const login = useCallback(async () => {
  //   const { authCode } = await authGitHub();
  //   const { token } = await getToken(authCode);
  //   const { hostname } = github.DEFAULT_AUTH_OPTIONS;
  //   const user = await getUserData(token, hostname);
  //   const updatedAccounts = addAccount(accounts, token, hostname, user);
  //   setAccounts(updatedAccounts);
  //   saveState(updatedAccounts, settings);
  // }, [accounts, settings]);

  const validateToken = useCallback(
    async ({ token, hostname }: AuthTokenOptions) => {
      //   await apiRequestAuth(`https://api.${hostname}/notifications`, 'HEAD', token);
      const user = await getUserData(token, hostname);
      const updatedAccounts = addAccount(accounts, token, hostname, user);
      setAccounts(updatedAccounts);
      saveState(updatedAccounts, settings);
    },
    [accounts, settings]
  );

  const logout = useCallback(() => {
    setAccounts(defaultAccounts);
    clearState();
  }, []);

  const updateSetting = useCallback(
    (name: keyof SettingsState, value: boolean | Appearance) => {
      if (name === 'openAtStartup') {
        // setAutoLaunch(value as boolean);
      }

      const newSettings = { ...settings, [name]: value };
      setSettings(newSettings);
      saveState(accounts, newSettings);
    },
    [accounts, settings]
  );

  const value = useMemo(
    () => ({
      accounts,
      isLoggedIn,
      // login,
      validateToken,
      logout,
      settings,
      updateSetting,
    }),
    [isLoggedIn]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export function useAuthentication() {
  return useContext(authContext);
}
