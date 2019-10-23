import React   , { Component }  from 'react';

import  '../../assets/espace-parent/css/bootstrap.css';
import  '../../assets/espace-parent/css/styles.css';
import  '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import sidebar from './parentSidebar';
import {Col, Container, Row} from "reactstrap";
import AuthHelperMethods from "../AuthHelperMethods";
import url from "../../confg-man";


class parentHeader extends Component{

    constructor(props){

        super(props)

        this.state = {

            firstname: '',
            lastname: '',
            email:'',
            adress:'',
            phone:'',


        }
        this._getData(localStorage.getItem('id_user'));


    }


    componentWillReceiveProps(nextProps){
        this._getData(localStorage.getItem('id_user'));

    }
    /*componentWillMount() {

        this._getData(localStorage.getItem('id_user'));

    }*/

    _getData = (id_user) => {
        fetch(url+'/users/'+id_user)
            .then(response => response.json())
            .then(json =>{
                console.log("your object"+json.email);
                this.setState({ email: json.email });
                this.setState({ firstname: json.prenom });
                this.setState({ lastname: json.nom });
                this.setState({ phone: json.phone });
                console.log("your object"+json.email);
                console.log("your object on this"+this.state.email);




            });
    }
    _handleLogout = () => {
        this.Auth.logout()
        this.props.history.replace('/');
    }



    render(){
        return (

            <div className="parentHeader">

                <div className="container-fluid bgHeaderContainer ">
                    <div className="container-fluid bgHeader d-flex align-items-center justify-content-center">

                        <div className="container headerTop d-flex align-items-stretch">
                            <div className="row d-flex align-items-center justify-content-between h-100 w-100">
                                <div className="col-xl-2 col-lg-2 col-md-3 col-12">
                                    <div className="logoEspace">
                                        <a href="./index.html">
                                            <img src={require('../../assets/espace-parent/img/chosa-white.svg')} alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-10 col-lg-10 col-md-9 col-12 d-flex justify-content-end">

                                    <form>
                                        <div className="form-group rechercheHeader mr-5">
                                            <input type="text" className="form-control" id="recherche"
                                                   placeholder="Rechercher..."/>
                                        </div>
                                    </form>

                                    <div className="notifHeader d-flex align-items-center justify-content-center mr-5">
                                        <i className="la la-bell"></i>
                                        <span
                                            className="infoNotif d-flex align-items-center justify-content-center">3</span>
                                    </div>

                                    <div className="profilHeader d-flex align-items-center">
                                        <span className="nameProfil mr-2">Bonjour Jihed</span>
                                        <div className="photoProfil mr-2"><img src={require('../../assets/espace-parent/img/photoProfilParent.png')} alt=""/>
                                        </div>

                                        <div className="dropdown">
                                            <a className="" href="#" role="button" id="dropdownMenuLink"
                                               data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                <i className="fas fa-angle-down"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right"
                                                 aria-labelledby="dropdownMenuButton">
                                                <div
                                                    className="profilDropdown d-flex align-items-center pr-3 pl-3 pt-3 pb-3 mb-2">
                                                    <div className="photoProfilDropdown mr-3"><img
                                                        src={require('../../assets/espace-parent/img/photoProfilParent.png')} alt=""/></div>
                                                    <span className="nameProfilDropdown">Ahmed AYACHI</span>
                                                </div>
                                                <a className="LinkDropdownProfil d-flex align-items-center" href="#"><i
                                                    className="la la-user pr-2"></i> Mon
                                                    profil</a>
                                                <a className="LinkDropdownMsg d-flex align-items-center" href="#"><i
                                                    className="la la-envelope-o pr-2"></i>
                                                    Messages</a>
                                                <a className="LinkDropdownSetting d-flex align-items-center" href="#"><i
                                                    className="la la-gear pr-2"></i>
                                                    Paramètres</a>
                                                <div className="d-flex justify-content-center mt-3">
                                                    <button type="button"
                                                            className="btn btn-primary logoutProfil"

                                                    >Déconnexion
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>
                    </div>
                </div>




            </div>



        );
    }}

export default parentHeader;