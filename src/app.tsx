import { Routes } from '@/routes';
import { KdsProvider } from '@/shared/state/kds-provider';

function App() {
  return (
    <KdsProvider>
      <Routes />
    </KdsProvider>
  );
}

export default App;
