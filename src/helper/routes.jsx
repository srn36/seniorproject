import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Storage } from 'aws-amplify';

// Default pages
import PageBase from '../components/pages/base/PageBase';
import ErrorPage from '../components/pages/ErrorPage';

// Misc pages
import Home from '../components/pages/Home';
import MakePost from '../components/pages/MakePost';

// Profile imports
import ProfileBase from '../components/pages/profile-pages/ProfileBase';
import Posts from '../components/pages/profile-pages/Posts';
import Overview from '../components/pages/profile-pages/Overview';
import Friends from '../components/pages/profile-pages/Friends';

// Settings imports
import SettingsPageBase from '../components/pages/settings-pages/SettingsPageBase';
import AccountSettings from '../components/pages/settings-pages/AccountSettings';
import ProfileSettings from '../components/pages/settings-pages/ProfileSettings';

// Friend Zone imports
import FriendZoneBase from '../components/pages/friend-zone/FriendZoneBase';
import Requests from '../components/pages/friend-zone/Requests';
/* import Recommendations from '../components/pages/friend-zone/Recommendations'; */

// API imports
import { getUser } from './api-calls/cognito-access';
import { 
    getFriendsForUser, 
    getIncomingRequestsForUser, 
    getOutgoingRequestsForUser 
} from '../unholy-abominations/simulateFriends';


function routes() {
    const errorRoute = {
        path: '*',
        element: <ErrorPage/>
    };

    const profileRoute = {
        path: 'profile/:username',
        element: <ProfileBase/>,
        loader: async ({ params }) => {
            try {
                // Load attributes and profile picture of target user to display on profile page
                return await Promise.all([
                    getUser(params.username).then(user => user.UserAttributes),
                    Storage.get(`${params.username}-profilepic`),
                    getFriendsForUser(params.username),
                    getIncomingRequestsForUser(params.username),
                    getOutgoingRequestsForUser(params.username)
                ]).then(results => {
                    return {
                        attributes: results[0], 
                        profilePic: results[1], 
                        friendList: results[2],
                        incomingList: results[3],
                        outgoingList: results[4],
                        redirect: false
                    }
                })
            } catch(e) {
                return {
                    attributes: [], 
                    profilePic: '', 
                    friendList: [],
                    incomingList: [],
                    outgoingList: [],
                    redirect: true
                };
            }
        },
        children: [
            {index: true, element: <Navigate to='overview'/>},
            {path: 'posts', element: <Posts/>},
            {path: 'overview', element: <Overview/>},
            {path: 'friends', element: <Friends/>}
        ],
    };

    const settingsRoute = {
        path: 'settings',
        element: <SettingsPageBase/>,
        children: [
            {index: true, element: <Navigate to='profile'/>},
            {path: 'account', element: <AccountSettings/>},
            {path: 'profile', element: <ProfileSettings/>},
        ],
    };

    const friendRoute = {
        path: 'friend-zone',
        element: <FriendZoneBase/>,
        children: [
            {index: true, element: <Navigate to='requests'/>},
            {path: 'requests', element: <Requests/>},
            /* {path: 'recommendations', element: <Recommendations/>}, */
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
                {path: 'home', element: <Home/>},
                {path: 'make-post', element: <MakePost/>},
            ]
        }
    ]);
    
    return router;
}

export default routes;