import React, { useState } from 'react';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangePrivacy(props) {
    const initialPrivacy = /* Somehow get user Privacty setting */'Public';
    const [privacy, setPrivacy] = useState(initialPrivacy);

    const formFields = [
        <RadioGroupField
            key='RadioGroup'
            label='Privacy'
            name='privacy'
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
        >
            <Radio value='Private'>Private</Radio>
            <Radio value='Public'>Public</Radio>
        </RadioGroupField>
    ];
    
    const changePrivacy = () => {
        window.alert('Not Implemented');
    }

    return (
        <SettingsForm
            title='Change Privacy'
            fields={formFields}
            onSubmit={changePrivacy}
            submitLabel='Update Privacy'
            submitDisabled={privacy === initialPrivacy}
        />
    );
}

export default ChangePrivacy;