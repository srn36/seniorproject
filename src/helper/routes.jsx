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
            Definitely going to remove this path and handle login page from home page props so users can't access the login page while logged in.
            Keeping it here as an example right now.
            */
            path: "/login/", 
            element: <Login />,
            children: [],
        }
    ]);
    return <RouterProvider router={router} />
}

export default routes