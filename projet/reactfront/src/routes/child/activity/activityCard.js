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
import defaultPicture from "../../../assets/espace-parent/img/photoProfilParent.png";
import ActivityItem from './activityItem';


class activityCard extends Component {


    constructor(props){

        super(props)
        this.state = {
            actualites:[]

        }
        this._getActuality(this.props.child.id);
        console.log("this.props.child.id " + this.props.child.id);


    }

    _getActuality = (id_child) => {
        fetch(url + '/children/' + id_child + '/actualities')
            .then(response => response.json())
            .then(json => {

                this.setState({ actualites: Object.values(json)});
                console.log(this.state.actualites);

            });
    }



    render() {
        return (

            <div>
                <div className="row mt-3">
                    <div className="col-md-12 mb-4">
                        <h2> les activités</h2>
                    </div>
                    {this.state.actualites.sort((a, b) => new Date(a.creationDate)< new Date(b.creationDate)).map((item, key) =>
                        <ActivityItem item={item} key={item.id} />
                    )}
                </div>


            </div>







        );
    }
}

export default activityCard;
