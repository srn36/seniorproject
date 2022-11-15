import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

function PageBase(props) {
    const userInfo = useOutletContext();

    return (
        <>
            <Outlet context={{'userInfo': userInfo.data}}/>
        </>
    );
}

export default PageBase;