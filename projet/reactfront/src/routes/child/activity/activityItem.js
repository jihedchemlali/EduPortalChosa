import React, {Component} from 'react';
import {Container, Col, Row} from 'reactstrap'
import '../../../assets/espace-parent/css/bootstrap.css';
import '../../../assets/espace-parent/css/styles.css';
import '../../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';

import url from "../../../confg-man";
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter';
import defaultPicture from "../../../assets/espace-parent/img/imgKid.png";
import { Redirect } from 'react-router';
import actualityService from "../../BusinessLayer/actualityService";
class activityItem extends Component {



    actualityService=new actualityService();

    constructor(props) {

        super(props)

        this.state = {
            commentaire: this.props.item.commentaire,
            idActuality : this.props.item.id,
            picture :  null,
            showdelete: false,
            showmodif: false

        }

        if (this.props.item.file!=null){
            this._getPicture(localStorage.getItem('id_user'));

        }
    }

    _getPicture = (id_user) => {
        fetch(url+'/files/'+this.props.item.file)
            .then(response => response.blob())
            .then(text =>{
                this.setState({ picture: URL.createObjectURL(text) });
            });
    }



    _timeSince(date) {
        var datec= new Date(date);
        var seconds = Math.floor((new Date() - datec) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    _deleteActuality = (e) => {
        e.preventDefault();
        this.actualityService.deleteactuality(this.state.idActuality);
        window.location.reload();
    }


    _upateActuality = (e) => {
        e.preventDefault();
        this.actualityService.updateactuality(this.state.idActuality , this.props.item.child,this.state.commentaire);
        window.location.reload();

    }
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }





    showModaldelete = () => {
        this.setState({showdelete: true});
    };

    hideModaldelete = () => {
        this.setState({showdelete: false});
    };

    showModalmodif = () => {
        this.setState({showmodif: true});
    };

    hideModalmodif = () => {
        this.setState({showmodif: false});
        this.setState({commentaire: this.props.item.commentaire});
    };




    render() {


        return (


            <div className="col-md-12">

                {localStorage.getItem('id_user') == this.props.item.user ? (


                <div className="activiteKid">
                    <a  className="deleteActiciteKid" ><i className="fas fa-times" onClick={this.showModaldelete}/></a>
                    <Modal
                        show={this.state.showdelete}
                        onhide={!this.state.showdelete}

                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"

                    >
                        <Modal.Header className="modal-header" closeButton onClick={this.hideModaldelete}>

                            <Modal.Title className="modal-title" id="exampleModalCenterTitle">
                                <h5> voulez-vous vraiment supprimer l'article? </h5>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-body text-center">

                            <img src={require('../../../assets/espace-parent/img/icon-trashDefault.png')} alt=""/>
                            <p className="mt-4">Supprimer cette actualité de façon définitive ! </p>

                        </Modal.Body>

                        <ModalFooter className="modal-footer">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6 mr-auto mb-3">
                                            <button type="button"
                                                    className="btn btnCancelModal"
                                                    data-dismiss="modal" onClick={this.hideModaldelete}>Annuler
                                            </button>
                                        </div>
                                        <div className="col-md-6 ml-auto mb-3">
                                            <button type="button"
                                                    className="btn btnDeleteKidModal"
                                                    onClick={this._deleteActuality}>Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalFooter>
                    </Modal>

                    <div className="topActiviteKid">
                    <i className="far fa-calendar-alt" />
                    {this._timeSince(this.props.item.creationDate)}


                    <a href className="editActiciteKid"><i className="fas fa-pen"  onClick={this.showModalmodif} style={{ color: '#f6a766' }}/></a>
                        <Modal
                            show={this.state.showmodif}
                            onhide={!this.state.showmodif}

                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"

                        >
                            <Modal.Header className="modal-header" closeButton onClick={this.hideModalmodif}>

                                <Modal.Title className="modal-title" id="exampleModalCenterTitle">
                                    <h5> Modifier les informations ?</h5>

                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-body text-center">

                                <form>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Modifier votre commentaire</label>
                                        <input type="text" className="form-control"
                                               id="validationPrenom"
                                               name="commentaire" onChange={this._handleChange}
                                               aria-describedby="input-group-prepend" placeholder
                                               defaultValue={this.props.item.commentaire}/>
                                    </div>


                                </form>
                            </Modal.Body>

                            <ModalFooter className="modal-footer">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6 mr-auto mb-3">
                                                <button type="button"
                                                        className="btn btnCancelModal"
                                                        data-dismiss="modal" onClick={this.hideModalmodif}>Annuler
                                                </button>
                                            </div>
                                            <div className="col-md-6 ml-auto mb-3">
                                                <button type="button"
                                                        className="btn btnDeleteKidModal"
                                                        onClick={this._upateActuality}>Modifier
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalFooter>
                        </Modal>


                </div>
                <p>
                    {this.state.commentaire}
                </p>
                <img src={this.state.picture} alt=""  />

            </div>
                ) : (  <div className="activiteKid">
                    <div className="topActiviteKid">
                        <i className="far fa-calendar-alt" />
                        {this._timeSince(this.props.item.creationDate)}

                    </div>
                    <p>
                        {this.props.item.commentaire}
                    </p>
                    <img src={this.state.picture} alt=""  />

                </div>)}


             </div>


        );
    }
}

export default activityItem;