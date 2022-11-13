// project imports
import type { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/Main';
import AuthGuard from '../utils/auth-guard';
import Reviews from '../views/Reviews';

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
      element: <Reviews />,
    },
    // {
    //   path: '*',
    //   element: <AccessDenied />,
    // },
  ],
};

export default MainRoutes;
