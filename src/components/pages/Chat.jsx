import React from 'react';

function Chat(props) {
    const requestBody = JSON.stringify({
        'Filter': '',
        'Limit': 1000,
        'UserPoolId': 'us-east-1_gameon',
    });
    
    const users = fetch('https://cognito-idp.us-east-1.amazonaws.com/', {
        method: 'POST',
        headers: {
            'x-amz-target': 'AWSCognitoIdentityProviderService.ListUsers',
            'Content-Type': 'application/x-amz-json-1.1',
        },
        body: requestBody,
    }).then(response => console.log(response)).then(response => response.json());
    console.log(users);
    
    return (
        <h4>Chat Page</h4>
    );
}

export default Chat;