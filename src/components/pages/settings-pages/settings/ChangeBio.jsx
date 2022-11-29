import React, { useState } from 'react';
import { TextAreaField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';
import { Auth } from 'aws-amplify';

function ChangeBio({ currentBio }) {
    const [bio, setBio] = useState(currentBio);

    const formFields = [
        <TextAreaField
            key='Bio'
            label='Edit Bio'
            placeholder='Input Bio'
            defaultValue={currentBio}
            onChange={(e) => setBio(e.target.value)}
        />
    ];

    const changeBio = async () => {
        const user = await Auth.currentAuthenticatedUser();
        let updateAttributes = {'custom:bio': bio};
        Auth.updateUserAttributes(user, updateAttributes).then(() => {
            window.alert('Bio updated successfully');
            window.location.reload();
        }).catch(e => window.alert(`Error updating bio: ${e}`));
    };
    
    return (
        <SettingsForm
            title='Change Bio'
            fields={formFields}
            onSubmit={changeBio}
            submitLabel='Change Bio'
            submitDisabled={bio === currentBio}
        />
    );
}

export default ChangeBio;