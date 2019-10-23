import url from '../../confg-man';
import axios from "axios";
import {toast} from "react-toastify";


export default class notificationService {


    _getNotifications = (userId) => {

        fetch(url + '/notifications?userId=' + userId + '&size=5&offset=1')
            .then(response => response.json())
            .then(json => {
                console.log ( 'arrayy of ' + Object.values(json));

                return Object.values(json); // check the return : array notifs
            });
    }



}