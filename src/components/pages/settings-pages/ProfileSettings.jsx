import React from 'react';
import ChangeBio from './settings/ChangeBio';
import ChangeBirthday from './settings/ChangeBirthday';
import ChangeName from './settings/ChangeName';
import ChangeProfilePic from './settings/ChangeProfilePic';

function ProfileSettings(props) {
    return (
        <div className='settings-content'>
            <h2>Profile Settings</h2>
            <ChangeProfilePic/>
            <ChangeName/>
            <ChangeBirthday/>
            <ChangeBio/>
        </div>
    );
}

export default ProfileSettings;