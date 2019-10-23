import url from '../../confg-man';
import axios from "axios";


export default class actualityService {

    deleteactuality = (idActuality) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        axios.delete(url + `/actualities/` + idActuality)

            .then(res => {
                if (res === false) {
                    return alert("Sorry error : deleting actuality!");
                }
                return Promise.resolve(res);
            })
            .catch(err => {
                alert(err);
            })
    }

    updateactuality = (idActuality,idchild, commentaire) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }
        const actuality = {
            commentaire: commentaire,
            child: idchild

        };

        axios.patch(url+`/actualities/`+idActuality,  actuality)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't update actuality !");
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