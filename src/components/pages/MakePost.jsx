import React from 'react';
import { useOutletContext } from 'react-router-dom';

function MakePost(props) {
    // eslint-disable-next-line
    const {userInfo} = useOutletContext();

    return (
        <form>
            <input type = "file" name = "upload" accept = "image/*"/>
        </form>
    );
}

export default MakePost;