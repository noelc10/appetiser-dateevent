export function login(creds) {
    return new Promise((resolve, reject) => {
        axios.post('/api/v1/auth/login', creds)
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject("Incorrect E-mail or Password");
        });
    });
}

export function getLocalUser() {
    const userString = localStorage.getItem('appetiser-dateevent.user');

    if (!userString) {
        return null;
    }

    return userString;
}
