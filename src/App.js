import routes from './helper/routes';
//import { getToken } from './helper/tokens';

function App() {
    //Check if user is logged in
    let props = {};
    /*
    //Fetch user info if they have a login token in their cookies
    userLoginToken = getToken();
    if(userLoginToken != null) {
        //This probably needs extra code to handle invalid tokens or unexpected http responses
        props.loginToken = userLoginToken;
        props.userInfo = fetch('token validation service', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({'token': userLoginToken})
        }).then(data => 
            data.json()
        );
    }
    */
    //props.userInfo = {username: 'test', password: 'test'};
    const router = routes(props);
    return router;
}

export default App;