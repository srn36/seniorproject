import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';

function routes(props) {
    //ADD ROUTES FOR NEW PAGES BELOW
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home {...props}/>,
            children: [],
        },
        {
            path: "/profile/", 
            element: <Profile />,
            children: [],
        },
    ]);
    return router;
}

export default routes