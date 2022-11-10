// ==============================|| AUTHENTICATION ROUTING ||============================== //
import Login from '../views/Login';

const AuthenticationRoutes = {
  path: '/',
  // element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Login />,
    },
  ],
};

export default AuthenticationRoutes;
