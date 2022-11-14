import { invoke } from '@tauri-apps/api';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';
import { useCallback, useEffect, useState } from 'react';
import { getReviews } from '../actions/api';
import { Review } from '../types';
import { useAuthentication } from './auth';

interface Reviews {
  count: number;
  data: Review['edges'];
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
    });
  }
}

export function useGithub() {
  const [reviews, setReviews] = useState<Reviews>({
    count: 0,
    data: [],
  });
  const { account } = useAuthentication();

  const fetchReviews = useCallback(
    () =>
      account &&
      getReviews(account).then((res) => {
        if (res.issueCount !== reviews.count) {
          setReviews({ count: res.issueCount, data: res.edges });
        }
        if (res.issueCount > reviews.count) {
          notification('A new PR is awaiting your review!');
        }
      }),
    [account, reviews.count]
  );

  useEffect(() => {
    if (account) {
      getReviews(account).then((res) =>
        setReviews({ count: res.issueCount, data: res.edges })
      );
    }
  }, [account]);

  useEffect(() => {
    invoke('set_review_count', { count: String(reviews.count) });
  }, [reviews.count]);

  return { reviews, fetchReviews };
}
