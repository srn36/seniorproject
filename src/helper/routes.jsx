import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';

function routes() {
    //ADD ROUTES FOR NEW PAGES BELOW
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [],
        },
        {
            path: "/profile/", 
            element: <Profile />,
            children: [],
        },
        {
            path: "/login/", 
            element: <Login />,
            children: [],
        },
    ]);
    return router;
}

export default routes