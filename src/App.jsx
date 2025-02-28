import useAuthListener from './hooks/useAuthListener';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';
function App() {
  const queryClient = new QueryClient();

  //세션확인(세션 잘못 됐으면 로그아웃)
  useAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
export default App;
