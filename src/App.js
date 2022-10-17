import routes from './helper/routes';
import { getToken } from './helper/tokens';
import { fetchUserInfoFromToken } from './helper/apiCalls';

function App() {
    let props = {};
    //Fetch user info if they have a login token in their cookies
    const userLoginToken = getToken();
    if(userLoginToken != null) {
        props.loginToken = userLoginToken;
        props.userInfo = /*await*/ fetchUserInfoFromToken(userLoginToken);
    }
    const router = routes(props);
    return router;
}

export default App;