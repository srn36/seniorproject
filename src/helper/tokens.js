export function storeToken(userLoginToken) {
    sessionStorage.setItem('token', JSON.stringify(userLoginToken));
}

export function getToken() {
    const storedToken = sessionStorage.getItem('token');
    const userLoginToken = JSON.parse(storedToken);
    return userLoginToken?.token;
}