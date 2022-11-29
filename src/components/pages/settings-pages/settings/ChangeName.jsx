import React, { useState } from 'react';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';
import { Auth } from 'aws-amplify';

function ChangeName({ firstName, lastName }) {
    const [fName, setFName] = useState(firstName);
    const [lName, setLName] = useState(lastName);

    const formFields = [
        <TextField
            key='FirstName'
            label='First Name'
            defaultValue={firstName}
            onChange={e => setFName(e.target.value)}
        />,
        <TextField
            key='LastName'
            label='Last Name'
            defaultValue={lastName}
            onChange={e => setLName(e.target.value)}
        />
    ];

    const changeName = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const updateAttributes = {given_name: fName, family_name: lName};
        Auth.updateUserAttributes(user, updateAttributes).then(() => {
            window.alert('Successfully updated name');
            window.location.reload();
        }).catch(e => 
            window.alert(`Update failed with reason: ${e}`)   
        );
    };
    
    return (
        <SettingsForm
            title='Change Name'
            fields={formFields}
            onSubmit={changeName}
            submitLabel='Change Name'
            submitDisabled={(fName === firstName && lName === lastName) || fName.length === 0 || lName.length === 0}
        />
    );
}

export default ChangeName;