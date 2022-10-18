import React, { useEffect, useState } from "react";
import { getToken } from "../helper/tokens";
import { Navigate } from "react-router-dom/dist";
import NavigationBar from "./NavigationBar";

function AuthRoute({ child }) {
    const token = getToken();
    const [content, setContent] = useState();

    useEffect(() => {
        const pageContent = (
            <div className="App">
                <NavigationBar setContent={setContent}/>
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