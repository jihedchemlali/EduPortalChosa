import React, {Component} from 'react';
import '../assets/espace-parent/css/bootstrap.css';
import '../assets/espace-parent/css/styles.css';
import '../assets/espace-parent/css/line-awesome/line-awesome.css';

import ChildCard from "../routes/child/childCard";
import SearchBody from "../routes/searchResults/searchBody";
import {Redirect} from 'react-router';
import url from "../confg-man";

class testChild extends Component {


    constructor(props){

        super(props)
        this.state = {
            centres:[]

        }


    }



    render() {
        return (

            <div>
                {this.state.centres.map((item, key) =>
                    <p item={item} key={item.id}   >  {item.id}</p>
                )}}
                <Redirect to={{pathname: '/search',state: {centres:this.state.centres , searchString: this.props.location.state.searchString}}}/>*/}

            </div>







        );
    }
}

export default testChild;
