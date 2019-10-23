import React , { Component } from 'react';
import  '../assets/front/css/bootstrap.css';
import  '../assets/front/css/styles.css';
import AuthHelperMethods from './AuthHelperMethods'
import userService from "./BusinessLayer/userService";
import {toast, ToastContainer} from "react-toastify";
import defaultPicture from "../assets/espace-parent/img/photoProfilParent.png";

class reinitPassword extends Component {

    Auth = new AuthHelperMethods();
    userService = new userService();

    constructor(props) {

        super(props)
        // const params = new URLSearchParams(this.props.location.search);
        // const tokenParsed = params.get('token');
        // const emailParsed = params.get('email');
        // console.log ('in const' + this.userService.verifyToken(emailParsed,tokenParsed));
        this.state = {
            userPassword: "",
            password: "",
            idUser:'',
            email:''
        }




    }

    _handleChange = (e) => {
         console.log('on change' + this.state.idUser + 'llll' + this.state.email);
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        const params = new URLSearchParams(this.props.location.search);
        const tokenParsed = params.get('token');
        const emailParsed = params.get('email');

        console.log("password" + this.state.password + " token" + tokenParsed + emailParsed);
        if (this.state.password != this.state.userPassword){
            toast.error('check passwords','pasword needs to be confirmed');
        }
        else {
            this.userService.verifyToken2(this.state.password, emailParsed , tokenParsed)
        }
        // if (thi)

        // this.Auth.login(this.state.username, this.state.password)
        //     .then(res => {
        //         if (res === false) {
        //             return alert("Sorry those credentials don't exist!");
        //         }
        //         if (localStorage.getItem('role_user') =='ROLE_FORMATION' ){
        //
        //             this.props.history.replace('/centrePanel');
        //
        //         }
        //         else{
        //
        //             this.props.history.replace('/parentPanel');
        //
        //         }
        //     })
        //     .catch(err => {
        //         alert(err);
        //     })
    }




    componentWillMount() {
        /* Here is a great place to redirect someone who is already logged in to the protected route */
        if (this.Auth.loggedIn())
            this.props.history.replace('/');


    }

    render(){

        return (
            <div className="login">
                <ToastContainer />

                <div className="container-login">
                    <div className="login-left">
                    </div>
                    <div className="wrap-login">
                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-xl-6 col-lg-8 col-md-6 col-sm-8 col-10">
                                <div className="row ">
                                    <div className="col-md-12 d-flex justify-content-center mb-5 ">
                                        <div className="logoLogin">
                                            <img src={require('../assets/front/img/chosa-color.svg')} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <form >
                                <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="password" name="password" className="form-control" id="validationEmail"  aria-describedby="input-group-prepend" placeholder="Nouvelle mot de passe" required  onChange={this._handleChange}/>
                      </div>
                      <div className="form-group">
                        <input type="password" name="userPassword" className="form-control" id="validationPassword" placeholder="Confirmation du mot de passe" required   onChange={this._handleChange} />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex mt-4 align-items-center justify-content-center">
                    <button type="submit" className="btn btn-outline-success cnx " onClick={this.handleFormSubmit}>Sauvegarder</button>
                  </div>
                  <p className="mt-5 text-center">Retourner? <a>Connexion</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        );

    }
}



export default reinitPassword;
