import React, { useState } from 'react';
import { TextAreaField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeBirthday(props) {
    const initialBirthday = 'Birthday' /* fetch birthday somehow */;
    const [birthday, setBirthday] = useState(initialBirthday);

    const formFields = [
        <TextAreaField
            key='Birthday'
            label='Edit Birthday'
            placeholder='Input Birthday'
            defaultValue={initialBirthday}
            onChange={(e) => setBirthday(e.target.value)}
        />
    ];

    const changeBirthday = () => {
        window.alert('Not Implemented');
    };
    
    return (
        <SettingsForm
            title='Change Birthday'
            fields={formFields}
            onSubmit={changeBirthday}
            submitLabel='Change Birthday'
            submitDisabled={birthday === initialBirthday}
        />
    );
}

export default ChangeBirthday;