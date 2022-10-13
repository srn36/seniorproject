import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import Home from '../components/Home';
import Login from '../components/Login';

function routes(token, setToken) {
    if(!token){
        const loginRouter = createBrowserRouter([
            {
                path: "/",
                element: <Login setToken={setToken}/>,
                children: [],
            }
        ]);
        return <RouterProvider router={loginRouter} />
    }
    else {
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
}

export default routes