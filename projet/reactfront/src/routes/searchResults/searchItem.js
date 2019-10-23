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

class searchItem extends Component {




    constructor(props) {

        super(props)

        this.state = {
            logo: this.props.item.logo,
            picture : ''



        }
            if( this.state.logo != null ){
                this._getPicture(this.state.logo);
            }

    }


    _getPicture = async (id_logo) => {
        await fetch(url+'/files/'+id_logo)
            .then(response => response.blob())
            .then(text =>{
                this.setState({ picture: URL.createObjectURL(text) });
            });
    }





    render() {


        return (

                <div className="col-md-12">

                    <div className="activiteKid">
                        <div className="topActiviteKid">

                            <i className="far fa-calendar-alt"  style={{ fontfamily:'Nunito-Bold,Helvetica,Arial,sans-serif' , fontSize:'1rem' , fontWeight: 'bold' }}>   {this.props.item.name}
                            </i>


                        </div >
                        <img src={this.state.picture} width="50" height="50"  alt=""/>
                        {/*<p>*/}
                        {/*    /!*{this.props.item.title}*!/*/}
                        {/*</p>*/}


                    </div>

                </div>

        );
    }
}

export default searchItem;