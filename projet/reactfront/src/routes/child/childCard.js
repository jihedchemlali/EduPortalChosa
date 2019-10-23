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
import defaultPicture from "../../assets/espace-parent/img/photoProfilParent.png";
import ChildItem from './childItem';


class childCard extends Component {


    constructor(props){

        super(props)
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
            enfants:[],
            centerID:null
        }
        this._getChildren(localStorage.getItem('id_user'));

       /* var enfantss = this.props.enfants.map(function(enfant, index){
            return (<li key={ `enfant-${ index }` }>{ enfant.prenom }</li>);
        });
*/
    }

    _getChildren = (id_user) => {
        fetch(url + '/users/' + id_user + '/children')
            .then(response => response.json())
            .then(json => {

                this.setState({ enfants: Object.values(json)});
                console.log(this.state.enfants);

            });
    }


    render() {
        return (



            <div>
                <div className="row mt-3">
                    <div className="col-md-12 mb-4">
                        <h2> les enfants</h2>
                    </div>
                    {this.state.enfants.map((item, key) =>
                    <ChildItem item={item} key={item.id}  center={this.state.centerID}/>
                )}
                </div>


            </div>







        );
    }
}

export default childCard;
