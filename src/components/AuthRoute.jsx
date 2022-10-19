import React, { useEffect, useState } from "react";
import { getToken } from "../helper/tokens";
import { fetchUserInfoFromToken } from "../helper/apiCalls";
import { Navigate } from "react-router-dom/dist";
import NavigationBar from "./NavigationBar";

function AuthRoute({ child }) {
    const token = getToken();
    const [content, setContent] = useState();

    useEffect(() => {
        const getUsername = () => {
            return fetchUserInfoFromToken(token).username;
        };

        const pageContent = (
            <div className="App">
                <header className='App-header'>
                    <NavigationBar setContent={setContent} username={getUsername()}/>
                </header>
                <main>
                    {child}
                </main>
            </div>
        );
        setContent((token != null) ? pageContent : <Navigate to='/login/' />);
    }, [child, token]);

    return content;
}

export default AuthRoute