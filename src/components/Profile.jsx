import React, { useState } from "react";
import { useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { getToken } from "../helper/tokens";
import { Navigate } from "react-router-dom/dist";

function Profile(props) {
    const [content, setContent] = useState();
    const loginToken = getToken();

    useEffect(() => {
        setContent(
            <div>
                <NavigationBar setContent={setContent} />
                <h4>Profile Page</h4>
            </div>
        );
    }, []);
    
    return (loginToken == null) ? <Navigate to='/login/' /> : content;
}

export default Profile;