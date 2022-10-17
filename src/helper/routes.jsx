import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import Home from '../components/Home';
import Login from '../components/Login';

function routes(props) {
    //ADD ROUTES FOR NEW PAGES BELOW
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home {...props}/>,
            children: [],
        },
        {
            /*
            probably going to remove this path and handle login page from home page props.
            that way users can't access the login page while logged in.
            */
            path: "/login/", 
            element: <Login />,
            children: [],
        }
    ]);
    return <RouterProvider router={router} />
}

export default routes