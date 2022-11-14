import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { addAccount, getUserData } from '../actions/api';
import {
  Appearance,
  AuthState,
  AuthTokenOptions,
  SettingsState,
} from '../types';
import { disable, enable, isEnabled } from '../utils/auto-start';
import { clearState, loadState, saveState } from '../utils/storage';

export const defaultHost = 'github.com';

const defaultAccount: AuthState = {
  token: undefined,
  hostname: defaultHost,
  user: null,
};

export const defaultSettings: SettingsState = {
  openAtStartup: false,
  appearance: Appearance.SYSTEM,
};

interface AuthContext {
  account: AuthState;
  isLoggedIn: boolean;
  login: () => void;
  validateToken: (data: AuthTokenOptions) => void;
  logout: () => void;
  settings: SettingsState;
  updateSetting: (name: keyof SettingsState, value: any) => void;
}

export const authContext = createContext<Partial<AuthContext>>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<AuthState>(defaultAccount);
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  useEffect(() => {
    restoreSettings();
    isEnabled().then((res) => console.log('rrr', res));
  }, []);

  const isLoggedIn = useMemo(() => {
    return !!account.token;
  }, [account]);

  const validateToken = useCallback(
    async ({ token, hostname }: AuthTokenOptions) => {
      const user = await getUserData(token, hostname);
      const updatedAccount = addAccount(account, token, hostname, user);
      setAccount(updatedAccount);
      saveState(updatedAccount, settings);
    },
    [account, settings]
  );

  const logout = useCallback(() => {
    setAccount(defaultAccount);
    clearState();
  }, []);

  const restoreSettings = useCallback(() => {
    const existing = loadState();

    if (existing.account) {
      setAccount({ ...defaultAccount, ...existing.account });
    }

    if (existing.settings) {
      setSettings({ ...defaultSettings, ...existing.settings });
    }
  }, []);

  const updateSetting = useCallback(
    (name: keyof SettingsState, value: boolean | Appearance) => {
      if (name === 'openAtStartup') {
        switch (value as boolean) {
          case true:
            enable();
          case false:
            disable();
        }
      }

      const newSettings = { ...settings, [name]: value };
      setSettings(newSettings);
      saveState(account, newSettings);
    },
    [account, settings]
  );

  const value = useMemo(
    () => ({
      account,
      isLoggedIn,
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
