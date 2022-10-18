import React, { useState } from "react";
import { useEffect } from "react";
import NavigationBar from "./NavigationBar";

function Profile(props) {
    const [content, setContent] = useState();

    useEffect(() => {
        setContent(
            <div>
                <NavigationBar setContent={setContent} />
                <h4>Profile Page</h4>
            </div>
        );
    }, []);
    
    return content;
}

export default Profile;