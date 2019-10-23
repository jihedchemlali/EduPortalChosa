import React, {Component} from 'react';

import '../../../assets/espace-parent/css/bootstrap.css';
import '../../../assets/espace-parent/css/styles.css';
import '../../../assets/espace-parent/css/line-awesome/line-awesome.css';
import Userb from '../../parent/parentSidebar';
import url from "../../../confg-man";
import Header from '../../parent/parentHeader';
import Footer from '../../parent/parentFooter';
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";
import ChildSidebar from "../childsidebar";
import axios from "axios";



class activityCreate extends Component {


    constructor(props) {
        super(props)
        this.state = {

            commentaire: '',
            file:'',
            idchild:this.props.idchild,
            pictoupdateCondition:false
        }


    }
    _handleChangePicture = (e) => {
        e.preventDefault();

        this.setState(
            {
                [e.target.name]: e.target.files[0]
            }
        )
        this.setState(
            {
                pictoupdateCondition:true
            }
        )

    }
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    avatarActuality = (idch) => {

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        let formdata = new FormData();

        if  (this.state.pictoupdateCondition) {
            formdata.append('file', this.state.file, this.state.file.name);

        axios.patch(url + `/actualities/` + idch + `/files`, formdata)//, {headers: headers}
            .then(res => {
                if (res === false) {
                    return alert("Sorry can't upload image!");
                }
                //window.location.reload(true)
            })
        }
    }
    addActuality = (file, commentaire ) => {

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }
        const actuality = {
            commentaire: this.state.commentaire,
            child: this.state.idchild

        };
        axios.post(url+`/actualities`,  actuality , {headers: headers})

            .then((response) => {

               // this.avatarActuality(response.data.id)


            }).then(res => {
            if (res === false) {
                return alert("Sorry can't add actuality !");
            }
            // if {this.}
            // this.props.history.replace('/parentPanel');
            // window.location.reload();



        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })


        // this.props.history.replace('/parentPanel');
//             window.location.replace('/parentPanel');
        window.location.reload();

    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        console.log ( " content of picture " + this.state.picture);
        this.addActuality(this.state.file,this.state.commentaire);

    }



    render() {
        var labelText = 'Choisir votre photo';
        return (




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
                                                                      defaultValue={""} name="commentaire" onChange={this._handleChange}/>
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
                               placeholder="Add profile picture" name="file" onChange={this._handleChangePicture}/>
                        <label htmlFor="formControlFile">Choisir votre photo</label>
                    </div>
                </div>
                <div className="col-md-3">
                    <button type="submit"
                            className="btn btn-outline-success ajoutActivite"  onClick={this.handleFormSubmit} >Ajouter
                    </button>
                </div>
            </div>
        </form>
        </div>
    </div>
    </div>
        );
    }
}

export default activityCreate;