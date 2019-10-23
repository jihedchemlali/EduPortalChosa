import React, {Component} from 'react';

import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import Userb from './parentSidebar';
import Childcard from '../child/childCard';
import url from "../../confg-man";
import defaultPicture from "../../assets/espace-parent/img/photoProfilParent.png";


class parentBody extends Component {


    constructor(props) {
        super(props)
        this.state = {

            firstname: '',
            lastname: '',
            email: '',
            adress: '',
            phone: '',
            picture: defaultPicture,
            dropdownOpen: false,
            path: "",
            fileName: "",
            enfants: [],
            curtime:0

        }
        //    this._getChildren(localStorage.getItem('id_user'));



    }
    componentDidMount() {
        setInterval( () => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
        },1000)
    }

    _getChildren = (id_user) => {
        fetch(url + '/users/' + id_user + '/children')
            .then(response => response.json())
            .then(json => {

                this.setState({ enfants: Object.values(json)});
                console.log(this.state.enfants);

            });
    }


    render() {
        return (

            <div className="container-fluid">

                <div className="container">

                    <div className="row mt-4">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 d-none d-xl-block">
                            <Userb> </Userb>
                        </div>


                        <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">

                            <div className="row mt-3">
                                <div className="col-md-12 mb-4">
                                    <Childcard enfants = {this.state.enfants}  ></Childcard>

                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 mb-4">
                                    <h2>Activités pour les enfants</h2>
                                </div>



                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <a href="" className="kidGames">
                                        <div className="picGames"><img
                                            src={require('../../assets/espace-parent/img/iconColoriage.png')} alt=""/>
                                        </div>
                                        <h4 className="titleGames">Coloriage</h4>
                                    </a>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <a href="" className="kidGames">
                                        <div className="picGames"><img
                                            src={require('../../assets/espace-parent/img/iconLogique.png')} alt=""/>
                                        </div>
                                        <h4 className="titleGames">Logique et réflexion</h4>
                                    </a>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <a href="" className="kidGames">
                                        <div className="picGames"><img
                                            src={require('../../assets/espace-parent/img/iconDessin.png')} alt=""/>
                                        </div>
                                        <h4 className="titleGames">Dessins à reproduire</h4>
                                    </a>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <a href="" className="kidGames">
                                        <div className="picGames"><img
                                            src={require('../../assets/espace-parent/img/iconMemoire.png')} alt=""/>
                                        </div>
                                        <h4 className="titleGames">Mémoire</h4>
                                    </a>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <a href="" className="kidGames">
                                        <div className="picGames"><img
                                            src={require('../../assets/espace-parent/img/iconAmusant.png')} alt=""/>
                                        </div>
                                        <h4 className="titleGames">Récréatifs et amusants</h4>
                                    </a>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <a href="" className="kidGames">
                                        <div className="picGames"><img
                                            src={require('../../assets/espace-parent/img/iconPuzzles.png')} alt=""/>
                                        </div>
                                        <h4 className="titleGames">Puzzles</h4>
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default parentBody;