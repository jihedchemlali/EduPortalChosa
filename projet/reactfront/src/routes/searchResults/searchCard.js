import React, {Component} from 'react';
import {Container, Col, Row, DropdownItem} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';

import url from "../../confg-man";

import SearchItem from "./searchItem";

class searchCard extends Component {


    constructor(props){

        super(props)
         this.state = {
            centres:[],
             searchString:''

         }
        this._getCenters(this.props.searchString)
      //  console.log('your centers on card' + this.state.centres);

    }
    //
    // setCenters = async () =>{
    //     console.log('older centers' + this.props.centres);
    //
    //     await this.setState({centres: false});
    //     console.log('after set' + this.state.centres);
    //
    //
    // }

    _getCenters = async(name) => {

        await fetch(url + '/centers/search?name='+name+'&offset=0&size=0')
            .then(response => response.json())
            .then(json => {

                this.setState({ centres: Object.values(json)});

            });
    }



    render() {
        let itrem=Array.from(this.props.centres);
        return (

            <div>

                {/*{this.props.centres.length<1 ? (*/}

                {/*    <div className="row mt-3">*/}
                {/*        <div className="col-md-12 mb-4">*/}
                {/*            <p>Aucun Centre {this.props.centres.length}</p>*/}
                {/*        </div>*/}

                {/*    </div>*/}

                {/*) : (*/}

                {/*    <div className="row mt-3">*/}
                {/*        <div className="col-md-12 mb-4">*/}
                {/*            <h2> les centres</h2>*/}
                {/*        </div>*/}
                {/*        /!*{this.props.centres.map((item, key) =>*!/*/}
                {/*        /!*    <p>{item.id}</p>*!/*/}
                {/*        /!*)}*!/*/}
                {/*        {*/}
                {/*            this.props.centres.map((item, key) =>*/}
                {/*            <SearchItem item={item} key={item.id}   />*/}
                {/*        )}*/}
                {/*        }*/}
                {/*    </div>*/}

                {/*)}*/}

                {this.state.centres.length<1 ? (

                    <div className="row mt-3">
                        <div className="col-md-12 mb-4">
                            <p>Aucun Centre {this.state.centres.length}</p>
                        </div>

                    </div>

                ) : (

                    <div className="row mt-3">
                        <div className="col-md-12 mb-4">
                            <h2> les centres</h2>
                        </div>
                        {/*{this.props.centres.map((item, key) =>*/}
                        {/*    <p>{item.id}</p>*/}
                        {/*)}*/}
                        {
                            this.state.centres.map((item, key) =>
                                <SearchItem item={item} key={item.id}   />
                            )}
                        }
                    </div>

                )}



            </div>







        );
    }
}

export default searchCard;
