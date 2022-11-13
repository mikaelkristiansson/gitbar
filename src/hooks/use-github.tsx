import { invoke } from '@tauri-apps/api';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';
import { useCallback, useEffect, useState } from 'react';
import { getReviews } from '../actions/api';
import { useAuthentication } from './auth';

interface Review {
  count: number;
  data: List[];
}

interface List {
  node: {
    repository: {
      nameWithOwner: string;
    };
    author: {
      login: string;
    };
    createdAt: string;
    number: string;
    url: string;
    title: string;
    labels: {
      nodes: Array<{
        name: string;
      }>;
    };
  };
}

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
      icon: 'icons/notification.png',
    });
  }
}

export function useGithub() {
  const [reviews, setReviews] = useState<Review>({
    count: 0,
    data: [],
  });
  const { accounts } = useAuthentication();

  const fetchReviews = useCallback(
    () =>
      accounts &&
      getReviews(accounts).then((res) => {
        if (res.issueCount !== reviews.count) {
          setReviews({ count: res.issueCount, data: res.edges });
        }
        if (res.issueCount > reviews.count) {
          notification('A new PR is awaiting your review!');
        }
      }),
    [accounts, reviews.count]
  );

  useEffect(() => {
    if (accounts) {
      getReviews(accounts).then((res) =>
        setReviews({ count: res.issueCount, data: res.edges })
      );
    }
  }, [accounts]);

  useEffect(() => {
    invoke('set_review_count', { count: String(reviews.count) });
  }, [reviews.count]);

  return { reviews, fetchReviews };
}
