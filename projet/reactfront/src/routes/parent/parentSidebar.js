import React, {Component} from 'react';

import '../../assets/espace-ecole/css/bootstrap.css';
import '../../assets/espace-ecole/css/styles.css';
import '../../assets/espace-ecole/css/line-awesome/line-awesome.css';
import parentHelpers from './parentHelpers';
import AuthHelperMethods from "../AuthHelperMethods";
import {Row,Col} from 'react-bootstrap'

import url from "../../confg-man";
import axios from "axios";
import defaultPicture from "../../assets/espace-ecole/img/photoProfilEcole.png";


class parentSidebar extends Component {

    constructor(props) {

        super(props)

        this.state = {

            firstname: '',
            lastname: '',
            email: '',
            adress: '',
            phone: '',
            facebookid: '',
            linkedid: '',
            picture: null,
            pic:defaultPicture

        }
        this._getData(localStorage.getItem('id_user'));

    }

    componentWillReceiveProps(nextProps) {
        //this._getData(localStorage.getItem('id_user'));

    }



    _handleChange = (event) => {
        const file = event.target.files[0]

        event.preventDefault();
        console.log('lllllllllllllll' + event.target.value);
        console.log('lllllllllllllll' + file);
        console.log('lllllllllllllll' + file.name);



        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        let formdata = new FormData();


        formdata.append('file', file,file.name);

        axios.patch(url + `/users/` + localStorage.getItem('id_user') + `/files`, formdata)//, {headers: headers}
            .then(res => {
                if (res === false) {
                    return alert("Sorry can't upload image!");
                }
                window.location.reload(true)
            })
    }

    _getData = (id_user) => {
        fetch(url + '/users/' + id_user)
            .then(response => response.json())
            .then(json => {
                this.setState({email: json.email});
                this.setState({firstname: json.prenom});
                this.setState({lastname: json.nom});
                this.setState({phone: json.phone});
                this.setState({adress: json.adress});
                if (json.user_picture_file!= null) {
                    this.setState({picture: json.user_picture_file});
                   this._getPicture(localStorage.getItem('id_user'));
                }


            });
    }
    _getPicture = (id_user) => {
        fetch(url+'/files/'+this.state.picture)
            .then(response => response.blob())
            .then(text =>{

                console.log( URL.createObjectURL(text) );
                this.setState({ pic: URL.createObjectURL(text) });



            });
    }
    render() {
        return (


                    <div className="detailEspace stickyElement">

                        <div className="photoNameDetailEspace">
                            <div className="nameDetailEspace">{this.state.firstname} {this.state.lastname}</div>
                            <div className="ageDetailEspace">{this.state.email}</div>

                            {/*<form>*/}
                            {/*<div className="photoDetailEspace">*/}


                            {/*    <div className="col-md-12">*/}
                            {/*        /!*<div className="form-group file">*!/*/}
                            {/*        /!*    /!*<a href='#formControlFile' className="editPhotoDetailEspace"><i className="fas fa-pen"></i></a>*!/*!/*/}


                            {/*        /!*    <img className="photoKidCards" width="110" height="110"  src={this.state.pic} alt=""/>*!/*/}
                            {/*        /!*    <label htmlFor="pic">*!/*/}
                            {/*        /!*        <i className="fa fa-paperclip fa-lg" aria-hidden="true"></i>*!/*/}
                            {/*        /!*    </label> <i className="fa fa-play fa-lg"></i>*!/*/}

                            {/*        /!*    <input  type="file" className="form-control-file"*!/*/}
                            {/*        /!*            id="formControlFiled" placeholder="Add profile picture" name="pic"*!/*/}
                            {/*        /!*            onChange={this._handleChange} />*!/*/}

                            {/*        /!*</div>*!/*/}

                            {/*        <div className="clip-upload">*/}
                            {/*            <img className="photoKidCards" width="110" height="110"  src={this.state.pic} alt=""/>*/}
                            {/*            <label htmlFor="formControlFiled">*/}
                            {/*                <i className="fas fa-pen"></i>*/}
                            {/*            </label> <i className="fa fa-play fa-lg"></i>*/}
                            {/*            <input type="file" className="form-control-file"*/}
                            {/*                   id="formControlFiled" placeholder="Add profile picture" name="pic"*/}
                            {/*                   onChange={this._handleChange} style={{display: "none"}}/>*/}
                            {/*                <div className="filename-container hide"></div>*/}

                            {/*        </div>*/}



                            {/*    </div>*/}

                            {/*</div>*/}

                            {/*</form>*/}

                            <form>
                                <div className="photoDetailEspace" style={{ height:'100' }} >


                                    <div className="col-md-12">
                                        <div className="form-group file">


                                            {/*<a href='#formControlFile' className="editPhotoDetailEspace"><i className="fas fa-pen"></i></a>*/}
                                            <img className="photoKidCards" src={this.state.pic} alt=""/>
                                            {/*<div className="editPhotoDetailEspace" style={{textAlign: 'right' }}>*/}
                                            <Row>
                                                <Col xs="6" sm="4"></Col>
                                                <Col xs="6" sm="4"></Col>
                                                <Col sm="4">  <label htmlFor="formControlFile"  >
                                                    <i className="fas fa-pen"  style={{ color: '#f6a766' }}></i>
                                                </label></Col>
                                            </Row>



                                            <input  type="file" className="form-control-file"
                                                    id="formControlFile" placeholder="Add profile picture" name="pic"
                                                    onChange={this._handleChange} style={{display: "none" }} />
                                            {/*</div>*/}

                                        </div>
                                    </div>
                                    {/*<input  type="file" className="form-control-file"*/}
                                    {/*        id="formControlFile" placeholder="Add profile picture" name="picture"*/}
                                    {/*        onChange={this._handleChange} onClick={this.upLoadImage} style={{display: "none"}}/>*/}
                                </div>

                            </form>

                        </div>.


                        <div className="infoEspace">
                            <ul>
                                <li>
                                    <img src={require('../../assets/espace-parent/img/map.svg')} alt=""/>
                                </li>
                                <li>
                                    {this.state.adress}
                                </li>
                                <li><img src={require('../../assets/espace-parent/img/mail.svg')}
                                         alt=""/> {this.state.email}
                                </li>
                                <li><img src={require('../../assets/espace-parent/img/telephone.svg')}
                                         alt=""/> +216 {this.state.phone}</li>

                            </ul>
                        </div>

                        <div className="addKid">
                            <a a href="/createchild">Ajouter un enfant</a>
                        </div>

                    </div>


        );
    }
}

export default parentSidebar;