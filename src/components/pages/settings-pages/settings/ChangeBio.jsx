import React, { useState } from 'react';
import { TextAreaField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeBio(props) {
    const initialBio = 'Bio' /* fetch bio somehow */;
    const [bio, setBio] = useState(initialBio);

    const formFields = [
        <TextAreaField
            key='Bio'
            label='Edit Bio'
            placeholder='Input Bio'
            defaultValue={initialBio}
            onChange={(e) => setBio(e.target.value)}
        />
    ];

    const changeBio = () => {
        window.alert('Not Implemented');
    };
    
    return (
        <SettingsForm
            title='Change Bio'
            fields={formFields}
            onSubmit={changeBio}
            submitLabel='Change Bio'
            submitDisabled={bio === initialBio}
        />
    );
}

export default ChangeBio;