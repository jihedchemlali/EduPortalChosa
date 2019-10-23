import React, {Component} from 'react';
import {Container, Col, Row, DropdownItem} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';

import url from "../../confg-man";

import NotificationItem from "./notificationItem";

class notificationCard extends Component {


    constructor(props){

        super(props)
        this.state = {
            notification:[]

        }
        this._getNotifs(this.props.user);
        // console.log("this.props.child.id " + this.props.user.id);


    }

    _getNotifs = (id_user) => {

        fetch(url + '/notifications?userId='+id_user+'&size=10&offset=1')
            .then(response => response.json())
            .then(json => {

                this.setState({ notification: Object.values(json)});
                console.log(this.state.notification);

            });
    }



    render() {
        return (

            <div>

                {this.props.location==='dropdown' ? (

                    <div className="row mt-3">
                        <div className="col-md-12 mb-4">
                        </div>
                        {this.state.notification.sort((a, b) => new Date(a.creationDate)< new Date(b.creationDate)).map((item, key) =>
                            <NotificationItem item={item} key={item.id} location={this.props.location} _refreshNonLu={this.props._refreshNonLu}/>
                        )}
                    </div>

                ) : (

                    <div className="row mt-3">
                        <div className="col-md-12 mb-4">
                            <h2> les notifications</h2>
                        </div>
                        {this.state.notification.sort((a, b) => new Date(a.creationDate)< new Date(b.creationDate)).map((item, key) =>
                            <NotificationItem item={item} key={item.id} location={this.props.location}  />
                        )}
                    </div>

                    )}



            </div>







        );
    }
}

export default notificationCard;
