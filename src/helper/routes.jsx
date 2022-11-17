import { createBrowserRouter, Navigate } from 'react-router-dom';

// Default pages
import PageBase from '../components/pages/base/PageBase';
import ErrorPage from '../components/pages/ErrorPage';

// Misc pages
import Home from '../components/pages/Home';
import Chat from '../components/pages/Chat';
import MakePost from '../components/pages/MakePost';

// Profile imports
import ProfileBase from '../components/pages/profile-pages/ProfileBase';
import Posts from '../components/pages/profile-pages/Posts';
import Games from '../components/pages/profile-pages/Games';
import Friends from '../components/pages/profile-pages/Friends';

// Settings imports
import SettingsPageBase from '../components/pages/settings-pages/SettingsPageBase';
import AccountSettings from '../components/pages/settings-pages/AccountSettings';
import ProfileSettings from '../components/pages/settings-pages/ProfileSettings';
import Settings from '../components/pages/settings-pages/Settings';

// Friend Zone imports
import FriendZoneBase from '../components/pages/friend-zone/FriendZoneBase';
import Requests from '../components/pages/friend-zone/Requests';
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
            {path: 'games', element: <Games/>},
            {path: 'friends', element: <Friends/>}
        ],
    };

    const settingsRoute = {
        path: 'settings',
        element: <SettingsPageBase/>,
        children: [
            {index: true, element: <Navigate to='account'/>},
            {path: 'account', element: <AccountSettings/>},
            {path: 'profile', element: <ProfileSettings/>},
            {path: 'default', element: <Settings/>},
        ],
    };

    const friendRoute = {
        path: 'friend-zone',
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
                errorRoute,
                profileRoute, 
                settingsRoute,               
                friendRoute,
                //Add routes for new pages below
                //All you need is the desired path and the page component
                {path: 'home', element: <Home/>},
                {path: 'chat', element: <Chat/>},
                {path: 'make-post', element: <MakePost/>},
            ]
        }
    ]);
    
    return router;
}

export default routes;