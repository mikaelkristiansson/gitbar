import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
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

  return (
    <ul>
      {reviews.data.map(({ node }) => (
        <li key={node.number}>
          <a href={node.url}>
            {node.repository.nameWithOwner} - {node.title}
            <span>
              #{node.number} opened on {node.createdAt} by {node.author.login}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
