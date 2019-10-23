import React, {Component} from 'react';
import {Container, Col, Row, DropdownItem, DropdownToggle} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';

import url from "../../confg-man";

class nonLu extends Component {




    constructor(props) {

        super(props)
    }

    render() {


        return (

            <div className="dropdown notifContent">
                <a href className="notifHeader d-flex align-items-center justify-content-center mr-5" role="DropdownToggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    <i className="la la-bell" />
                    <span className="infoNotif d-flex align-items-center justify-content-center">{this.props.notifsnonlu}</span>
                </a>
            </div>

        );
    }
}

export default nonLu;