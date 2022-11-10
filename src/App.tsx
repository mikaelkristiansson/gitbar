import { invoke } from '@tauri-apps/api';
import { AuthProvider } from './hooks/auth';
import Routes from './routes';

function App() {
  const addCount = (v: number) => {
    invoke('set_review_count', { count: String(v) });
  };

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
