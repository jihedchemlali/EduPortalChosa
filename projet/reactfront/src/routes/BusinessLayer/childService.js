import url from '../../confg-man';
import axios from "axios";
import centerService from "./centerService";


export default class childService {

    //change the center id
    //
    //
    //
    centerService=new centerService();

    Adhr = (child, idcenter) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }

        child.status="ONLOAD";
        axios.patch(url+`/children/`+child.id+`/centers/?centerId=`+idcenter,  child)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't sub child !");
            }
            return Promise.resolve(res)
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })
    }

    retirerChild = (child) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }

        child.status="NEW";
        child.center=null;
        axios.patch(url+`/children/`+child.id+`/centers`,  child)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't sub child !");
            }
            return Promise.resolve(res)
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })
    }



    //////////////////////////////Centre//////////////////


      AccepterAdhr = (child ) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }

        child.status="ACCEPTED";
        axios.patch(url+`/children/`+child.id+`?notify=notify&centerId=`+localStorage.getItem('id_center'),  child)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't sub child !");
            }
            return Promise.resolve(res)
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })
    }
    refuserAdhr = (child) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }

        child.status="REFUSED";
        axios.patch(url+`/children/`+child.id+`?notify=notify`,  child)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't sub child !");
            }
            return Promise.resolve(res)
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })
    }
    retirerSuivi = (child) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }

        child.status="IGNORED";
        axios.patch(url+`/children/`+child.id+`/centers/?centerId=`+localStorage.getItem('id_center'),  child)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't sub child !");
            }
            return Promise.resolve(res)
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })
    }

}