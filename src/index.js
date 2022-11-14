import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';

import './styles/index.css';
import './styles/App.css';
import './styles/Friend.css';
import './styles/GameCheckboxes.css';
import './styles/Posts.css';
import './styles/Profile.css';
import './styles/Search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

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
