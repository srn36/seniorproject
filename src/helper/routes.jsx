import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Profile from '../components/pages/Profile';
import AuthRoute from '../components/pages/base/AuthRoute';
import Chat from '../components/pages/Chat';
import Requests from '../components/pages/Requests';

function routes() {
    //ADD ROUTES FOR NEW PAGES BELOW
    //Wrap the 'element' for each page in an AuthRoute for access control
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/home/"/>,
            children: [],
        },
        {
            path: "/home/",
            element: <AuthRoute renderChild={(info) => <Home userInfo={info}/>}/>,
            children: [],
        },
        {
            path: "/profile/:username", 
            element: <AuthRoute renderChild={(info) => <Profile userInfo={info}/>}/>,
            children: [],
        },
        {
            path: "/chat/", 
            element: <AuthRoute renderChild={(info) => <Chat userInfo={info}/>}/>,
            children: [],
        },
        {
            path: "/requests/", 
            element: <AuthRoute renderChild={(info) => <Requests userInfo={info}/>}/>,
            children: [],
        },
        {
            path: "/login/", 
            element: <Login/>,
            children: [],
        },
    ]);
    return router;
}

export default routes;