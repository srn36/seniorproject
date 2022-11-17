import { Divider } from '@aws-amplify/ui-react';
import React from 'react';

function ProfileSettings(props) {
    /**
     * SETTINGS TO INCLUDE:
     * 
     * Change name (not username)
     * 
     * Change age
     * 
     * Change profile pic
     * 
     * Edit bio
     * 
     */

    return (
        <div className='settings-content'>
            <h2>Profile Settings</h2>
            <Divider/>
        </div>
    );

}

export default ProfileSettings;