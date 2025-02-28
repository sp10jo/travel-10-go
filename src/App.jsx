import useAuthListener from './hooks/useAuthListener';
import Router from './shared/Router';

function App() {
  useAuthListener();
  return <Router />;
}

export default App;
