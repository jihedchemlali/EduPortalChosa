import React  , { Component }  from 'react';

import  '../assets/front/css/bootstrap.css';
import  '../assets/front/css/styles.css';
import axios from 'axios';
import URL from '../confg-man';




class register extends Component {
    constructor(props){
        super(props)

        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            status:null,
            password: null,
            tel: null,
            adresse: null,
            ville: null,

        }

    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            nom: this.state.firstname,
            prenom: this.state.lastname,
            email: this.state.email,
         //   status: this.state.status,
            userPassword: this.state.password,
            phone: this.state.tel,
            adress:this.state.adresse,
            ville:this.state.ville



        };

        axios.post(URL+`/users`,  user )
            .then(res => {
                if (res === false) {
                    return alert("Sorry Duplicated credentials !");
                }
                this.props.history.replace('/parentPanel');
            })
            .catch(err => {
                alert(err);
            })
    }

    render(){
    return (
        <div className="register">

            <body>

            <div className="register">
                <div className="container-login">
                    <div className="login-left">


                    </div>

                    <div className="wrap-login signIn">
                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10">

                                <div className="row ">
                                    <div className="col-md-12 d-flex justify-content-center mb-5 ">
                                        <div className="logoLogin">
                                            <img src={require('../assets/front/img/chosa-color.svg')}/>
                                        </div>
                                    </div>
                                </div>


                                <form className="needs-validation mt-5" noValidate>

                                    <div className="row">

                                        <div className="col-md-6 col-12">

                                            <div className="form-group">

                                                <input type="text" className="form-control" id="validationName"
                                                       name="firstname" aria-describedby="input-group-prepend"
                                                       placeholder="Nom" onChange={this.handleChange} required/>
                                                    <div className="invalid-feedback">
                                                        Entrez Votre Nom
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">

                                            <div className="form-group">

                                                <input type="text" className="form-control" id="validationName"
                                                       name="lastname" aria-describedby="input-group-prepend"
                                                       placeholder="Prénom" onChange={this.handleChange} required/>
                                                <div className="invalid-feedback">
                                                    Entrez Votre Prénom
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">
                                            <div className="form-group">

                                                <input type="number" className="form-control" id="validationTel"
                                                       name="tel" placeholder="Téléphone" onChange={this.handleChange} required/>
                                                    <div className="invalid-feedback">
                                                        Entrez Votre Numéro de téléphone
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">

                                            <div className="form-group">

                                                <input type="date" className="form-control" id="validationDate"
                                                       name="date" placeholder="Date de naissance"
                                                       aria-describedby="input-group-prepend" onChange={this.handleChange} required/>
                                                    <div className="invalid-feedback">
                                                        Entrez Votre date de naissance
                                                    </div>
                                            </div>
                                        </div>


                                        <div className="col-md-6 col-12">
                                            <div className="form-group">

                                                <input type="text" className="form-control" id="validationAdresse"
                                                       name="adresse" placeholder="Adresse" onChange={this.handleChange} required/>
                                                    <div className="invalid-feedback">
                                                        Entrez Votre Adresse
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">

                                            <div className="form-group">

                                                <input type="text" className="form-control" id="validationVille"
                                                       name="ville" aria-describedby="input-group-prepend"
                                                       placeholder="Ville" onChange={this.handleChange} required/>
                                                    <div className="invalid-feedback">
                                                        Entrez Votre Ville
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">
                                            <div className="form-group">

                                                <input type="email" className="form-control" id="validationEmail"
                                                       name="email" placeholder="Adresse email" onChange={this.handleChange} required/>
                                                    <div className="invalid-feedback">
                                                        Entrez une adresse mail valid
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">

                                            <div className="form-group">

                                                <input type="password" className="form-control" id="validationPassword"
                                                       name="password" aria-describedby="input-group-prepend"
                                                       placeholder="Mot de passe" onChange={this.handleChange} required/>
                                                    <div className="invalid-feedback">
                                                        Entrez Votre Mot de passe
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">
                                            <div className="form-group">

                                                <input type="password" className="form-control"
                                                       id="validationPasswordConfirm" name="passwordConfirm"
                                                       placeholder="Confirmation de votre mot de passe" required/>
                                                    <div className="invalid-feedback">
                                                        Entrez de nouveau Votre Mot de passe
                                                    </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="row">

                                        <div className="col-md-12 col-12">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input"
                                                       id="customCheck1"/>
                                                    <label className="custom-control-label" htmlFor="customCheck1">J'accepte
                                                        les conditions générales de vente et d'utilisation</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row d-flex mt-4 align-items-center justify-content-center">

                                        <button type="submit" className="btn btn-outline-success cnx " onClick={this.handleSubmit}>Inscription
                                        </button>

                                    </div>

                                    <p className="mt-4 text-center">Vous avez déjà un compte? <a href="/login">Connectez-vous
                                        ici</a></p>

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
}}

export default register;
