// ==============================|| AUTHENTICATION ROUTING ||============================== //
import Login from '../views/Login';

const AuthenticationRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Login />,
    },
  ],
};

export default AuthenticationRoutes;
