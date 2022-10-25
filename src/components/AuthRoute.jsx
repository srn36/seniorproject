import React, { useEffect, useMemo } from "react";
import { getToken } from "../helper/tokens";
import { useNavigate, useLocation } from "react-router-dom/dist";
import { fetchUserInfoFromToken } from "../helper/api-calls/user";
import NavigationDropdown from "./NavigationDropdown";
import smallLogo from '../smollogo.png';

function AuthRoute({ renderChild }) {   
    const token = getToken();
    const stateUserInfo = useLocation().state?.userInfo;
    const userInfo = useMemo(() => {
        return stateUserInfo || (!!token && /*await*/ fetchUserInfoFromToken(token));
    }, [token, stateUserInfo]);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(!token || !userInfo) {
            navigate('/login/');
        }
    }, [token, userInfo, navigate]);  

    return useMemo(() => {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={smallLogo} height="50" width="auto" alt="logo"/>
                    <NavigationDropdown navigate={navigate} userInfo={userInfo}/>
                </header>
                <main className='App-main'>
                    {renderChild(userInfo)}
                </main>
            </div>
        );
    }, [renderChild, userInfo, navigate]);
}

export default AuthRoute;