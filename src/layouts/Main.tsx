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

export default function MainLayout() {
  const [fetching, setFetching] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { accounts, logout } = useAuthentication();
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
            {accounts?.user?.avatar_url ? (
              <Image
                src={accounts?.user?.avatar_url}
                fallback={UserCircleIcon}
                className="h-6 w-6 flex-shrink-0 rounded-full"
              />
            ) : null}
            <span className="ml-1 block truncate">{accounts?.user?.name}</span>
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
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          !settingsOpen ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Settings
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setSettingsOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Settings coming soon...
              </p>
            </div>
            <div className="flex items-center justify-end p-4 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
