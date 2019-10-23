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


class childCardCenter extends Component {


    constructor(props){

        super(props)
        this.state = {
            maxsize:6,
            enfants:[],
            centerId:this.props.centerId

        }
        this._getChildren(this.props.item);

    }

    _getChildren = (id_center) => {
         var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
/*
        axios.get(url + '/centers/1/children/maxSize', {  headers: headers})
            .then(response => response.json())
            .then(json =>{
                alert('done');
                this.setState({ maxsize: json});
                console.log("max size ------------------"+json);
            });*/

        // axios.get(url + '/centers/1/children', { params: {
        //         offset:1,
        //         size:6
        //     }, headers: headers})
        //     .then(response => response.json())
        //     .then(json =>{
        //         alert('done');
        //         this.setState({ enfants: Object.values(json)});
        //         console.log('----------------'+this.state.enfants);
        //         console.log('-------------------------+' +this.props.centerId);
        //     });

        fetch(url + '/centers/1/children/maxSize' )
            .then(response => response.json())
            .then(json => {

                this.setState({ maxsize: 6});

            });

        fetch(url + '/centers/1/children?offset=1&size='+this.state.maxsize)
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
                        <h2> les enfants {this.state.centerId}</h2>

                    </div>
                    {this.state.enfants.map((item, key) =>

                        <ChildItem item={item} key={item.id} />
                    )

                    }
                </div>

            </div>
        );
    }
}

export default childCardCenter;
