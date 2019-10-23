import React , { Component } from 'react';
import  '../assets/front/css/bootstrap.css';
import  '../assets/front/css/styles.css';
import AuthHelperMethods from './AuthHelperMethods'
import userService from "./BusinessLayer/userService";
import {toast ,ToastContainer } from "react-toastify";

class forgetPassword extends Component {

    Auth = new AuthHelperMethods();
    userService = new userService();

    state = {
        email: ""
    }
    _handleChange = (e) => {

        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        this.userService.request(this.state.email)

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
                                <form  className="needs-validation mt-5" >
                                <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="validationEmail" aria-describedby="input-group-prepend"  name="email" placeholder="Adresse email" onChange={this._handleChange} required />
                        <div className="invalid-feedback">
                          Entrez une adresse mail valid
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex mt-0 align-items-center justify-content-center">
                    <button type="submit" id="submit" className="btn btn-outline-success cnx" onClick={this.handleFormSubmit}>Réinitialiser mot de passe</button>
                  </div>
                  <p className="mt-5 text-center">Retourner? <a >Connexion</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        );

    }
}



export default forgetPassword;
