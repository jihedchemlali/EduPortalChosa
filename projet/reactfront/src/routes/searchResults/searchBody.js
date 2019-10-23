import React, {Component} from 'react';

import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import Userb from '../parent/parentSidebar';
import url from "../../confg-man";
import Header from '../parent/parenthead';
import Footer from '../parent/parentFooter';
import CentreHeader from "../centre/centreHeader";

import SearchCard from "./searchCard";

class searchBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            centres:this.props.location.state.centres


        }
        //    this._getChildren(localStorage.getItem('id_user'));
        console.log('your centers on body' + this.props.location.state.centres);


    }



    render() {
        return (


            <div>

                {localStorage.getItem('role_user') =='ROLE_FORMATION' ? (
                    <CentreHeader/>

                ) : (                <Header/>
                )}




                <div className="container">

                    <div className="row mt-4">

                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 d-none d-xl-block">
                            <Userb> </Userb>
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-md-10 col-12">

                                    <div className="filAriane">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="/parentPanel">Mon profil</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <span>Search Results</span>
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>

                                <div className="col-md-2 col-12">
                                    <div className="linkBackEspace"><a onClick={this.handleredirect}><i
                                        className="la la-angle-left"></i>Retour</a></div>
                                </div>


                            </div>

                            <div className="contentDefaultPage">


                                <div className="row d-flex justify-content-center">

                                    <div className="col-md-11 mb-4">
                                        {/*<h2>Ajouter une Activité</h2>*/}
                                        {/*<ActivityCreate idchild={this.state.child.id} />*/}
                                        {/*<ActivityCard child={this.state.child} />*/}

                                        <SearchCard centres={this.props.location.state.centres} searchString={this.props.location.state.searchString} />

                                    </div>

                                    <div className="col-md-8 formDefault">

                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>
                </div>

                <Footer/>

            </div>


        );
    }
}

export default searchBody;