import React, {Component} from 'react';
import { Col, Row} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import '../../assets/espace-parent/css/css/bootstrap.css';
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
import defaultPicture from "../../assets/espace-parent/img/imgKid.png";
import {Redirect} from 'react-router';
import childService from "../BusinessLayer/childService";
import CenterCard from "../centre/centerCard";

class childItem extends Component {

    childService=new childService();
    _getPicture = (id_user) => {
        fetch(url + '/files/' + this.props.item.picture)
            .then(response => response.blob())
            .then(text => {
                console.log(URL.createObjectURL(text));
                this.setState({pic: URL.createObjectURL(text)});
                this.setState({pictureupdate: URL.createObjectURL(text)});
            });
    }


    constructor(props) {

        super(props)
        var year = new Date(this.props.item.birth_date);
        var curyear = new Date().getFullYear();
        var aged = curyear - year.getFullYear() + 1;

        this.state = {
            prenom: this.props.item.prenom,
            birth_date: this.props.item.birth_date,
            enfants: [],
            picture: defaultPicture,
            pictureupdate: this.props.item.picture,
            pic: null,
            showdelete: false,
            showmodif: false,
            age: aged,
            pictoupdateCondition: false,
            redirect: false,
            showadr:false,
            centerToAdhr:null,
            filter:''
        }
        this.triggerAdhrChange = this.triggerAdhrChange.bind(this);//2 delete
        if (this.props.item.picture != null) {
            this._getPicture(localStorage.getItem('id_user'));

        }


    }

    showModaladr = () => {
        this.setState({showadr: true});
    };

    hideModaladr = () => {
        this.setState({showadr: false});
    };

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
        this.setState({prenom: this.props.item.prenom});

    };
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    adhererCild= (e) => {
        e.preventDefault();
        this.childService.Adhr(this.props.item,this.state.centerToAdhr);
        //console.log('Center is -----------------'+this.state.centerToAdhr);


    }
    retirerChild= (e) => {
        e.preventDefault();
        this.childService.retirerChild(this.props.item);

    }
    retirerSuivi  = (e) => {
        e.preventDefault();
        this.childService.retirerSuivi(this.props.item);

    }



    AccepterAdhr= (e) => {
        e.preventDefault();
        this.childService.AccepterAdhr(this.props.item);

    }
    refuserAdhr= (e) => {
        e.preventDefault();
        this.childService.refuserAdhr(this.props.item );
        window.location.reload();

    }

    deletechild = (idhild) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        axios.delete(url + `/children/` + idhild)

            .then(res => {
                if (res === false) {
                    return alert("Sorry error : deleting child!");
                }
                window.location.reload();
            })
            .catch(err => {
                alert(err);
            })

    }
    handledelete = (e) => {

        e.preventDefault();
        this.deletechild(this.props.item.id)

    }

    _handleChangePicture = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.files[0]
            }
        )
        this.setState(
            {
                pictoupdateCondition: true
            }
        )
    }
    avatarEnfant = async (event) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        let formdata = new FormData();

        if (this.state.pictoupdateCondition) {
            formdata.append('file', this.state.pictureupdate, "profilpic.jpg");
        } else {
            formdata.append('file', this.state.pic, "profilpic.jpg");
        }
        await axios.patch(url + `/children/` + this.props.item.id + `/files`, formdata)//, {headers: headers}
            .then(res => {
                if (res === false) {
                    return alert("Sorry can't upload image!");
                }
                //window.location.reload(true)
            })
    }

    upatechild = async () => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        const child = {
            id: this.props.item.id,
            prenom: this.state.prenom,
            birth_date: this.state.birth_date,
            sexe: this.props.item.sexe,
            status: this.props.item.status,
            parent: this.props.item.parent

        };


       await axios.patch(url + `/children/` + this.props.item.id, child)
            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't update user !");
            }
            //window.location.reload();
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert("error")
            })

        /*      var bodyFormData = new FormData();
              bodyFormData.append('file', this.state.pictureupdate  );
              axios.patch(url + `/children/` +this.props.item.id, + `/files`, bodyFormData)

              axios({
                  method: 'patch',
                  url: url + `/children/` +this.props.item.id + `/files`,
                  data: bodyFormData,
                  config: { headers: {'Content-Type': 'multipart/form-data','Authorization': 'Bearer '+  localStorage.getItem('id_token')
                      }}
              })
                  .then(function (response) {
                      console.log(response);
                  })
                  .catch(function (response) {
                      console.log(response);
                  });
              else  console.log("no image")
      */


        // this.avatarEnfant(this.props.item.id);

        //if  (this.state.pictoupdateCondition){

        await this.avatarEnfant(this.props.item.id)
         window.location.reload();
        //
        /* }
         else{
             this._getPicture(this.props.item.id)
             console.log('pic wil not be updated' + this.state.pictureupdate + 'older pic ' + this.state.pic )
            // window.location.reload();
         }*/
    }

    handlemodif = (e) => {

        e.preventDefault();
        this.upatechild(this.props.item.id)

    }

    redirectToActivity = () => {

        this.setState({redirect: true});


    }

    triggerAdhrChange= (idcenter) => {
        this.setState({ centerToAdhr: idcenter});
        console.log('idcenter--------'+this.state.centerToAdhr);
    }

    render() {

        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/child/actuality',
                state: {child: this.props.item}
            }}
            />
        }


        return (


            <div className="kidCards">
                {localStorage.getItem('role_user') === 'ROLE_PARENT' ? (
                    <div>
                        <a href="#" className="deleteKid" onClick={this.showModaldelete}><i
                            className="fas fa-times"/></a>

                        <Modal
                            show={this.state.showdelete}
                            onhide={!this.state.showdelete}

                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"

                        >
                            <Modal.Header className="modal-header" closeButton onClick={this.hideModaldelete}>

                                <Modal.Title className="modal-title" id="exampleModalCenterTitle">
                                    <h5> Êtes-vous sûr de vouloir retirer {this.props.item.prenom} ?</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-body text-center">

                                <img src={require('../../assets/espace-parent/img/icon-trashDefault.png')} alt=""/>
                                <p className="mt-4">sera retirer de façon définitive. <nbsq/>
                                    {this.props.item.prenom} </p>

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
                                                        onClick={this.handledelete}>Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalFooter>
                        </Modal>

                    </div>) : (<div> </div>)}

                <div className="photoKidCards">
                    <a href="./activites-enfant.html" className="infoKid"><i className="fas fa-info"/></a>

                    {this.props.item.picture == null ? (
                        <img src={this.state.picture} alt="" onClick={this.redirectToActivity}/>
                    ) : (
                        <img src={this.state.pic} alt="" onClick={this.redirectToActivity}/>
                    )}


                </div>
                <div className="nameKidCards">

                    {localStorage.getItem('role_user') === 'ROLE_PARENT' ? (
                        <div>
                            <a href="#" data-toggle="modal" data-target="#editKid"><i
                                className="fas fa-pen " onClick={this.showModalmodif} style={{ color: '#f6a766' }}/></a>
                            <h4>{this.state.prenom}</h4>

                            <Modal
                                show={this.state.showmodif}
                                onhide={!this.state.showmodif}

                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"

                            >
                                <Modal.Header className="modal-header" closeButton onClick={this.hideModalmodif}>

                                    <Modal.Title className="modal-title" id="exampleModalCenterTitle">
                                        <h5> Modifier les informations de {this.props.item.prenom} ?</h5>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="modal-body text-center">

                                    <form>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Prénom</label>
                                            <input type="text" className="form-control"
                                                   id="validationPrenom"
                                                   name="prenom" onChange={this._handleChange}
                                                   aria-describedby="input-group-prepend" placeholder
                                                   defaultValue={this.props.item.prenom}/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Date de naissance</label>
                                            <input type="date" className="form-control"
                                                   name="birth_date" onChange={this._handleChange}
                                                   id="validationDateNaissance"
                                                   aria-describedby="input-group-prepend" value={this.state.birth_date}
                                                   placeholder=""/>
                                        </div>


                                        <div className="form-group file">
                                            <label htmlFor="formControlFile">Photo de votre enfant</label>
                                            <input type="file" className="form-control-file"
                                                   name="pictureupdate" id="formControlFile"
                                                   onChange={this._handleChangePicture}

                                                   placeholder="Add profile picture"/>
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
                                                            onClick={this.handlemodif}>Modifier
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ModalFooter>
                            </Modal>

                        </div>

                    ) : (<div>  <h4>{this.state.prenom}</h4></div>

                    )}


                </div>
                <div className="ageKidCards">

                    {this.state.age > 1 ? (
                        <h4>{this.state.age}
                            <nbsq/>
                            ans</h4>
                    ) : (
                        <h4>{this.state.age}
                            <nbsq/>
                            an</h4>
                    )}


                </div>
                <div className="buttonCardKid">


                    {/*<div className="buttonAddActivite">*/}
                    {/*    <button className="btn btn-outline-success connexion my-2 my-sm-0" id="ajoutActivite"*/}
                    {/*            onClick={this.redirectToActivity}>Ajouter des*/}
                    {/*        actualités*/}
                    {/*    </button>*/}
                    {/*</div>*/}


                    {this.props.item.status === 'ACCEPTED' && localStorage.getItem('role_user') === 'ROLE_PARENT' ? (
                        <div>
                        <div className="buttonSuivie">
                            <button className="btn btn-danger inscription my-2 my-sm-0" id="adherer2"
                                    data-target="#adhererChildModal" onClick={this.retirerChild}>Retirer de centre
                            </button>

                        </div>

                            <div className="buttonAddActivite">
                                <button className="btn btn-success inscription my-2 my-sm-0" id="ajoutActivite"
                                        onClick={this.redirectToCenterCardActivity} style={{ color: 'white' }}>Ajouter des
                                    actualités
                                </button>
                            </div>

                        </div>
                    ) : this.props.item.status === 'ONLOAD' && localStorage.getItem('role_user') === 'ROLE_PARENT' ? (
                        <div>
                        <div className="buttonSuivie">
                            <button className="btn btn-success inscription my-2 my-sm-0" id="adherer23"
                                    onClick={this.retirerChild} style={{ color: 'white' , backgroundColor :'#c381c8' }}>Annuler la demande
                            </button>
                        </div>
                            <div className="buttonAddActivite">
                                <button className="btn btn-success inscription my-2 my-sm-0" id="ajoutActivite"
                                        onClick={this.redirectToActivity} style={{ color: 'white' }}>Ajouter des
                                    actualités
                                </button>
                            </div>

                        </div>
                    ) : this.props.item.status === 'NEW' && localStorage.getItem('role_user') === 'ROLE_PARENT' || this.props.item.status === 'REFUSED' && localStorage.getItem('role_user') === 'ROLE_PARENT' ? (
                        <div>
                        <div className="buttonSuivie">


                                <button className="btn btn-outline-warning inscription my-2 my-sm-0" id="adherer2"
                                        data-target="#adhererChildModal" onClick={this.showModaladr} style={{ color: 'white' , backgroundColor :'#f6a766' }}>Adhérer
                                    à un jardin d’enfant
                                </button>

                            <Modal
                                show={this.state.showadr}
                                onhide={!this.state.showadr}

                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                                size="lg" style={{maxWidth: '1600px', width: '80%'}}

                            >
                                <Modal.Header className="modal-header" closeButton onClick={this.hideModaladr}>

                                    <Modal.Title className="modal-title" id="exampleModalCenterTitle">
                                        <h5> Adhérer mon enfant à un jardin d’enfant</h5>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="modal-body text-center">
                                    <div className="row formDefault">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="search">Filtrer par ville :</label>
                                                <input type="text" onChange={this._handleChange} className="form-control" id="search" name="filter"  autoComplete="off" placeholder="Filtrer par ville" aria-describedby="input-group-prepend"  />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="row">
                                            <div className="col-md-4" >
                                                <CenterCard triggerAdhrChange={this.triggerAdhrChange} filter={this.state.filter}></CenterCard>

                                                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="col-md-12">*/}
                                    {/*    <div className="paginationNbr">*/}
                                    {/*        <div className="row d-flex">*/}
                                    {/*            <div className="ol-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">*/}
                                    {/*                <nav aria-label="Page navigation">*/}
                                    {/*                    <ul className="pagination">*/}
                                    {/*                        <li className="page-item">*/}
                                    {/*                            <a className="page-link" href="#" aria-label="Previous">*/}
                                    {/*                                <span aria-hidden="true"><i className="la la-angle-double-left" /></span>*/}
                                    {/*                            </a>*/}
                                    {/*                        </li>*/}
                                    {/*                        <li className="page-item">*/}
                                    {/*                            <a className="page-link" href="#" aria-label="Previous">*/}
                                    {/*                                <span aria-hidden="true"><i className="la la-angle-left" /></span>*/}
                                    {/*                            </a>*/}
                                    {/*                        </li>*/}
                                    {/*                        <li className="page-item"><a className="page-link active" href="#">1</a></li>*/}
                                    {/*                        <li className="page-item"><a className="page-link" href="#">2</a></li>*/}
                                    {/*                        <li className="page-item"><a className="page-link" href="#">3</a></li>*/}
                                    {/*                        <li className="page-item"><a className="page-link" href="#">4</a></li>*/}
                                    {/*                        <li className="page-item"><a className="page-link" href="#">5</a></li>*/}
                                    {/*                        <li className="page-item"><a className="page-link" href="#">...</a></li>*/}
                                    {/*                        <li className="page-item">*/}
                                    {/*                            <a className="page-link active" href="#" aria-label="Next">*/}
                                    {/*                                <span aria-hidden="true"><i className="la la-angle-right" /></span>*/}
                                    {/*                            </a>*/}
                                    {/*                        </li>*/}
                                    {/*                        <li className="page-item">*/}
                                    {/*                            <a className="page-link active" href="#" aria-label="Next">*/}
                                    {/*                                <span aria-hidden="true"><i className="la la-angle-double-right" /></span>*/}
                                    {/*                            </a>*/}
                                    {/*                        </li>*/}
                                    {/*                    </ul>*/}
                                    {/*                </nav>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                        </div>


                                </Modal.Body>

                                <ModalFooter className="modal-footer">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-6 mr-auto mb-3">
                                                    <button type="button"
                                                            className="btn btnCancelModal"
                                                            data-dismiss="modal" onClick={this.hideModaladr}>Annuler
                                                    </button>
                                                </div>
                                                <div className="col-md-6 ml-auto mb-3">
                                                    <button type="button"
                                                            className="btn btnDeleteKidModal"
                                                            onClick={this.adhererCild}>Adhérer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ModalFooter>
                            </Modal>

                            </div>
                            <div className="buttonAddActivite">
                                <button className="btn btn-success inscription my-2 my-sm-0" id="ajoutActivite"
                                        onClick={this.redirectToActivity} style={{ color: 'white' }}>Ajouter des
                                    actualités
                                </button>
                            </div>

                        </div>
                        ): this.props.item.status === 'ONLOAD' && localStorage.getItem('role_user') === 'ROLE_FORMATION' ? (
                           <div>
                            <div className="buttonSuivie">
                                <button className="btn btn-success inscription my-2 my-sm-0" id="adherer2"
                                        data-target="#adhererChildModal" onClick={this.AccepterAdhr} style={{ color: 'white' }}>Accepter la demande
                                </button>
                            </div>

                               <div className="buttonSuivie">

                                <button className="btn btn-danger inscription my-2 my-sm-0" id="adherer2"
                                        data-target="#adhererChildModal" onClick={this.refuserAdhr}>Refuser la demande
                                </button>
                               </div>

                               {/*<h5>{this.props.item.center} // {this.props.item.id}</h5>*/}
                            </div>

                        ): this.props.item.status === 'IGNORED' && localStorage.getItem('role_user') === 'ROLE_FORMATION' ? (
                        <div>
                            <div className="buttonSuivie">
                                <button className="btn btn-outline-warning inscription my-2 my-sm-0" id="adherer2"
                                         onClick={this.AccepterAdhr} style={{ color: 'white' , backgroundColor :'#f6a766' }}>Suivre
                                </button>
                            </div>

                        </div>

                    ): this.props.item.status === 'ACCEPTED' && localStorage.getItem('role_user') === 'ROLE_FORMATION' ? (
                            <div>
                            <div className="buttonSuivie">
                                <button className="btn btn-outline-success inscription my-2 my-sm-0" id="adherer2"
                                        data-target="#adhererChildModal" onClick={this.retirerSuivi} style={{ color: 'white' , backgroundColor :'#c381c8' }}>Retirer de suivi
                                </button>
                            </div>
                                <div className="buttonAddActivite">
                                    <button className="btn btn-success inscription my-2 my-sm-0" id="ajoutActivite"
                                            onClick={this.redirectToActivity} style={{ color: 'white' }}>Ajouter des
                                        actualités
                                    </button>
                                </div>

                            </div>


                        )

                        : (
                            <div className="buttonSuivie">
                                <button className="btn btn-outline-warning inscription my-2 my-sm-0" id="adherer2"
                                        onClick={this.AccepterAdhr} style={{ color: 'white' , backgroundColor :'#f6a766' }}>Adhérer
                                    à un jardin d’enfant
                                </button>
                            </div>
                        )

                    }



                </div>

            </div>


        );
    }
}

export default childItem;