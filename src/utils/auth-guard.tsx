import { useAuthentication } from '../hooks/auth';
import Login from '../views/Login';

export default function AuthGuard({ children }: { children: any }) {
  const { isLoggedIn } = useAuthentication();
  console.log('isLoggedIn', isLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return <Login />;
}
