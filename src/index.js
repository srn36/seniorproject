import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './styles/index.css';
import './styles/App.css';
import './styles/Login.css';
import './styles/Friend.css';
import './styles/Posts.css';
import './styles/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            {/*<ReactQueryDevtools />*/}
        </QueryClientProvider>
    </React.StrictMode>
);
