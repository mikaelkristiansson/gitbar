import { Outlet } from 'react-router-dom';
import {
  ArrowPathIcon,
  Cog8ToothIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import { useAuthentication } from '../hooks/auth';

export default function MainLayout() {
  const { accounts, logout } = useAuthentication();
  return (
    <>
      <main className="mb-14">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 left-0 border-t dark:bg-gray-800 bg-white border-gray-200 shadow-md dark:border-gray-700 w-full px-2 py-2">
        <div className="flex justify-between">
          <div className="p-2">{accounts?.user?.name}</div>
          <div>
            <button className="p-2">
              <ArrowPathIcon className="h-6 w-6" />
            </button>
            <button className="p-2">
              <Cog8ToothIcon className="h-6 w-6" />
            </button>
            <button className="p-2" onClick={logout}>
              <PowerIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
