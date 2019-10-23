import React , { Component } from 'react';
import  '../assets/front/css/bootstrap.css';
import  '../assets/front/css/styles.css';
import AuthHelperMethods from './AuthHelperMethods'
import {toast, ToastContainer} from "react-toastify";

class login extends Component {

    Auth = new AuthHelperMethods();

    state = {
        email: "",
        password: ""
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

        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                if (res === false) {
                    return toast.error("Sorry those credentials don't exist!");
                }
                if (localStorage.getItem('role_user') =='ROLE_FORMATION' ){

                    this.props.history.replace('/centrePanel');

                }
                else{

                    this.props.history.replace('/parentPanel');

                }
            })
            .catch(err => {
                toast.error("Sorry those credentials don't exist!")
            })
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

            <body>

            <div className="login">
                <div className="container-login">
                    <div className="login-left">

                    </div>

                    <div className="wrap-login">
                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-xl-6 col-lg-8 col-md-6 col-sm-8 col-10">
                                <div className="row ">
                                    <div className="col-md-12 d-flex justify-content-center mb-5 ">
                                        <div className="logoLogin">
                                            <img src={require('../assets/front/img/chosa-color.svg')}/>
                                        </div>
                                    </div>
                                </div>
                                <form className="needs-validation mt-5" >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">


                                                <input type="email" className="form-control" id="validationEmail" name="username"
                                                       aria-describedby="input-group-prepend"
                                                       placeholder="Adresse email"  onChange={this._handleChange} required />
                                                    <div className="invalid-feedback">
                                                        Entrez une adresse mail valid
                                                    </div>

                                            </div>
                                            <div className="form-group">


                                                <input type="password" className="form-control" id="validationPassword" name="password"
                                                       placeholder="Mot de passe" onChange={this._handleChange} required />
                                                    <div className="invalid-feedback">
                                                        Entrez Votre Mot de passe
                                                    </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck1" />
                                                    <label className="custom-control-label" htmlFor="customCheck1">Rester
                                                        connecté</label>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 text-right"><a href=""
                                                                                                                 className="forgetPassword">Mot
                                            de passe oublié ?</a></div>
                                    </div>
                                    <div className="row d-flex mt-5 align-items-center justify-content-center">

                                        <button  className="btn btn-outline-success cnx " type="submit" onClick={this.handleFormSubmit}>Connexion
                                        </button>

                                        <h5>{this.state.email}</h5>

                                    </div>



                                    <p className="mt-5 text-center">Vous n'êtes pas encore inscrit? <a
                                        href="/register">Inscrivez-vous ici</a></p>
                                </form>



                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="js/bootstrap.bundle.min.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script type="text/javascript" src="js/scripts.js"></script>

            </body>
        </div>
    );

}
}



export default login;
