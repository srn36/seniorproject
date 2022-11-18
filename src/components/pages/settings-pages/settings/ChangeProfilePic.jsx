import { Card } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import SettingsForm from './SettingsForm';
import mockPFP from '../../../../logo192.png';

function ChangeProfilePic(props) {
    const initialProfilePic = mockPFP/* fetch ProfilePic somehow */;
    const [profilePic, setProfilePic] = useState(initialProfilePic);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const formFields = [
        <Card 
            key='Current Pic'
            className='current-pic'
        >
            <img src={profilePic} alt='No Profile Pic'/>
        </Card>,
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