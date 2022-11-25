import { writable } from 'svelte/store';
import type { Appearance } from '../types';

// indicate if we're in dark mode or not
let dark: boolean;

let theme: keyof typeof Appearance;

function setMatchTheme({ matches: dark }: MediaQueryListEvent) {
  // only set if we haven't overridden the theme
  if (!localStorage.getItem('gitbar-theme')) {
    setMode(dark);
  }
}

function setTheme(isDark: boolean) {
  setMode(isDark);
}

function toggle() {
  setMode(!dark);
}

function setMode(value: boolean) {
  dark = value;

  // update page styling
  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const newMode = dark ? 'dark' : 'light';

  appearance.update((prev) => {
    return {
      ...prev,
      theme: newMode,
    };
  });
  // store the theme as a local override
  localStorage.setItem('gitbar-theme', newMode);

  // if the toggled-to theme matches the system defined theme, clear the local override
  // this effectively provides a way to override or revert to "automatic" setting mode
  if (window.matchMedia(`(prefers-color-scheme: ${newMode})`).matches) {
    localStorage.removeItem('gitbar-theme');
  }
}

export const appearance = writable({
  theme,
  toggle,
  setTheme,
  setMatchTheme,
});
