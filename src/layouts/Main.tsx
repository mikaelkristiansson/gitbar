import { Outlet } from 'react-router-dom';
import {
  ArrowPathIcon,
  Cog8ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuthentication } from '../hooks/auth';
import { useGithub } from '../hooks/use-github';
import { useState } from 'react';
import Image from '../components/Image';
import Settings from '../views/Settings';

export default function MainLayout() {
  const [fetching, setFetching] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { account, logout } = useAuthentication();
  const { fetchReviews } = useGithub();
  const startFetch = () => {
    setFetching(true);
    fetchReviews()?.finally(() => setFetching(false));
  };

  return (
    <>
      <main className="mb-14">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-0 border-t dark:bg-gray-800 bg-white border-gray-200 shadow-md dark:border-gray-700 w-full px-2 py-2">
        <div className="flex justify-between">
          <div className="p-2 flex items-center">
            {account?.user?.avatar_url ? (
              <Image
                src={account?.user?.avatar_url}
                fallback={UserCircleIcon}
                className="h-6 w-6 flex-shrink-0 rounded-full"
              />
            ) : null}
            <span className="ml-1 block truncate">{account?.user?.name}</span>
          </div>
          <div>
            <button className="p-2" onClick={startFetch}>
              <ArrowPathIcon
                className={`h-6 w-6 ${fetching ? 'animate-spin' : ''}`}
              />
            </button>
            <button className="p-2" onClick={() => setSettingsOpen(true)}>
              <Cog8ToothIcon className="h-6 w-6" />
            </button>
            <button className="p-2" onClick={logout}>
              <PowerIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </footer>
      <Settings open={settingsOpen} setOpen={setSettingsOpen} />
    </>
  );
}
