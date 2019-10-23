import React   , { Component }  from 'react';

import  '../../assets/espace-parent/css/bootstrap.css';
import  '../../assets/espace-parent/css/styles.css';
import  '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import {ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import AuthHelperMethods from "../AuthHelperMethods";
import url from "../../confg-man";
import defaultPicture from '../../assets/espace-parent/img/photoProfilEcole.png';
import axios from 'axios';
import CentreSidebar from './CentreSidebar';


class centreHeader extends Component{


    constructor(props){

        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {

            firstname: '',
            lastname: '',
            email:'',
            adress:'',
            phone:'',
            picture:defaultPicture,
            dropdownOpen: false,
            path:"",
            fileName:"",
            pic:null


        }
        this._getData(localStorage.getItem('id_user'));
        this._getPicture(localStorage.getItem('id_user'));

    }

    componentWillReceiveProps(nextProps){
        // this._getData(localStorage.getItem('id_user'));
        // this._getPicture(localStorage.getItem('id_user'));



    }

    _getData = (id_user) => {
        fetch(url+'/users/'+id_user)
            .then(response => response.json())
            .then(json =>{
                this.setState({ email: json.email });
                this.setState({ firstname: json.prenom });
                this.setState({ lastname: json.nom });
                this.setState({ adress: json.adress });
                if (json.user_picture_file!= null) {
                    this.setState({picture: json.user_picture_file});
                    this._getPicture(localStorage.getItem('id_user'));
                }
                console.log('eeeeee'+this.state.picture)


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
        window.location.replace('/');
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
                                        <a href="/">
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

                                    <div className="profilHeader d-flex align-items-center" >
                                        <a className="nameProfil mr-2">Bonjour {this.state.firstname} {this.state.lastname}</a>
                                        <a className="photoProfil mr-2"><img src={this.state.pic} width="50" height="50"  alt=""/>
                                        </a>

                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown">
                                            <DropdownToggle  color="transparent">
                                                <i className="fas fa-angle-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem header>
                                                    <a className="nameProfilDropdown">Bonjour {this.state.firstname} {this.state.lastname}</a>
                                                    <a className="photoProfil mr-2"  ><img src={this.state.pic}  alt=""/></a>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <a className="LinkDropdownProfil d-flex align-items-center"href="/parent/password"><i
                                                        className="la la-user pr-2"></i> Mon
                                                        profil</a>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <a className="LinkDropdownMsg d-flex align-items-center" href="#"><i
                                                        className="la la-envelope-o pr-2"></i>
                                                        Messages</a>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <a className="LinkDropdownSetting d-flex align-items-center" href="/parent/profil"><i
                                                        className="la la-gear pr-2"></i>
                                                        Paramètres</a>
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                                <DropdownItem className="d-flex justify-content-center mt-3">
                                                    <button type="button"
                                                            className="btn btn-primary logoutProfil"
                                                            onClick={this._handleLogout}
                                                    >Déconnexion
                                                    </button>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>

                                    </div>

                                </div>


                            </div>

                        </div>
                    </div>
                </div>




            </div>



        );
    }}

export default centreHeader;