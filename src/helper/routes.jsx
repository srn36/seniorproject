import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import AuthRoute from '../components/AuthRoute';

function routes() {
    //ADD ROUTES FOR NEW PAGES BELOW
    //Wrap the 'element' for each page in an AuthRoute for access control
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AuthRoute child={<Home/>}/>,
            children: [],
        },
        {
            path: "/profile/", 
            element: <AuthRoute child={<Profile/>}/>,
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

export default routes