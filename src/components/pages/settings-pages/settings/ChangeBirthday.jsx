import React, { useState } from 'react';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeBirthday(props) {
    const [birthday, setBirthday] = useState('');

    const birthdayInput = (
        <TextField
            key='Birthday'
            label='Edit Birthday'
            placeholder='MM/DD/YYYY'
            onChange={(e) => setBirthday(e.target.value)}
        />
    )

    const formFields = [
        birthdayInput
    ];

    const changeBirthday = () => {
        window.alert('Not Implemented');
    };

    const validateBirthday = () => {
        const avoidEmojis = [...birthday];
        if(!(avoidEmojis[2] === '/' && avoidEmojis[5] === '/')) {
            return false;
        }

        // Month validation
        const month = parseInt(birthday.substring(0,2));
        if(isNaN(month) || month < 1 || month > 12) {
            return false;
        }

        // Year validation
        const year = parseInt(birthday.substring(6));
        if(isNaN(year) || year < 1900 || year > 2022) { // Fix upper limit to dynamic current year
            return false;
        }

        // Date validation
        const day = parseInt(birthday.substring(3,5));
        if(isNaN(day) || day < 1 || day > 31) { // Fix date validation
            return false;
        }

        return true;
    }
    
    return (
        <SettingsForm
            title='Change Birthday'
            fields={formFields}
            onSubmit={changeBirthday}
            submitLabel='Update Birthday'
            submitDisabled={!validateBirthday()}
        />
    );
}

export default ChangeBirthday;