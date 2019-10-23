import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import '../assets/front/css/bootstrap.css';
import '../assets/front/css/styles.css';
import login from './login';
import register from './register';
import defaultPicture from "../assets/espace-parent/img/photoProfilParent.png";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import url from "../confg-man";
import AuthHelperMethods from "./AuthHelperMethods";


class index extends Component {

    constructor(props) {

        super(props)
        this.toggle = this.toggle.bind(this);

        this.state = {
            loggedout: false,
            firstname: '',
            lastname: '',
            pic:defaultPicture


        }
        if (localStorage.getItem("id_token") === null) {
            this.setState({loggedout: false});
        }
        else if (this.Auth.isTokenExpired(localStorage.getItem("id_token"))){
            this.setState({loggedout: false});
            this.Auth.logout();

        }
        else {
            this._getData(localStorage.getItem('id_user'));
            this._getPicture(localStorage.getItem('id_user'));


        }


    }


    _getData = (id_user) => {
        fetch(url + '/users/' + id_user)
            .then(response => response.json())
            .then(json => {
                this.setState({email: json.email});
                this.setState({firstname: json.prenom});
                this.setState({lastname: json.nom});
                this.setState({adress: json.adress});
                this.setState({loggedout: true});
                 if (json.user_picture_file!= null) {
                     this.setState({picture: json.user_picture_file});
                     console.log('eeeeeeeeeeeee'+this.state.picture);
                     this._getPicture(localStorage.getItem('id_user'));
                 }


            });
    }
    _getPicture = (id_user) => {
        fetch(url+'/files/'+this.state.picture)
            .then(response => response.blob())
            .then(text =>{

                console.log( URL.createObjectURL(text) );
                this.setState({ pic: URL.createObjectURL(text) });



            });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    Auth = new AuthHelperMethods();


    _handleLogout = () => {
        this.Auth.logout()
        this.setState({loggedout: false});

        this.props.history.replace('/');
    }
    _handleEspace = () => {

        if(localStorage.getItem("role_user") === 'ROLE_FORMATION') {
            this.props.history.replace('/centrePanel');
        }
        else   this.props.history.replace('/parentPanel');

    }



    render() {
        return (
            <Router>
                <div className="index">

                    <body>

                    <div class="container-fluid bgBandeau" id="home">

                        <div class="container-fluid bgTop">
                            <div class="container header">

                                <nav class="navbar navbar-expand-lg pt-3 pb-3 row menuH">
                                    <div class="col-3"><span class="logo"> <img
                                        src={require('../assets/front/img/chosa-white.svg')}/></span></div>
                                    <button class="navbar-toggler hamburger" type="button" data-toggle="collapse"
                                            data-target="#navbars"
                                            aria-controls="navbars" aria-expanded="false"
                                            aria-label="Toggle navigation">
                                        <i class="fas fa-bars"></i>
                                    </button>

                                    <div
                                        class="collapse navbar-collapse menuMobile col-lg-9 col-md-12 col-12 justify-content-end "
                                        id="navbars">
                                        <ul class="navbar-nav">
                                            <li class="nav-item active">
                                                <a class="nav-link" href="#home">Accueil <span
                                                    class="sr-only">(current)</span></a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#services">Services</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#presentation">Présentation</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#contact">Nous contacter</a>
                                            </li>
                                        </ul>


                                        <div>
                                            {!this.state.loggedout ? (
                                                <div>
                                                    < a href="/login"
                                                        className="btn btn-outline-warning connexion my-2 my-sm-0"  style={{ color: 'white' , backgroundColor :'#f6a766' }}>Connexion</a>
                                                    <a href="/register"
                                                       className="btn btn-outline-success inscription my-2 my-sm-0" style={{ color: 'white' , backgroundColor :'#6fc8bc'}}>Inscription</a>
                                                </div>


                                            ) : (
                                                <div className="profilHeader d-flex align-items-center">
                                                    < a onClick={this._handleEspace}
                                                        className="btn btn-outline-warning connexion my-2 my-sm-0"  style={{ color: '#b2979d' , backgroundColor :'#f6a766' }}>Mon Espace</a>
                                                    <a className="nameProfil mr-2" style={{ color: 'white' }}>&nbsp;&nbsp;&nbsp;&nbsp;Bonjour {this.state.firstname} {this.state.lastname}</a>
                                                    <a className="photoProfil mr-2"><img src={this.state.pic} width="50" height="50"
                                                                                         alt=""/>
                                                    </a>

                                                    <ButtonDropdown isOpen={this.state.dropdownOpen}
                                                                    toggle={this.toggle}>
                                                        <DropdownToggle caret color="primary">

                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem header>
                                                                <a className="nameProfilDropdown">Bonjour {this.state.firstname} {this.state.lastname}</a>
                                                                <a className="photoProfil mr-2"><img
                                                                    src={require('../assets/espace-parent/img/photoProfilParent.png')}
                                                                    alt=""/></a>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <a className="LinkDropdownProfil d-flex align-items-center"
                                                                   href="/parent/profil"><i
                                                                    className="la la-user pr-2"></i> Mon
                                                                    profil</a>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <a className="LinkDropdownMsg d-flex align-items-center"
                                                                   href="#"><i
                                                                    className="la la-envelope-o pr-2"></i>
                                                                    Messages</a>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <a className="LinkDropdownSetting d-flex align-items-center"
                                                                   href="/parent/profil"><i
                                                                    className="la la-gear pr-2"></i>
                                                                    Paramètres</a>
                                                            </DropdownItem>
                                                            <DropdownItem divider/>
                                                            <DropdownItem
                                                                className="d-flex justify-content-center mt-3">
                                                                <button type="button"
                                                                        className="btn btn-primary logoutProfil"
                                                                        onClick={this._handleLogout}
                                                                >Déconnexion
                                                                </button>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </ButtonDropdown>

                                                </div>


                                            )}
                                        </div>


                                    </div>
                                </nav>

                            </div>
                        </div>

                        <div class="container bandeau">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-content-center flex-wrap">
                                    <div class="logoBandeau mb-2">
                                        <img src={require('../assets/front/img//chosa-color.svg')} alt=""/>
                                    </div>
                                    <h2 class="titleBandeau mt-4">La plateforme de suivi <br/> de votre enfant</h2>
                                    <p class="contentbandeau mt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                                        Donec sed diam id ex ultrices fermentum vitae vitae metus. <br/>
                                        Integer augue nunc.
                                    </p>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-none d-lg-block d-xl-block">
                                    <img src={require('../assets/front/img/imgEnfantBandeau.png')} alt=""
                                         class="img-fluid"/> .
                                </div>
                            </div>
                        </div>

                    </div>

                    <main>

                        <section class="container-fluid services" id="services">
                            <div class="container">

                                <div class="row">
                                    <div class="col-md-12 mb-5">
                                        <h2 class="titleServices">Services</h2>
                                    </div>

                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mt-2">

                                        <a href="#" class="cardServices mb-4 text-decoration-none">
                                            <div class="card-body">
                                                <img src={require('../assets/front/img/iconSuivi.png')} alt=""
                                                     class="mx-auto d-block mt-4"/>
                                                <span class="cardServicesTitle mt-4 mb-4">Suivie</span>
                                            </div>
                                        </a>

                                    </div>

                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mt-2">

                                        <a href="#" class="cardServices mb-4 text-decoration-none">
                                            <div class="card-body">
                                                <img src={require('../assets/front/img/iconActivites.png')} alt=""
                                                     class="mx-auto d-block mt-4"/>
                                                <span class="cardServicesTitle mt-4 mb-4">Actualités</span>
                                            </div>
                                        </a>

                                    </div>

                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mt-2">

                                        <a href="#" class="cardServices mb-4 text-decoration-none">
                                            <div class="card-body">
                                                <img src={require('../assets/front/img/iconProfilPerso.png')} alt=""
                                                     class="mx-auto d-block mt-4"/>
                                                <span class="cardServicesTitle mt-4 mb-4">Profil personnel</span>
                                            </div>
                                        </a>

                                    </div>

                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mt-2">

                                        <a href="#" class="cardServices mb-4 text-decoration-none">
                                            <div class="card-body">
                                                <img src={require('../assets/front/img/iconActivites.png')} alt=""
                                                     class="mx-auto d-block mt-4"/>
                                                <span class="cardServicesTitle mt-4 mb-4">Activités</span>
                                            </div>
                                        </a>

                                    </div>


                                </div>
                            </div>

                        </section>

                        <section class="container-fluid presentation" id="presentation">
                            <div class="container">
                                <div class="row mb-5">
                                    <div class="col-md-12 mb-3">
                                        <h2 class="titlePresentation">Présentation</h2>
                                    </div>
                                    <div
                                        class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-2 mb-3 d-flex align-content-center flex-wrap">
                                        <p>
                                            Suspendisse vitae tortor porta, ultricies felis eget, sodales erat.
                                            Mauris malesuada eleifend luctus. Curabitur fringilla turpis non nibh
                                            fringilla,
                                            semper vehicula ipsum porttitor. Fusce tempus venenatis ornare. Vivamus
                                            blandit
                                            turpis laoreet dapibus venenatis. Proin et ex nec elit vehicula blandit eu
                                            commodo diam. Fusce id ante sed est auctor imperdiet vel at massa.<br/><br/>

                                            Ut id finibus ante, vitae ultrices nibh. Cras id pretium mauris.
                                            Sed nisi ex, rutrum ac risus et, bibendum sodales nunc. Nullam dignissim
                                            accumsan leo et cursus. Nullam non sem vulputate, fringilla tellus id,
                                            varius risus.
                                            In hac habitasse platea dictumst. Quisque eget eros eu ipsum egestas
                                            ultrices
                                            vitae at tortor. Etiam id malesuada ligula. Vestibulum vel purus sem.
                                            Quisque interdum purus ac diam gravida placerat. Nulla mattis ligula eros,
                                            nec elementum lacus ultrices ac. Pellentesque tincidunt erat vel eros
                                            malesuada tempus.
                                            Donec dignissim mauris eu efficitur pretium. In facilisis, turpis ac
                                            hendrerit cursus,
                                            dolor lacus placerat justo, rhoncus maximus nisi quam eu lacus. Nunc auctor
                                            diam ipsum,
                                            eu pharetra velit pulvinar quis. Morbi non tristique risus.
                                        </p>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-5">
                                        <img src={require('../assets/front/img//imgPresentation.png')} alt=""
                                             class="img-fluid mx-auto d-block"/>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="container-fluid activites">
                            <div class="container">
                                <div class="row mb-3">
                                    <div class="col-md-12">
                                        <h2 class="titleActivites">Activités de la semaine</h2>
                                    </div>
                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mt-5">
                                        <a href="#" class="blocActivite mb-4 text-decoration-none">

                                            <img src={require('../assets/front/img/imgActivite01.png')} alt=""/>
                                            <span
                                                class="titleBlocActivite mx-auto mt-4 mb-4">Morbi tincidunt massa</span>

                                        </a>
                                    </div>
                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mt-5">
                                        <a href="#" class="blocActivite mb-4 text-decoration-none">

                                            <img src={require('../assets/front/img/imgActivite02.png')} alt=""/>
                                            <span class="titleBlocActivite mx-auto mt-4 mb-4">Suspendisse vitae</span>

                                        </a>

                                    </div>
                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mt-5">
                                        <a href="#" class="blocActivite mb-4 text-decoration-none">

                                            <img src={require('../assets/front/img/imgActivite03.png')} alt=""/>
                                            <span
                                                class="titleBlocActivite mx-auto mt-4 mb-4">Mauris malesuada eleifend</span>

                                        </a>
                                    </div>
                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mt-5">
                                        <a href="#" class="blocActivite mb-4 text-decoration-none">

                                            <img src={require('../assets/front/img/imgActivite04.png')} alt=""/>
                                            <span
                                                class="titleBlocActivite mx-auto mt-4 mb-4">Cras id pretium mauris</span>

                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="container-fluid contact" id="contact">
                            <div class="container">
                                <div class="row ">
                                    <div class="col-md-12">
                                        <h2 class="titleContact">Contact</h2>
                                    </div>
                                </div>
                                png

                                <form class="needs-validation mt-5" novalidate>
                                    <div class="row justify-content-center">

                                        <div class="col-md-3">
                                            <div class="form-group">

                                                <input type="text" class="form-control" id="validationName"
                                                       aria-describedby="input-group-prepend"
                                                       placeholder="Nom et Prénom" required/>
                                                <div class="invalid-feedback">
                                                    Entrez Votre Nom et Prénom
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="form-gropngup">

                                                <input type="email" class="form-control" id="validationEmail"
                                                       placeholder="Adresse Email" required/>
                                                <div class="invalid-feedback">
                                                    Entrez une adresse mail valid
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <div class="row d-flex align-items-center justify-content-center mt-4">
                                        <div class="col-md-6">
                                            <div class="form-group">

                                                <textarea class="form-control" id="validationMsg" rows="5"
                                                          placeholder="Message" required></textarea>
                                                <div class="invalid-feedback">
                                                    Entrez Votre Message
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="row d-flex mt-5 align-items-center justify-content-center">

                                        <button type="submit" class="btn btn-outline-success envoyer ">Envoyer</button>

                                    </div>

                                </form>


                            </div>
                        </section>

                    </main>

                    <footer class="container-fluid footer">
                        <div class="topFooter"></div>
                        <div class="bottomFooter">
                            <div class="container">

                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-5">
                                        <div class="logoFooter mb-3">
                                            a <img src={require('../assets/front/img/chosa-white.svg')} alt=""/>
                                        </div>
                                        <ul class="list-group info mb-3">
                                            <li><i class="fas fa-phone fa-flip-horizontal"></i>+216 71 658 364</li>
                                            <li><a href="http://"><i class="far fa-envelope"></i>contact@chosa.com</a>
                                            </li>

                                        </ul>
                                        <ul class="list-group list-group-horizontal">
                                            <li><a href="http://"><i class="fab fa-facebook"></i></a></li>
                                            <li><a href="http://"><i class="fab fa-twitter-square"></i></a></li>
                                            <li><a href="http://"><i class="fab fa-linkedin"></i></a></li>
                                        </ul>

                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

                                        <div class="row">
                                            <div class="col-md-4 col-6">
                                                <h5>Information</h5>
                                                <ul>
                                                    <li><a href="">Comment ça marche</a></li>
                                                    <li><a href="">Inscription</a></li>
                                                    <li><a href="">Inscription</a></li>
                                                    <li><a href="">Connexion</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-4 col-6">
                                                <h5>Société</h5>
                                                <ul>
                                                    <li><a href="">Présentation</a></li>
                                                    <li><a href="">Confidentialité</a></li>
                                                    <li><a href="">CGVs</a></li>
                                                    <li><a href="">Contact</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-4 col-6">
                                                <h5>Compte</h5>
                                                <ul>
                                                    <li><a href="">Profil</a></li>
                                                    <li><a href="">Réglages</a></li>
                                                    <li><a href="">Notifications</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="footer2 mt-2">
                                <div class="col-md-12 col-12">
                                    <p>© 2019 Chosa. Tous droits réservés.</p>
                                </div>
                            </div>
                        </div>
                    </footer>


                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
                    <script src="js/bootstrap.bundle.min.js"></script>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                    <script type="text/javascript" src="js/scripts.js"></script>


                    </body>

                </div>

                <Route exact path="/register" render={props => <register {...props} />}/>

            </Router>


        );
    }
}

export default index;
