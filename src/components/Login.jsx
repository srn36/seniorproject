import React, { useState, useMemo, useEffect } from 'react';
import { getToken, storeToken } from '../helper/tokens';
import { fetchLoginTokenFromCredentials, fetchUserInfoFromToken } from '../helper/api-calls/user';
import { useNavigate, useLocation } from 'react-router-dom/dist';
import backg from '../BG.jpeg';

<body background={backg} />

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();
    
    const token = getToken();
    const stateUserInfo = useLocation().state?.userInfo;
    const userInfo = useMemo(() => {
        return stateUserInfo || (!!token && /*await*/ fetchUserInfoFromToken(token));
    }, [token, stateUserInfo]);

    useEffect(() => {
        if(token && userInfo) {
            navigate('/', {state: {userInfo: userInfo} });
        }
    }, [token, userInfo, navigate]); 

    useEffect(() => {
        const submitCredentials = /*async*/ e => {
            e.preventDefault();
            const credentials = {
                'username': username,
                'password': password
            };
            const loginToken = /*await*/ fetchLoginTokenFromCredentials(credentials);
            storeToken(token);
            const userInfo = /*await*/ fetchUserInfoFromToken(loginToken);
            navigate('/', {state: {userInfo: userInfo} });
        }

        setContent(
            <div className='center'>
                <h1>LOGIN</h1>
                <form onSubmit={submitCredentials}>    
                    <div>
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={e => setUsername(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        );
    }, [username, password, navigate, token]);

    return content;
}

export default Login;