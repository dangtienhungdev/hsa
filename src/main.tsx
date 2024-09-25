import 'ckeditor5/ckeditor5.css';
import './styles/index.less';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom'; // Sử dụng ReactDOM từ react-dom thay vì createRoot
import { StrictMode } from 'react';
import store from './stores';

const queryClient = new QueryClient();

// Tìm root DOM element để mount ứng dụng của bạn
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>,

    rootElement,
  );
}
