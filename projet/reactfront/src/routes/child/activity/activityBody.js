import React, {Component} from 'react';

import '../../../assets/espace-parent/css/bootstrap.css';
import '../../../assets/espace-parent/css/styles.css';
import '../../../assets/espace-parent/css/line-awesome/line-awesome.css';
import Userb from '../../parent/parentSidebar';
import url from "../../../confg-man";
import Header from '../../parent/parenthead';
import Footer from '../../parent/parentFooter';
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";
import ChildSidebar from "../childsidebar";
import ActivityCreate from './activityCreate';
import ChildItem from "../childItem";
import ActivityCard from './activityCard';


class activityBody extends Component {

    constructor(props) {
        super(props)
        this.state = {

            firstname: '',
            lastname: '',
            email: '',
            adress: '',
            phone: '',
            picture: '',
            dropdownOpen: false,
            path: "",
            fileName: "",
            enfants: [],
            curtime:0,
            child:this.props.location.state.child

        }
        //    this._getChildren(localStorage.getItem('id_user'));

    }



    render() {
        return (


            <div>
                <Header/>


                <div className="container">

                    <div className="row mt-4">

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 d-none d-xl-block">
                            <Userb> </Userb>
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-md-10 col-12">

                                    <div className="filAriane">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="/parentPanel">Mon profil</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <span>{this.state.child.prenom}</span>
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
                                        <h2>Ajouter une Activité</h2>
                                        <ActivityCreate idchild={this.state.child.id} />
                                        <ActivityCard child={this.state.child} />

                                    </div>

                                    <div className="col-md-8 formDefault">

                                    </div>

                                </div>


                            </div>

                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                            <ChildSidebar item={this.state.child} key={this.state.child.id} />
                        </div>
                    </div>
                </div>

                <Footer/>

            </div>


        );
    }
}

export default activityBody;