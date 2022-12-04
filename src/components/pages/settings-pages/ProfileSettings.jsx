import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ChangeProfilePic from './settings/ChangeProfilePic';
import ChangeName from './settings/ChangeName';
import ChangeBirthday from './settings/ChangeBirthday';
import ChangePrivacy from './settings/ChangePrivacy';
import ChangeBio from './settings/ChangeBio';

function ProfileSettings(props) {
    const {userInfo, attributes} = useOutletContext();
    const {given_name, family_name, birthdate} = attributes;
    const privacy = attributes['custom:privacy'];
    const bio = attributes['custom:bio'];

    return (
        <div className='settings-content'>
            <h2>Profile Settings</h2>
            <ChangeProfilePic userInfo={userInfo}/>
            <ChangeName firstName={given_name} lastName={family_name}/>
            <ChangeBirthday birthdate={birthdate}/>
            <ChangePrivacy currentPrivacy={privacy}/>
            <ChangeBio currentBio={bio}/>
        </div>
    );
}

export default ProfileSettings;