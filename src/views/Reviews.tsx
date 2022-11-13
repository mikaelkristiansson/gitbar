import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';
import { getReviews } from '../actions/api';
import { useAuthentication } from '../hooks/auth';
import { useInterval } from '../hooks/use-interval';
import { useGithub } from '../hooks/use-github';

// interface Review {
//   count: String;
//   data: List[];
// }

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

// async function notification(text: string) {
//   let permissionGranted = await isPermissionGranted();
//   if (!permissionGranted) {
//     const permission = await requestPermission();
//     permissionGranted = permission === 'granted';
//   }
//   if (permissionGranted) {
//     sendNotification({
//       title: 'Gitbar',
//       body: text,
//       icon: 'icons/notification.png',
//     });
//   }
// }

export default function Reviews() {
  const { reviews, fetchReviews } = useGithub();
  useInterval(fetchReviews, 6000);
  //   const [reviews, setReviews] = useState<Review>({
  //     count: '-',
  //     data: [],
  //   });

  //   useEffect(() => {
  //     if (accounts) {
  //       getReviews(accounts).then((res) =>
  //         setReviews({ count: res.issueCount, data: res.edges })
  //       );
  //     }
  //   }, [accounts]);

  //   useEffect(() => {
  //     invoke('set_review_count', { count: String(reviews.count) });
  //   }, [reviews.count]);

  //   useEffect(() => {
  //     notification('A new PR is awaiting your review!');
  //   }, []);

  //   useInterval(() => {
  //     if (accounts) {
  //       getReviews(accounts).then((res) => {
  //         if (res.issueCount !== reviews.count) {
  //           setReviews({ count: res.issueCount, data: res.edges });
  //         }
  //         if (res.issueCount > reviews.count) {
  //           notification('A new PR is awaiting your review!');
  //         }
  //       });
  //     }
  //   }, 6000);

  function onClick(url: string) {
    open(url);
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {reviews.data.map(({ node }) => (
        <li
          className="p-2 hover:cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden"
          key={node.number}
          onClick={() => onClick(node.url)}
        >
          <span className="dark:text-white text-gray-900">
            {node.repository.nameWithOwner} - {node.title}
          </span>
          <br />
          <span className="text-sm text-gray-500 truncate dark:text-gray-400">
            #{node.number} opened on {node.createdAt} by {node.author.login}
          </span>
        </li>
      ))}
    </ul>
  );
}
