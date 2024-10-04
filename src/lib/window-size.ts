import { appWindow, LogicalSize } from '@tauri-apps/api/window';
const DEFAULT_HEIGHT = 400;
const DEFAULT_WIDTH = 500;
const FOOTER_HEIGHT = 56;
const MIN_HEIGHT = 120;

export const resetWindowSize = async () => await appWindow.setSize(new LogicalSize(DEFAULT_WIDTH, DEFAULT_HEIGHT));

export const setWindowSize = async (height: number) =>
  await appWindow.setSize(
    new LogicalSize(
      DEFAULT_WIDTH,
      height + FOOTER_HEIGHT < DEFAULT_HEIGHT ? height + FOOTER_HEIGHT + MIN_HEIGHT : DEFAULT_HEIGHT
    )
  );
