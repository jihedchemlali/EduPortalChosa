import React, {Component} from 'react';

import '../../assets/espace-ecole/css/bootstrap.css';
import '../../assets/espace-ecole/css/styles.css';
import '../../assets/espace-ecole/css/line-awesome/line-awesome.css';
import Userb from './CentreSidebar';
import Childcard from '../child/childCardCenter';
import url from "../../confg-man";
import defaultPicture from "../../assets/espace-parent/img/photoProfilEcole.png";
import Header from './centreHeader';
import Footer from '../parent/parentFooter';
import ChildItem from "../child/childItem";


class centreBody extends Component {


    constructor(props) {
        super(props)
        this.state = {

            centerId:'',
            enfants: []
        }
            this._getData(localStorage.getItem('id_user'));



    }
    _getData = (id_user) => {
        fetch(url + '/users/' + id_user + '/centers')
            .then(response => response.json())
            .then(json => {
                this.setState({centerId: json.id});
                localStorage.setItem("id_center",json.id);



            });
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
        },1000)
    }



    render() {
        return (

            <div className="container-fluid">
                <Header/>

                <div className="container">

                    <div className="row mt-4">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 d-none d-xl-block">
                            <Userb> </Userb>
                        </div>


                        <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">

                            <div className="row mt-3">
                                <div className="col-md-12 mb-4">


                                    <Childcard  centerId={this.state.centerId}  ></Childcard>



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

export default centreBody;