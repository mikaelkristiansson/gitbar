import { writable } from 'svelte/store';
import type { AuthState, Review } from '../types';
import { getGithubReviews } from '../api/github';
import { getAzureReviews } from '../api/azure';
import { invoke } from '@tauri-apps/api';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';

const data: Review = {
  count: 0,
  issues: [],
};

async function notification(text: string) {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }
  if (permissionGranted) {
    sendNotification({
      title: 'GitBar',
      body: text,
    });
  }
}

const fetchReviews = async (account: AuthState) => {
  const res = await (account.type === 'github' ? getGithubReviews(account) : getAzureReviews(account));
  let prevCount: number;
  reviews.subscribe(({ data }) => (prevCount = data.count));

  if (res.count > prevCount) {
    const title = res.issues[0].title;
    const author = res.issues[0].author;
    notification(`${title} - @${author}`);
  }

  if (res.count !== prevCount) {
    reviews.update((prev) => ({
      ...prev,
      data: {
        count: res.count,
        issues: res.issues,
      },
    }));
    invoke('set_review_count', { count: String(res.count) });
  }
};

export const reviews = writable({
  data,
  fetchReviews,
});
