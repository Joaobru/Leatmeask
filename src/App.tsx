import { AuthProvider } from '@src/providers/AuthProvider';

import Routes from './routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
