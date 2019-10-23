import React, {Component} from 'react';

import '../../assets/espace-ecole/css/bootstrap.css';
import '../../assets/espace-ecole/css/styles.css';
import '../../assets/espace-ecole/css/line-awesome/line-awesome.css';
import parentHelpers from '../parent/parentHelpers';
import AuthHelperMethods from "../AuthHelperMethods";

import url from "../../confg-man";
import axios from "axios";
import defaultPicture from "../../assets/espace-parent/img/photoProfilParent.png";


class centreSidebar extends Component {

    constructor(props) {

        super(props)

        this.state = {

            id: 0,
            name: '',
            logo: '',
            address: '',
            ville: '',
            country:'',
            phone: '',

            picture: null,
            pic:defaultPicture,


            centerID:null

        }
        this._getData(localStorage.getItem('id_user'));

    }

 /*  componentWillReceiveProps(nextProps) {
        this._getData(localStorage.getItem('id_user'));

    }*/


    _handleChange = (event) => {
        const file = event.target.files[0]

        event.preventDefault();

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        let formdata = new FormData();


        formdata.append('file', file,file.name);

        axios.patch(url + `/centers/` + this.state.centerID + `/files`, formdata)//, {headers: headers}
            .then(res => {
                if (res === false) {
                    return alert("Sorry can't upload image!");
                }
                window.location.reload(true)
            })
    }

    _getData = (id_user) => {
        fetch(url + '/users/' + id_user + '/centers')
            .then(response => response.json())
            .then(json => {
                this.setState({country: json.country});
                this.setState({ville: json.ville});
                this.setState({address: json.address});
                this.setState({logo: json.logo});
                this.setState({name: json.name});
                this.setState({centerID: json.id});
                this.setState({phone: json.phone});


                if (json.logo!= null) {
                    this.setState({logo: json.logo});
                    this._getPicture(this.state.centerID);
                }


            });
    }
    _getPicture = (id_center) => {
        fetch(url+'/files/'+id_center)
            .then(response => response.blob())
            .then(text =>{

                console.log( URL.createObjectURL(text) );
                this.setState({ pic: URL.createObjectURL(text) });



            });
    }
    render() {
        return (


            <div className="detailEspace stickyElement">

                <div className="photoNameDetailEspace"  style={{ backgroundColor :'#6fc8bc' }}>
                    <div className="nameDetailEspace">{this.state.name} </div>
                    <div className="ageDetailEspace" >{this.state.email}</div>

                    <form>
                        <div className="photoDetailEspace">


                            <div className="col-md-12">
                                <div className="form-group file">


                                    <a href='#formControlFile' className="editPhotoDetailEspace"><i className="fas fa-pen" style={{ color: '#f6a766' }}></i></a>
                                    <img className="photoKidCards" width="110" height="110"  src={this.state.pic} alt=""/>
                                    <input  type="file" className="form-control-file"
                                            id="formControlFile" placeholder="Add profile picture" name="pic"
                                            onChange={this._handleChange} />


                                </div>
                            </div>
                            <input  type="file" className="form-control-file"
                                    id="formControlFile" placeholder="Add profile picture" name="picture"
                                    onChange={this._handleChange} onClick={this.upLoadImage}/>
                        </div>

                    </form>
                </div>.


                <div className="infoEspace" >
                    <ul>
                        <li>
                            <img src={require('../../assets/espace-parent/img/map.svg')} alt=""/>
                        </li>
                        <li>
                            {this.state.adress}
                        </li>
                        <li><img src={require('../../assets/espace-parent/img/mail.svg')}
                                 alt=""/> {localStorage.getItem('id_user')}
                        </li>
                        <li><img src={require('../../assets/espace-parent/img/telephone.svg')}
                                 alt=""/> +216 {this.state.phone}</li>

                    </ul>
                </div>



            </div>


        );
    }
}

export default centreSidebar;