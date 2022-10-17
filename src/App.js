import routes from './helper/routes';
import { getToken } from './helper/tokens';
import { fetchUserInfoFromToken } from './helper/apiCalls';
import { RouterProvider } from 'react-router-dom';
import Login from './components/Login';

function App(props) {
    let newProps = {...props};
    //Fetch user info if they have a login token in their cookies
    const userLoginToken = getToken();
    if(userLoginToken != null) {
        newProps.loginToken = userLoginToken;
        newProps.userInfo = /*await*/ fetchUserInfoFromToken(userLoginToken);
    }
    const router = routes(newProps);
    if(userLoginToken != null) {
        return <RouterProvider router={router} />;
    }
    else {
        return <Login {...newProps} />;
    }
    
}

export default App;