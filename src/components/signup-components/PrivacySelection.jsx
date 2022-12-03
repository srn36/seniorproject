import React from 'react';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

function PrivacySelection(props) {

    return (
        <>
            <h3>Set Privacy</h3>
            <RadioGroupField
                key='PrivacyRadioGroup'
                name='custom:privacy'
                defaultValue='Private'
            >
                <Radio value='Private'>Private</Radio>
                <Radio value='Public'>Public</Radio>
            </RadioGroupField>
        </>
    );
}

export default PrivacySelection;