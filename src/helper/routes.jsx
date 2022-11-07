import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import ProfileBase from '../components/pages/profile-pages/ProfileBase';
import PageBase from '../components/pages/base/PageBase';
import Chat from '../components/pages/Chat';
import Requests from '../components/pages/Requests';

function createAutoRoutes() {
    //Add routes for new pages to createRoutes
    //all you need is the desired path and the page component
    const createRoutes = {
        'home': Home,
        'chat': Chat,
        'requests': Requests,
    };
    return Object.keys(createRoutes).map(path => {
        return {
            'path': path,
            element: <PageBase children={createRoutes[path]}/>
        };
    });
}

function routes() {
    const autoRoutes = createAutoRoutes();

    const profileRoute = {
        path: 'profile/:username',
        children: [
            {
                index: true,
                element: <Navigate to='posts'/>
            },
            {
                path: 'posts',
                element: <PageBase children={ProfileBase}/>
            },
            {
                path: 'friends',
                element: <PageBase children={ProfileBase}/>
            },
            {
                path: 'settings',
                element: <PageBase children={ProfileBase}/>
            }
        ],
    }

    return createBrowserRouter([
        {
            path: '/',
            element: <Navigate to='home'/>
        },
        ...autoRoutes,
        profileRoute
    ]);
}

export default routes;