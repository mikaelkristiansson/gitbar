import { writable } from 'svelte/store';
import type { AuthState } from '../types';
import { getReviews } from './api';
import { invoke } from '@tauri-apps/api';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';

const reviews = {
  count: 0,
  data: [],
};

async function notification(text: string) {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }
  if (permissionGranted) {
    sendNotification({
      title: 'Gitbar',
      body: text,
    });
  }
}

const fetchReviews = async (account: AuthState) => {
  const res = await getReviews(account);
  let prevCount: number;
  github.subscribe(({ reviews }) => (prevCount = reviews.count));
  if (res.issueCount !== prevCount) {
    github.update((prev) => ({
      ...prev,
      reviews: {
        count: res.issueCount,
        data: res.edges,
      },
    }));
    invoke('set_review_count', { count: String(res.issueCount) });
  }
  if (res.issueCount > prevCount) {
    notification('A new PR is awaiting your review!');
  }
};

export const github = writable({
  reviews,
  fetchReviews,
});
