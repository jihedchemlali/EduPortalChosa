import React, {Component} from 'react';
import {Container, Col, Row} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';
import Footer from '../parent/parentFooter';
import Header from '../parent/parenthead';
import AuthHelperMethods from "../AuthHelperMethods";
import url from "../../confg-man";

import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter';


class childActivity extends Component {


    Auth = new AuthHelperMethods();

    //var authToken =  localStorage.getItem('id_token');

    state = {
        prenom: "zz",
        picture: 0,
        birth_date: "2019-07-22",
        sexe: "GARCON",
        parent: 6,
        show: false
    }
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }


    componentWillMount() {
        /* Here is a great place to redirect someone who is already logged in to the protected route */
        if (!this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    addchild = (prenom, picture, birth_date, sexe, parent) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
        const child = {
            prenom: this.state.prenom,
            birth_date: this.state.birth_date,
            sexe: this.state.sexe,
            parent: localStorage.getItem('user')

        };
        axios.post(url + `/children`, child, {headers: headers})

            .then((response) => {
                axios.patch(url + `/children/` + response.data.id + `/files`, this.state.picture, {headers: headers})

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't add child !");
            }
            this.props.history.replace('/parentPanel');
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert("error")
            })

    }
    handleFormSubmit = (e) => {

        e.preventDefault();
        console.log(" content of picture " + this.state.picture);
        this.addchild(this.state.prenom, this.state.picture, this.state.birth_date, this.state.sexe, this.state.parent)

    }


    showModal = () => {
        this.setState({show: true});
    };

    hideModal = () => {
        this.setState({show: false});
    };


    render() {
        return (

            <div>
                <Header/>


                <div className="container-fluid">
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 d-none d-xl-block">
                                <div className="detailEspace stickyElement">
                                    <div className="photoNameDetailEspace">
                                        <div className="nameDetailEspace">Jardin d’enfant</div>
                                        <div className="descriptionDetailEspace">Lorem ipsum dolor consectetur</div>
                                        <div className="photoDetailEspace">
                                            <a href className="editPhotoDetailEspace"><i className="fas fa-pen" /></a>
                                            <img src="./img/photoProfilEcole.png" alt=""/>
                                        </div>
                                    </div>
                                    <div className="resumerDetailEspace">
                                        <span className="titleResumeDetailEspace">Description:</span>
                                        <p>
                                            Praesent eget magna id diam ultrices
                                            dapibus ac quis ex. Nam pulvinar urna
                                            tellus, eget scelerisque elit tristique a.
                                            Aenean euismod aliquet dolor euismod
                                            fermentum. Morbi tincidunt massa diam,
                                            eu bibendum arcu sodales ac. Maecenas
                                            mattis scelerisque elit, quis aliquam leo
                                            rhoncus id. Mauris nec sem ut diam
                                            consequat vulputate id ut augue.
                                        </p>
                                    </div>
                                    <div className="infoEspace">
                                        <ul>
                                            <li>
                                                <img src="./img/map.svg" alt=""/>
                                                Nullam non sem vulputate, fringilla
                                                tellus id, varius risus
                                            </li>
                                            <li><a href> <img src="./img/globe.svg"
                                                              alt=""/> www.centre-formation.com</a></li>
                                            <li><a href><img src="./img/mail.svg" alt=""/> contact@centre-formation.com</a>
                                            </li>
                                            <li><img src="./img/telephone.svg" alt=""/> +216 71 23 54 87</li>
                                            <li><a href><img src="./img/facebook.svg" alt=""/>
                                                https://www.facebook.com/centre-formation</a></li>
                                            <li><a href><img src="./img/linkedin.svg" alt=""/>
                                                linkedin.com/in/centre-formation-76</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    <div className="col-md-9 col-12">
                                        <div className="filAriane">
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item"><a href="./index.html">Mon
                                                        profil</a></li>
                                                    <li className="breadcrumb-item active"
                                                        aria-current="page">Enfant: <span>Khaoula
                            HASSAN</span></li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-12">
                                        <div className="linkBackEspace"><a href="./index.html"><i
                                            className="la la-angle-left"/>Retour</a></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="addActivite">
                                            <span className="titleAddActivite">Ajouter une activité</span>
                                            <form className="needs-validation" noValidate>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea className="form-control" id="validationMsg"
                                                                      rows={5} placeholder="Description" required
                                                                      defaultValue={""}/>
                                                            <div className="invalid-feedback">
                                                                Entrez Votre Activité
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-9">
                                                        <div className="form-group file">
                                                            <input type="file" className="form-control-file"
                                                                   id="formControlFile"
                                                                   placeholder="Add profile picture"/>
                                                            <label htmlFor="formControlFile">Choisir votre photo</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button type="submit"
                                                                className="btn btn-outline-success ajoutActivite">Ajouter
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="activiteKid">
                                            <a href className="deleteActiciteKid"><i className="fas fa-times"/></a>
                                            <div className="topActiviteKid">
                                                <i className="far fa-calendar-alt"/>
                                                Mardi 05 Mars 2019
                                                <a href className="editActiciteKid"><i className="fas fa-pen"/></a>
                                            </div>
                                            <p>
                                                Praesent elementum diam nisi, in aliquet diam laoreet quis.
                                                Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                                                per inceptos himenaeos. Aenean quis porttitor urna, ac egestas dolor.
                                                Curabitur vestibulum purus eget sapien varius volutpat. Praesent vel
                                                orci nulla. Morbi tempor mi sed nibh pretium consectetur. Duis egestas
                                                tincidunt interdum. Integer faucibus lacus nunc, eu accumsan urna
                                                fermentum vestibulum.
                                            </p>
                                            <img src="./img/imgActivite01.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="activiteKid">
                                            <a href className="deleteActiciteKid"><i className="fas fa-times"/></a>
                                            <div className="topActiviteKid">
                                                <i className="far fa-calendar-alt"/>
                                                Lundi 04 Mars 2019
                                                <a href className="editActiciteKid"><i className="fas fa-pen"/></a>
                                            </div>
                                            <p>
                                                Praesent elementum diam nisi, in aliquet diam laoreet quis.
                                                Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                                                per inceptos himenaeos. Aenean quis porttitor urna, ac egestas dolor.
                                                Curabitur vestibulum purus eget sapien varius volutpat. Praesent vel
                                                orci nulla. Morbi tempor mi sed nibh pretium consectetur. Duis egestas
                                                tincidunt interdum. Integer faucibus lacus nunc, eu accumsan urna
                                                fermentum vestibulum.
                                            </p>
                                            <img src="./img/imgActivite02.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="activiteKid">
                                            <a href className="deleteActiciteKid"><i className="fas fa-times"/></a>
                                            <div className="topActiviteKid">
                                                <i className="far fa-calendar-alt"/>
                                                Vendredi 01 Mars 2019
                                                <a href className="editActiciteKid"><i className="fas fa-pen"/></a>
                                            </div>
                                            <p>
                                                Praesent elementum diam nisi, in aliquet diam laoreet quis.
                                                Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                                                per inceptos himenaeos. Aenean quis porttitor urna, ac egestas dolor.
                                                Curabitur vestibulum purus eget sapien varius volutpat. Praesent vel
                                                orci nulla. Morbi tempor mi sed nibh pretium consectetur. Duis egestas
                                                tincidunt interdum. Integer faucibus lacus nunc, eu accumsan urna
                                                fermentum vestibulum.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                                <div className="kidCards stickyElement">
                                    <div className="photoKidCards">
                                        <img src="./img/imgKid-exemple.png" alt=""/>
                                    </div>
                                    <div className="nameKidCards">
                                        <a href className="editInfoKid"><i className="fas fa-pen"/></a>
                                        <h4>Khaoula HASSAN</h4>
                                    </div>
                                    <div className="ageKidCards">
                                        <h4>2 ans</h4>
                                    </div>
                                    <div className="buttonCardKid">
                                        <div className="buttonSuivie">
                                            <a href className="retirer">Retirer du suivie</a>
                                            <a href className="delete">Supprimer l’enfant</a>
                                        </div>
                                    </div>
                                    <div className="resumeInfoKid">
                                        <span className="titleResumeInfoKid">Description:</span>
                                        <p>
                                            Praesent eget magna id diam ultrices
                                            dapibus ac quis ex. Nam pulvinar urna
                                            tellus, eget scelerisque elit tristique a.
                                            Aenean euismod aliquet dolor euismod
                                            fermentum. Morbi tincidunt massa diam,
                                            eu bibendum arcu sodales ac.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer/>

            </div>


        );
    }
}

export default childActivity;
