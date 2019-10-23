import React, {Component} from 'react';
import {Container, Col, Row,Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';

import url from "../../confg-man";
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter';
import {Redirect} from 'react-router';
import defaultImage from '../../assets/espace-parent/img/photoProfilEcole.png';

class centeritem extends Component {


    constructor(props) {

        super(props)

        this.state = {
            commentaire: this.props.item.commentaire,
            idActuality: this.props.item.id,
            picture: null,
            showdelete: false,
            showmodif: false,
            pic: defaultImage

        }

        if (this.props.item.logo != null) {
            this._getPicture(localStorage.getItem('id_user'));
        }

    }

    updateAdhr = (e) => {
        e.preventDefault();
        this.props.triggerAdhrChange(this.props.item.id);
    }
    _getPicture = (id_user) => {
        fetch(url + '/files/' + this.props.item.logo)
            .then(response => response.blob())
            .then(text => {

                console.log(URL.createObjectURL(text));
                this.setState({pic: URL.createObjectURL(text)});

            });
    }


    render() {


        return (
            <div>

                <Card onClick={this.updateAdhr}>
                    <CardImg top width="100%" src={this.state.pic} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.item.name}</CardTitle>
                        <CardSubtitle>centre {this.props.item.address} , {this.props.item.ville}</CardSubtitle>
                        {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                    </CardBody>
                </Card>


            </div>





        );
    }
}

export default centeritem;