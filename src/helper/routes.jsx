import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import App from '../App';
import Login from '../components/Login';

function routes() {
    //ADD ROUTES FOR NEW PAGES BELOW
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
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