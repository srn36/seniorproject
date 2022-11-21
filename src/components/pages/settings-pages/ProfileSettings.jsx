import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ChangeBio from './settings/ChangeBio';
import ChangeBirthday from './settings/ChangeBirthday';
import ChangeName from './settings/ChangeName';
import ChangeProfilePic from './settings/ChangeProfilePic';

function ProfileSettings(props) {
    const {userInfo} = useOutletContext();

    return (
        <div className='settings-content'>
            <h2>Profile Settings</h2>
            <ChangeProfilePic userInfo={userInfo}/>
            <ChangeName/>
            <ChangeBirthday/>
            <ChangeBio/>
        </div>
    );
}

export default ProfileSettings;