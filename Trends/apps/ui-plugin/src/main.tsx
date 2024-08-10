import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {App} from './components/App';
import {LocalStorageProvider} from "./utils/localStorage/LocalStorageProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <LocalStorageProvider>
      <App />
    </LocalStorageProvider>
  </StrictMode>
);
