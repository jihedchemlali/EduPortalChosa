import React   , { Component }  from 'react';
import {Container,Col,Row} from 'reactstrap'
import  '../../assets/espace-parent/css/bootstrap.css';
import  '../../assets/espace-parent/css/styles.css';
import  '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';
import  Footer from '../parent/parentFooter';
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
import {toast, ToastContainer} from "react-toastify";




class childCreate extends Component{


    Auth = new AuthHelperMethods();

    //var authToken =  localStorage.getItem('id_token');

    state = {
        prenom: "",
        picture: null ,
        birth_date: '',
        sexe: "GARCON",
        parent: 0,
        show: false,
        idchild:null,
        initPic:''

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
    _handleChangePicture = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.files[0]
            }
        )

    }
    avatarEnfant = async (idchild) => {

        console.log('child id ----------'+idchild)

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        let formdata = new FormData();

        if  (this.state.picture != null) {
            formdata.append('file', this.state.picture, this.state.picture.name);

           await axios.patch(url + `/children/` + idchild + `/files`, formdata)//, {headers: headers}
                .then(res => {
                    if (res === false) {
                        return alert("Sorry can't upload image!");
                    }
                    //window.location.reload(true)

                })

        }
    }

    addchild = async (prenom, picture , birth_date , sexe ,  parent ) => {

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }
        const child = {
            prenom: this.state.prenom,
            birth_date: this.state.birth_date,
            sexe: this.state.sexe,
            parent: localStorage.getItem('id_user')

        };



       let res = await axios.post(url+`/children`,  child , {headers: headers})

        //     .then((response) => {
        //
        //
        //     }).then(res => {
        //
        // })
        //     .catch(err => {
        //         toast.error("Sorry cant create child")
        //     })
        //     .catch((error) => {
        //         toast.error("Sorry cant create child")
        //     })
       ;

        this.avatarEnfant(res.data.id);

        if (res.data.id){
            return toast.success("Child created")

        }
        else {
            return toast.error("Sorry cant create child")

        }


            // this.props.history.replace('/parentPanel');
//             window.location.replace('/parentPanel');

    }
    handleFormSubmit =  (e) => {

        e.preventDefault();
        console.log ( " content of picture " + this.state.picture);
        this.addchild(this.state.prenom, this.state.picture, this.state.birth_date, this.state.sexe, this.state.parent);
        this.hideModal();

        // if (this.state.idchild!=null){
        //     this.props.history.replace('/parentPanel');
        //    window.location.reload();
        // }

    }
    handleredirect = (e) => {


        this.props.history.replace('/parentPanel');
        window.location.reload();


    }




    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
        this.setState({ prenom: '' });
        this.setState({ birth_date: '' });


    };




    render(){
        return (

            <div>
                <Header/>
                <ToastContainer />


                <div className="container">

                    <div className="row mt-4">

                        <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-md-10 col-12">
                                    <div className="filAriane">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="/parentPanel">Mon profil</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <span>Ajouter enfant</span>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>

                                <div className="col-md-2 col-12">
                                    <div className="linkBackEspace"><a onClick={this.handleredirect}><i
                                        className="la la-angle-left"></i>Retour</a></div>
                                </div>


                            </div>

                            <div className="contentDefaultPage">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-11 mb-4">
                                        <h2>Ajouter un enfant</h2>
                                    </div>

                                    <div className="col-md-8 formDefault">
                                        <form>

                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-5 d-flex justify-content-center">
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadioInline1"
                                                               name="sexe" value="GARCON"
                                                               className="custom-control-input"  onChange={this._handleChange}/>
                                                            <label className="custom-control-label"
                                                                   htmlFor="customRadioInline1">Garçon</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadioInline2"
                                                               name="sexe" value="FILLE"
                                                               className="custom-control-input" onChange={this._handleChange}/>
                                                            <label className="custom-control-label"
                                                                   htmlFor="customRadioInline2">Fille</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mt-5">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Nom de l'enfant</label>
                                                        <input type="text" className="form-control" id="validationName"
                                                               aria-describedby="input-group-prepend" placeholder="" value={this.state.prenom}
                                                              name="prenom" onChange={this._handleChange}/>
                                                    </div>
                                                </div>



                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Date de naissance</label>
                                                        <input type="date" className="form-control" id="validationDate"
                                                               aria-describedby="input-group-prepend" placeholder="" value={this.state.birth_date}
                                                               name="birth_date" onChange={this._handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group file">
                                                        <span>Photo de votre enfant</span>
                                                        <input type="file" className="form-control-file"
                                                               id="formControlFile" placeholder="Add profile picture" name="picture" onChange={this._handleChangePicture}/>
                                                            <label htmlFor="formControlFile">Choisir la photo</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="row d-flex justify-content-between">
                                                        <div className="col-md-6 mb-3">
                                                            <button type="button" className="btn save"
                                                                    data-toggle="modal" data-target="#addKid" onClick={this.showModal}>Ajouter
                                                            </button>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <button type="submit" className="btn cancel" onClick={this.handleredirect} >Annuler
                                                            </button>
                                                        </div>
                                                    </div>



                                                    <div className="modal fade modalChosa" id="addKid" tabIndex="-1"
                                                         role="dialog"
                                                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered"
                                                             role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title"
                                                                        id="exampleModalCenterTitle">Ajout d'un
                                                                        enfant</h5>
                                                                    <button type="button" className="closeModal"
                                                                            data-dismiss="modal" aria-label="Close" onClick={this.showModal}>
                                                                        <i className="fas fa-times"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body text-center">
                                                                    <img src={require('../../assets/espace-parent/img/icon-AjoutDefault.png')} alt=""/>
                                                                    <p className="mt-4">Êtes vous sûr d'ajouter
                                                                        {this.state.prenom} </p>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <div className="row d-flex justify-content-center">
                                                                        <div className="col-md-8">
                                                                            <div className="row">
                                                                                <div className="col-md-6 mr-auto mb-3">
                                                                                    <button type="button"
                                                                                            className="btn btnCancelModal"
                                                                                            data-dismiss="modal" onClick={this.handleFormSubmit}>Annuler
                                                                                    </button>
                                                                                </div>
                                                                                <div className="col-md-6 ml-auto mb-3">
                                                                                    <button type="button"
                                                                                            className="btn btnAddKidModal" onClick={this.hideModal} >Ajouter
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>









                                                    <Modal
                                                        show={this.state.show}
                                                        onhide={!this.state.show}

                                                        dialogClassName="modal-90w"
                                                        aria-labelledby="example-custom-modal-styling-title"
                                                    >
                                                        <Modal.Header  className="modal-header" closeButton onClick={this.hideModal}>

                                                            <Modal.Title className="modal-title"
                                                                         id="exampleModalCenterTitle">
                                                                         Ajout d'un enfant
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body  className="modal-body text-center">

                                                                <img src={require('../../assets/espace-parent/img/icon-AjoutDefault.png')} alt=""/>
                                                                <p className="mt-4">Êtes vous sûr d'ajouter  <nbsq/>
                                                                    {this.state.prenom} </p>

                                                        </Modal.Body>

                                                        <ModalFooter className="modal-footer">
                                                            <div className="row d-flex justify-content-center">
                                                                <div className="col-md-8">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mr-auto mb-3">
                                                                            <button type="button"
                                                                                    className="btn btnCancelModal"
                                                                                    data-dismiss="modal"  onClick={this.hideModal}>Annuler
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-md-6 ml-auto mb-3">
                                                                            <button type="button"
                                                                                    className="btn btnAddKidModal" onClick={this.handleFormSubmit} >Ajouter
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ModalFooter>
                                                    </Modal>




                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <Footer/>

            </div>


        );
    }}

export default childCreate;
