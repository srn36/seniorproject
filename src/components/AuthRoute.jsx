import React, { useEffect, useState } from "react";
import { getToken } from "../helper/tokens";
import { Navigate, useLocation } from "react-router-dom/dist";
import NavigationBar from "./NavigationBar";
import smallLogo from '../smollogo.png';

function AuthRoute({ child }) {
    const token = getToken();
    const [content, setContent] = useState();
    const userInfo = useLocation().state?.userInfo;

    useEffect(() => {
        const pageContent = (
            <div className="App">
                <header className='App-header'>
                    <div style={{display: 'flex'}}>
                        <img src={smallLogo} height="50" width="auto" alt="logo"/>
                    </div>
                    <NavigationBar setContent={setContent} userInfo={userInfo}/>
                </header>
                <main>
                    {child}
                </main>
            </div>
        );
        setContent(((token != null) && (userInfo != null)) ? pageContent : <Navigate to='/login/' />);
    }, [child, token, userInfo]);

    return content;
}

export default AuthRoute