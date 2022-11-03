import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import Profile from '../components/pages/Profile';
import PageBase from '../components/pages/base/PageBase';
import Chat from '../components/pages/Chat';
import Requests from '../components/pages/Requests';

function routes() {
    //ADD ROUTES FOR NEW PAGES BELOW
    //Wrap the 'element' for each page in an PageBase for access control
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/home/"/>,
            children: [],
        },
        {
            path: "/home/",
            element: <PageBase renderChild={(info) => <Home userInfo={info}/>}/>,
            children: [],
        },
        {
            path: "/profile/:username", 
            element: <PageBase renderChild={(info) => <Profile userInfo={info}/>}/>,
            children: [],
        },
        {
            path: "/chat/", 
            element: <PageBase renderChild={(info) => <Chat userInfo={info}/>}/>,
            children: [],
        },
        {
            path: "/requests/", 
            element: <PageBase renderChild={(info) => <Requests userInfo={info}/>}/>,
            children: [],
        }
    ]);
    return router;
}

export default routes;