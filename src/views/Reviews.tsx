import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import { getReviews } from '../actions/api';
import { useAuthentication } from '../hooks/auth';

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

export default function Reviews() {
  const { accounts } = useAuthentication();
  const [reviews, setReviews] = useState<{ count: String; data: List[] }>({
    count: '-',
    data: [],
  });

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
          <span className="text-white">
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
