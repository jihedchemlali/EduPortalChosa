import React   , { Component }  from 'react';
import {Container,Col,Row} from 'reactstrap'
import  '../../assets/front/css/bootstrap.css';
import  '../../assets/front/css/styles.css';
import  SideBar from './parentSidebar';
import  Footer from './parentFooter';
import Header from './parenthead';
import Body from './parentBody';








class parentPanel extends Component{





    render(){
        return (

            <div>
                <Header/>

<  Body></Body>




                <Footer/>

            </div>


        );
    }}

export default parentPanel;
