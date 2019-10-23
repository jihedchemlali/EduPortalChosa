import url from '../../confg-man';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class userService {

    request = (mail ) => {


        var headers = {
            'Content-Type': 'application/json',
        }

        axios.post(url+`/users/reset-password`, null ,{ params: {
                email:mail
            }})

            .then((response) => {
                return  toast.success("email has been sent!");
                ;
            }).then(res => {
            // if (res === false) {
            //     return Promise.resolve(null);
            // }
            // return Promise.resolve(res)
        })
            .catch(err => {
                toast.error("can't reset password!");
            })
            .catch((error) => {
                toast.error("can't reset password !");

            })
    }

    // verifyToken = (email,token ) => {
    //     var headers = {
    //         'Content-Type': 'application/json',
    //         'charset':'utf8'
    //
    //     }
    //
    //
    //      const user ={id:null,nom:"",prenom:"",email:email,status:"",'userPassword':'',birth_date:"",user_picture_file:"",adress:"",country:"",ville:"",phone:"",facebook_Id:"",google_Id:""};
    //
    //
    //     axios.post(url+`/users/verify-token?token=`+token, user, {headers} )
    //         // ,{ params: {
    //         //     token:token
    //         // }}
    //         .then((response) => {
    //             console.log('your id is ' + response.data.id);
    //             // this.resetPasswordresetPassword(password,response.data.id,)
    //             return  1;
    //
    //         }).then(res => {
    //
    //     })
    //         .catch(err => {
    //             return 2;
    //         })
    //         .catch((error) => {
    //             return 2;
    //
    //         })
    // }
    // resetPassword = (password , token ,email) => {
    //     console.log('the error is here ' + this.verifyToken(email,token));
    //
    //     // if (this.verifyToken(email,token) != null) {
    //         var headers = {
    //             'Content-Type': 'application/json',
    //             'charset':'utf8'
    //         }
    //
    //         console.log('this id function in resetpassword' + this.verifyToken(email , token,email))
    //         const user ={id:this.verifyToken(email , token,email),nom:"",prenom:"",email:email,status:"",userPassword:password,birth_date:"",user_picture_file:"",adress:"",country:"",ville:"",phone:"",facebook_Id:"",google_Id:""};
    //
    //
    //         axios.patch(url + `/users/reset-password`, user , {headers} )
    //
    //             .then((response) => {
    //                 console.log('this updated user is '  + response.data);
    //                 return toast.success("password updated!");
    //
    //             }).then(res => {
    //             // if (res === false) {
    //             //     return Promise.resolve(null);
    //             // }
    //             // return Promise.resolve(res)
    //         })
    //             .catch(err => {
    //                 toast.error("can't update password!");
    //             })
    //             .catch((error) => {
    //                 toast.error("can't update password !");
    //
    //             })
    //     // }
    //     // else    toast.error("can't update password dddddd!");
    //
    // }

    verifyToken2 = (password,email,token ) => {
        var headers = {
            'Content-Type': 'application/json',
            'charset':'utf8'

        }


        const user ={id:null,nom:"",prenom:"",email:email,status:"",'userPassword':'',birth_date:"",user_picture_file:"",adress:"",country:"",ville:"",phone:"",facebook_Id:"",google_Id:""};


        axios.post(url+`/users/verify-token?token=`+token, user, {headers} )
        // ,{ params: {
        //     token:token
        // }}
            .then((response) => {
                 this.resetPassword2(password,parseInt(response.data.id),email)
                return  parseInt(response.data.id);

            }).then(res => {

        })
            .catch(err => {
                return  toast.error("Token Expired!");;
            })
            .catch((error) => {
                return  toast.error("Token Expired!");

            })
    }
    resetPassword2 = (password , id ,email) => {
        console.log('the error is here ' + id);

        // if (this.verifyToken(email,token) != null) {
        var headers = {
            'Content-Type': 'application/json',
            'charset':'utf8'
        }

        // console.log('this id function in resetpassword' + this.verifyToken(email , token,email))
        const user ={id:id,nom:"",prenom:"",email:email,status:"",userPassword:password,birth_date:"",user_picture_file:"",adress:"",country:"",ville:"",phone:"",facebook_Id:"",google_Id:""};


        axios.patch(url + `/users/`+id+`/reset-password`, user , {headers} )

            .then((response) => {
                console.log('this updated user is '  + response.data);
                return toast.success("password updated!");

            }).then(res => {
            // if (res === false) {
            //     return Promise.resolve(null);
            // }
            // return Promise.resolve(res)
        })
            .catch(err => {
                toast.error("can't update password!");
            })
            .catch((error) => {
                toast.error("can't update password !");

            })
        // }
        // else    toast.error("can't update password dddddd!");

    }




}