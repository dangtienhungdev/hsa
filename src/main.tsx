import './styles/index.less';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './stores';

const queryClient = new QueryClient();

// Find the root DOM element where you want to mount your app
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement); // Create a root for React 18

  root.render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>,
  );
}
