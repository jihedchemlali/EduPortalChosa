import React, {Component} from 'react';
import {Container, Col, Row, DropdownItem, DropdownMenu} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';

import url from "../../confg-man";


const pStyle = {
    fontSize: '15px',
    textAlign: 'center'
};

class notificationItem extends Component {




    constructor(props) {

        super(props)

        this.state = {
            notif: this.props.item,
            idNotif : this.props.item.id,


        }


    }




    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }



    _timeSince(date) {
        var datec= new Date(date);
        var seconds = Math.floor((new Date() - datec) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    _handleSelect = async() => {

        await this._handleView(this.props.item);
        this.props._refreshNonLu();
       // window.location.reload();

    }

    _handleView = async(notif) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }

        notif.status="LUS";
        notif.deletingDate=new Date().getDate();
        await axios.patch(url+`/notifications/`+notif.id,  notif)

            .then((response) => {
                this.setState({ notif: this.props.item});


            }).then(res => {
            if (res === false) {
                return alert("Sorry can't update child !");
            }
            return Promise.resolve(res)
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })

    }






    render() {


        return (


            <div>

                {this.props.location==='dropdown' ? (


                    <div>

                        {this.props.item.status==='NON_LUS' ? (
                            <DropdownItem style={{backgroundColor: '#cce5ff' }}>
                                {/*<div onClick={this._handleSelect} >*/}
                                {/*<p  > {this.props.item.title}</p>*/}
                                {/*</div>*/}

                                <div id="notificationNON_LUS"  className="mb-2 pl-1 pr-1" onClick={this._handleSelect}
                                >
                                    <i className="la la-gear pr-2" >{this.props.item.title}</i>
                                    {/*<span className="la la-gear pr-2" style={{width:'100px'}} >{this.props.item.title}</span>*/}

                                </div>
                            </DropdownItem>


                        ) : (

                            <DropdownItem>
                                <i className="la la-gear pr-2" > {this.props.item.title}</i>
                            </DropdownItem>


                        )}

                    </div>




                ) : (
                    <div className="col-md-12">

                        <div className="activiteKid">
                            <div className="topActiviteKid">

                                <i className="far fa-calendar-alt" />
                                {this.props.item.type}

                            </div >
                            <p>
                                {this.props.item.title}
                            </p>

                            <p> {this._timeSince(this.props.item.creationDate)}</p>


                        </div>

                    </div>
                    )}

            </div>

        );
    }
}

export default notificationItem;