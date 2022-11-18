import React, { useState } from 'react';
import SettingsForm from './SettingsForm';

function ChangeProfilePic(props) {
    const initialProfilePic = null/* fetch ProfilePic somehow */;
    const [profilePic, setProfilePic] = useState(initialProfilePic);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const formFields = [
        <label key='Profile Pic'>
            <input
                type='file'
                name='upload'
                accept='image/*'
                onChange={onImageChange}
            />  
        </label>
    ];

    const changeProfilePic = () => {
        window.alert('Not Implemented');
    };
    
    return (
        <SettingsForm
            title='Change Profile Picture'
            fields={formFields}
            onSubmit={changeProfilePic}
            submitLabel='Change Profile Picture'
            submitDisabled={profilePic === initialProfilePic}
        />
    );
}

export default ChangeProfilePic;