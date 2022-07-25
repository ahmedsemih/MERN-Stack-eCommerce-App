import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';

import { UserProvider } from './contexts/UserContext';
import { SearchProvider } from './contexts/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserProvider>
          <SearchProvider>
            <CookiesProvider>
              <App />
            </CookiesProvider>
          </SearchProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
