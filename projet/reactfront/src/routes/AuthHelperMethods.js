import decode from 'jwt-decode';
import url from '../confg-man';



export default class AuthHelperMethods {

    // Initializing important variables

    login = (email, userPassword) => {
        
        // Get a token from api server using the fetch api
        return this.fetch(url+`/authenticate/signin`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                userPassword
            })
        }).then(res => {
            this.setToken(res.token) // Setting the token in localStorage

            let jwt = res.token;
            let jwtData = jwt.split('.')[1];
            let decodedJwtJsonData =window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            localStorage.setItem("id_user",decodedJwtData.id)
            // localStorage.setItem("oldPassword",userPassword);
            localStorage.setItem("email",email);
            localStorage.setItem("role_user",decodedJwtData.roles);

            return Promise.resolve(res);
        })
    }

    parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    }

    setToken = (idToken) => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout = () => {
        // Clear user token and profile data from localStorage
        if (localStorage.getItem('role_user')){
            localStorage.removeItem('id_center');
        }
        localStorage.removeItem('id_token');
        localStorage.removeItem('id_user');
        localStorage.removeItem('email');
        // localStorage.removeItem('oldPassword');
        localStorage.removeItem('role_user');

    }

    getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        let answer = decode(this.getToken());
        console.log("Recieved answer!");
        return answer;
    }

    fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus = (response) => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}