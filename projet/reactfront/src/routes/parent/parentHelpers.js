import decode from 'jwt-decode';
import url from '../../confg-man';
import axios from 'axios';



export default class parentHelpers {

    // Initializing important variables

    getParent = (id_user) => {


       /* return this.fetch(url+`/users/`+id_user, {
            method: 'GET',

        }).then(res => {
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })*/
        axios.get(url+`/users/`+id_user )
            .then(res => {
                if (res === false) {
                    return alert("Error  !");
                }
                //this.props.history.replace('/parentPanel');
            })
            .catch(err => {
                alert(err);
            })

    }



    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }
    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
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