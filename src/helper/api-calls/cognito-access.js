import { Auth, API } from 'aws-amplify';

export async function searchUsers(filterText = '') {
    const apiName = 'AdminQueries';
    const path = '/listUsers';
    const myInit = {
        queryStringParameters: {
            Filter: `${filterText}`,
            UserPoolId: 'us-east-1_gameon'
        },
        headers: {
          'Content-Type' : 'application/x-amz-json-1.1',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    const { ...rest } = await API.get(apiName, path, myInit);
    return rest;
}

export async function getUser(username) {
    const apiName = 'AdminQueries';
    const path = '/getUser';
    const myInit = {
        queryStringParameters: {
            username: `${username}`,
            UserPoolId: 'us-east-1_gameon'
        },
        headers: {
          'Content-Type' : 'application/x-amz-json-1.1',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    const { ...rest } = await API.get(apiName, path, myInit);
    console.log(rest);
    return rest;
}