import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import Home from '../components/Home';
import Login from '../components/Login';

function routes() {
    //ADD ROUTES FOR NEW PAGES BELOW
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [],
        },
        {
            path: "/login/",
            element: <Login />,
            children: [],
        }
    ]);
    return <RouterProvider router={router} />
}

export default routes