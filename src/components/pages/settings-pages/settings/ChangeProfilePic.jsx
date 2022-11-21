import React, { useEffect, useState } from 'react';
import SettingsForm from './SettingsForm';
import { Card } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

function ChangeProfilePic({ userInfo }) {
    const [initialProfilePic, setInitialProfilePic] = useState();
    const [profilePic, setProfilePic] = useState();
    const [picFile, setPicFile] = useState(null);

    useEffect(() => {
        Storage.get(`${userInfo.username}-profilepic`).then(url => {
            setInitialProfilePic(url);
            setProfilePic(url);
        });
    }, [userInfo.username]);
    
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPicFile(e.target.files[0]);
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        } else {
            setPicFile(null);
            setProfilePic(initialProfilePic);
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

    async function changeProfilePic() {
        const profilePicKey = `${userInfo.username}-profilepic`;
        try {
            await Storage.put(profilePicKey, picFile, {
                contentType: 'image/png',
            });
            Storage.get(`${userInfo.username}-profilepic`).then(url => {
                setInitialProfilePic(url);
                setProfilePic(url);
            });
            window.alert('Profile picture changed successfully');
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    };
    
    return (
        <SettingsForm
            title='Change Profile Picture'
            fields={formFields}
            onSubmit={_e => changeProfilePic()}
            submitLabel='Change Profile Picture'
            submitDisabled={profilePic === initialProfilePic}
        />
    );
}

export default ChangeProfilePic;