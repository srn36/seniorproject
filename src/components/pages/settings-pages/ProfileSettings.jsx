import React from 'react';
import ChangeBio from './settings/ChangeBio';
import ChangeName from './settings/ChangeName';

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
            <ChangeName/>
            <ChangeBio/>
        </div>
    );

}

export default ProfileSettings;