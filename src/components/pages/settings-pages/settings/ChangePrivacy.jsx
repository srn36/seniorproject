import React, { useState } from 'react';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';
import { Auth } from 'aws-amplify';

function ChangePrivacy({ currentPrivacy }) {
    const [privacy, setPrivacy] = useState(currentPrivacy);

    const formFields = [
        <RadioGroupField
            key='RadioGroup'
            label='Privacy'
            value={privacy}
            onChange={e => setPrivacy(e.target.value)}
        >
            <Radio value='Private'>Private</Radio>
            <Radio value='Public'>Public</Radio>
        </RadioGroupField>
    ];
    
    const changePrivacy = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const updateAttributes = {'custom:privacy': privacy};
        Auth.updateUserAttributes(user, updateAttributes).then(() => {
            window.alert('Privacy updated successfully');
            window.location.reload();
        }).catch(e => window.alert(`Error updating privacy: ${e}`));
    }

    return (
        <SettingsForm
            title='Change Privacy'
            fields={formFields}
            onSubmit={changePrivacy}
            submitLabel='Update Privacy'
            submitDisabled={privacy === currentPrivacy}
        />
    );
}

export default ChangePrivacy;