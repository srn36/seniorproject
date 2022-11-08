import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import ProfileBase from '../components/pages/profile-pages/ProfileBase';
import PageBase from '../components/pages/base/PageBase';
import Chat from '../components/pages/Chat';
import Requests from '../components/pages/friend-zone/Requests';
import Posts from '../components/pages/profile-pages/Posts';
import Friends from '../components/pages/profile-pages/Friends';
import Settings from '../components/pages/profile-pages/Settings';
import ErrorPage from '../components/pages/ErrorPage';
import FriendZoneBase from '../components/pages/friend-zone/FriendZoneBase';
import Recommendations from '../components/pages/friend-zone/Recommendations';

function routes() {
    const errorRoute = {
        path: '*',
        element: <ErrorPage/>
    };

    const profileRoute = {
        path: 'profile/:username',
        element: <ProfileBase/>,
        children: [
            {index: true, element: <Navigate to='posts'/>},
            {path: 'posts', element: <Posts/>},
            {path: 'friends', element: <Friends/>},
            {path: 'settings', element: <Settings/>}
        ],
    };

    const friendRoute = {
        path: 'friends',
        element: <FriendZoneBase/>,
        children: [
            {index: true, element: <Navigate to='requests'/>},
            {path: 'requests', element: <Requests/>},
            {path: 'recommendations', element: <Recommendations/>},
        ]
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <PageBase/>,
            children: [
                {
                    index: true,
                    element: <Navigate to='home'/>
                },
                profileRoute,
                errorRoute,
                friendRoute,
                //Add routes for new pages below
                //All you need is the desired path and the page component
                {path: 'home', element: <Home/>},
                {path: 'chat', element: <Chat/>},
            ]
        }
    ]);
    
    return router;
}

export default routes;