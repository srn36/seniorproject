import React, { useEffect, useMemo, useState } from "react";
import { getToken } from "../helper/tokens";
import { fetchUserInfoFromToken } from "../helper/apiCalls";
import { Navigate } from "react-router-dom/dist";
import NavigationBar from "./NavigationBar";

function AuthRoute({ child }) {
    const token = getToken();
    const [content, setContent] = useState();
    const username = useMemo(() => {
        return fetchUserInfoFromToken(token).username;
    }, [token]);

    useEffect(() => {
        const pageContent = (
            <div className="App">
                <header className='App-header'>
                    <NavigationBar setContent={setContent} username={username}/>
                </header>
                <main>
                    {child}
                </main>
            </div>
        );
        setContent((token != null) ? pageContent : <Navigate to='/login/' />);
    }, [child, token, username]);

    return content;
}

export default AuthRoute