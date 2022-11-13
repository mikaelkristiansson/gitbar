import { open } from '@tauri-apps/api/shell';
import { useInterval } from '../hooks/use-interval';
import { useGithub } from '../hooks/use-github';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

export default function Reviews() {
  const { reviews, fetchReviews } = useGithub();
  useInterval(fetchReviews, 6000);

  function onClick(url: string) {
    open(url);
  }

  if (reviews.count === 0) {
    return (
      <div className="mx-4 my-8">
        <div className="p-4 w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
          <span className="flex items-center">
            <HandThumbUpIcon className="w-8 h-8 pr-2" />
            You have no reviews at the moment!
          </span>
        </div>
      </div>
    );
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
