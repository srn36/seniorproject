import React, { useEffect, useMemo, useState } from "react";
import { getToken } from "../helper/tokens";
import { useNavigate, useLocation } from "react-router-dom/dist";
import { fetchUserInfoFromToken } from "../helper/api-calls/user";
import NavigationBar from "./NavigationBar";
import smallLogo from '../smollogo.png';

function AuthRoute({ renderChild }) {   
    const navigate = useNavigate();
    const [content, setContent] = useState();
    
    const token = getToken();
    const stateUserInfo = useLocation().state?.userInfo;
    const userInfo = useMemo(() => {
        return stateUserInfo || (!!token && /*await*/ fetchUserInfoFromToken(token));
    }, [token, stateUserInfo]);

    useEffect(() => {
        if(!token || !userInfo) {
            navigate('/login/');
        }
    }, [token, userInfo, navigate]);  

    const pageContent = useMemo(() => {
        return (
            <div className="App">
                <header className='App-header'>
                    <div style={{display: 'flex'}}>
                        <img src={smallLogo} height="50" width="auto" alt="logo"/>
                    </div>
                    <NavigationBar setContent={setContent} userInfo={userInfo}/>
                </header>
                <main>
                    {renderChild(userInfo)}
                </main>
            </div>
        );
    }, [renderChild, userInfo]);

    useEffect(() => {
        setContent(pageContent);
    }, [pageContent]);

    return content;
}

export default AuthRoute