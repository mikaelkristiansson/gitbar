// project imports
import type { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/Main';
import AuthGuard from '../utils/auth-guard';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <div>Hello</div>,
    },
    // {
    //   path: '*',
    //   element: <AccessDenied />,
    // },
  ],
};

export default MainRoutes;
