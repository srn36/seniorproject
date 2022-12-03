import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Divider, TextAreaField, TextField } from '@aws-amplify/ui-react';

function Overview(props) {
    const {attributes} = useOutletContext();
    let attributeMap = {};
    attributes.forEach(attribute => 
        attributeMap[attribute.Name] = attribute.Value
    );

    const name = attributeMap.given_name + ' ' + attributeMap.family_name;
    const bio = attributeMap['custom:bio'];

    return (
        <div className='profile-overview'>
            <h3>Overview</h3>
            <div className='overview'>
                <TextField
                    label='Name:'
                    defaultValue={name}
                    disabled 
                />
                <TextAreaField
                    label='Bio:'
                    defaultValue={bio}
                    disabled
                />
            </div>
            <Divider/>
            <h3>Games</h3>
        </div>
    );
}

export default Overview;