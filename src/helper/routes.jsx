import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import Profile from '../components/pages/Profile';
import PageBase from '../components/pages/base/PageBase';
import Chat from '../components/pages/Chat';
import Requests from '../components/pages/Requests';

function routes() {
    //Add routes for new pages to createRoutes
    //all you need is the desired path and the page component
    const createRoutes = {
        "/home/": Home,
        "/profile/:username": Profile,
        "/chat/": Chat,
        "/requests/": Requests,
    };


    const autoRoutes = Object.keys(createRoutes).map(path => {
        return (
            {
                'path': path,
                element: <PageBase children={createRoutes[path]}/>,
                children: [],
            }
        );
    })
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/home/"/>,
            children: [],
        },
        ...autoRoutes
    ]);
    
    return router;
}

export default routes;