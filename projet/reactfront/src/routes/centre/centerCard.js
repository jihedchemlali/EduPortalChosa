import React, {Component} from 'react';
import {Container, Col, Row} from 'reactstrap'
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
import CenterItem from "./centerItem";




class centerCard extends Component {


    constructor(props){

        super(props)
        this.state = {
            centers:[]

        }
        this._getCenter();


    }

    _getCenter = () => {
        fetch(url + '/centers/?offset=0&size=0' , { params: {
                         offset:1,
                         size:6
                     }})
            .then(response => response.json())
            .then(json => {

                this.setState({ centers: Object.values(json)});
                console.log(this.state.centers);

            });
    }



    render() {
        return (
                <div>
                    {this.state.centers.filter(item => item.address.includes(this.props.filter)).map((item, key) =>
                        <div >
                            {/*<Row>*/}
                                <CenterItem triggerAdhrChange={this.props.triggerAdhrChange} item={item} key={item.id} />
                            {/*<Col xs="6">*/}
                            {/*</Row>*/}

                        </div>

                    )}
                </div>


        );
    }
}

export default centerCard;
