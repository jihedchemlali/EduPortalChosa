import React   , { Component }  from 'react';

import  '../../assets/front/css/bootstrap.css';
import  '../../assets/front/css/styles.css';
import AuthHelperMethods from "../AuthHelperMethods";




class parentFooter extends Component{


    Auth = new AuthHelperMethods();

    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    _handleLogout = () => {
        this.Auth.logout()
        this.props.history.replace('/');
    }





    render(){
        return (

            <div className="parentFooter">

                <footer className="container-fluid footer mt-4">
                    <div className="containerFooter">
                        <div className="container pt-5 pb-5">

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-center">
                                    <div className="logoFooter">
                                        <img src={require('../../assets/espace-parent/img/chosa-white.svg')} alt=""/>
                                    </div>

                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

                                    <div className="row">
                                        <div className="col-md-4 col-6">
                                            <h5>Compte</h5>
                                            <ul>
                                                <li><a href="">Profil</a></li>
                                                <li><a href="">Réglages</a></li>
                                                <li><a href="">Notifications</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 col-6">
                                            <h5>Liens rapides</h5>
                                            <ul>
                                                <li><a href="">Politique de confidentialité</a></li>
                                                <li><a href="">Termes et conditions</a></li>
                                                <li><a href="">Aide</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 col-6">

                                            <ul>
                                                <li><a href="">Communauté</a></li>
                                                <li><a href="">Documentation</a></li>
                                                <li><a href="">Support</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="footer2 mt-2">
                            <div className="col-md-12 col-12">
                                <p>© 2019 Chosa. Tous droits réservés.</p>
                            </div>
                        </div>
                    </div>
                </footer>


            </div>
        );
    }}

export default parentFooter;