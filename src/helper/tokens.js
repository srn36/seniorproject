export function storeToken(userLoginToken) {
    localStorage.setItem('token', userLoginToken);
}

export function getToken() {
    const storedToken = localStorage.getItem('token');
    return storedToken;
    //const userLoginToken = JSON.parse(storedToken);  
    //return userLoginToken?.token;
}