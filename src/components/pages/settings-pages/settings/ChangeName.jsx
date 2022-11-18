import React, { useState } from 'react';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeName(props) {
    const initialName = 'Current Username' /* fetch current name somehow */;
    const [name, setName] = useState(initialName);

    const formFields = [
        <TextField
            key='Name'
            placeholder='Enter new name'
            label='New Name'
            defaultValue={initialName}
            onChange={e => setName(e.target.value)}
        />
    ];

    const changeName = () => {
        window.alert('Not Implemented');
    };
    
    return (
        <SettingsForm
            title='Change Name'
            fields={formFields}
            onSubmit={changeName}
            submitLabel='Change Name'
            submitDisabled={name === initialName || name.length === 0}
        />
    );
}

export default ChangeName;