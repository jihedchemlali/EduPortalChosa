import url from '../../confg-man';
import axios from "axios";


export default class searchService {

    _getdataSearch = (searchTerm) => {

        fetch(url + ' centers/search?name=' + searchTerm + '&offset=0&size=0')
            .then(response => response.json())
            .then(json => {

                return Object.values(json); // check the return : array notifs
            });
    }

}