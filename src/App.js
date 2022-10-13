/*
 * Login authentication adapted from tutorial by Joe Morgan
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 */

import { useMemo } from 'react';
import routes from './helper/routes';
//import useToken from './helper/useToken';

//Unfinished... trying to figure out how to force the user to login before accessing any other pages
function App() {
    //const { token, setToken } = useToken();
    const router = useMemo(() => {
        console.log('new router');
        return routes(/*token*/"fake token to demo that routing works", /*setToken*/ token => console.log(token));
    }, [/*token, setToken*/]);
    return router;
}

export default App;
