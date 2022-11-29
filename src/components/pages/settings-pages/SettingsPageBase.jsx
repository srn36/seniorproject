import React from 'react';
import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import PageWithNavTabs from '../base/PageWithNavTabs';

function SettingsPageBase(props) {
    const {userInfo} = useOutletContext();
    const cognitoInfo = useLoaderData();
    const attributes = cognitoInfo.attributes;
    
    return(
        <PageWithNavTabs  tabs={['Account', 'Profile']}>
            <Outlet context={{userInfo: userInfo, attributes: attributes}}/>
        </PageWithNavTabs>
    );
}

export default SettingsPageBase;