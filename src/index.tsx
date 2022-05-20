import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import 'tw-elements';

ReactDOM.render(
    <React.StrictMode>
        <ToastProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ToastProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
