import React, {Component} from 'react';
import {Container, Col, Row} from 'reactstrap'
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import axios from 'axios';
import Footer from '../parent/parentFooter';
import Header from '../parent/parenthead';
import AuthHelperMethods from "../AuthHelperMethods";
import url from "../../confg-man";
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter';
import defaultPicture from "../../assets/espace-parent/img/imgKid.png";
import { Redirect } from 'react-router';


class childsidebar extends Component {


    _getPicture = (id_user) => {
        fetch(url+'/files/'+this.props.item.picture)
            .then(response => response.blob())
            .then(text =>{
                console.log( URL.createObjectURL(text) );
                this.setState({ pic: URL.createObjectURL(text) });
                this.setState({ pictureupdate: URL.createObjectURL(text) });
            });
    }


    constructor(props) {

        super(props)
        var year = new Date(this.props.item.birth_date);
        var curyear = new Date().getFullYear();
        var aged= curyear - year.getFullYear() + 1;

        this.state = {
            prenom: this.props.item.prenom,
            birth_date: this.props.item.birth_date,
            enfants: [],
            picture: defaultPicture,
            pictureupdate:this.props.item.picture,
            pic:null,
            showdelete: false,
            showmodif: false,
            age:aged,
            pictoupdateCondition:false,
            redirect:false
        }
        console.log('fffffffffffffff' + this.props.item.picture)
        if (this.props.item.picture!=null){
            this._getPicture(localStorage.getItem('id_user'));

        }


    }


    showModaldelete = () => {
        this.setState({ showdelete: true });
    };

    hideModaldelete = () => {
        this.setState({ showdelete: false });
    };

    showModalmodif = () => {
        this.setState({ showmodif: true });
    };

    hideModalmodif = () => {
        this.setState({ showmodif: false });
        this.setState({ prenom: this.props.item.prenom});

    };
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }


    deletechild = (idhild) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }


        axios.delete(url+`/children/`+idhild)

            .then(res => {
                if (res === false) {
                    return alert("Sorry error : deleting child!");
                }
                window.location.reload();
            })
            .catch(err => {
                alert(err);
            })

    }
    handledelete = (e) => {

        e.preventDefault();
        this.deletechild(this.props.item.id)

    }

    _handleChangePicture = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.files[0]
            }
        )
        this.setState(
            {
                pictoupdateCondition: true
            }
        )
    }
    avatarEnfant = (event) => {




        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }


        let formdata = new FormData();

        if  (this.state.pictoupdateCondition) {
            formdata.append('file', this.state.pictureupdate, "profilpic.jpg");
        } else {
            formdata.append('file', this.state.pic, "profilpic.jpg");
        }
        axios.patch(url + `/children/` + this.props.item.id + `/files`, formdata)//, {headers: headers}
            .then(res => {
                if (res === false) {
                    return alert("Sorry can't upload image!");
                }
                //window.location.reload(true)
            })
    }

    upatechild = () => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }



        const child = {
            id:this.props.item.id,
            prenom: this.state.prenom,
            birth_date: this.state.birth_date,
            sexe:this.props.item.sexe,
            status:this.props.item.status,
            parent:this.props.item.parent

        };


        axios.patch(url+`/children/`+this.props.item.id,  child)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't update user !");
            }
            //window.location.reload();
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })

        /*      var bodyFormData = new FormData();
              bodyFormData.append('file', this.state.pictureupdate  );
              axios.patch(url + `/children/` +this.props.item.id, + `/files`, bodyFormData)

              axios({
                  method: 'patch',
                  url: url + `/children/` +this.props.item.id + `/files`,
                  data: bodyFormData,
                  config: { headers: {'Content-Type': 'multipart/form-data','Authorization': 'Bearer '+  localStorage.getItem('id_token')
                      }}
              })
                  .then(function (response) {
                      console.log(response);
                  })
                  .catch(function (response) {
                      console.log(response);
                  });
              else  console.log("no image")
      */



        // this.avatarEnfant(this.props.item.id);

        //if  (this.state.pictoupdateCondition){

        this.avatarEnfant(this.props.item.id)
        window.location.reload();

        /* }
         else{
             this._getPicture(this.props.item.id)
             console.log('pic wil not be updated' + this.state.pictureupdate + 'older pic ' + this.state.pic )
            // window.location.reload();
         }*/
    }

    handlemodif = (e) => {

        e.preventDefault();
        this.upatechild(this.props.item.id)

    }

    redirectToActivity = () => {

        this.setState({ redirect: true});



    }
    render() {

        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/child/actuality',
                state: {child: this.state.child}
            }}
            />
        }


        return (


            <div className="kidCards">


                <div className="photoKidCards">
                    <a href="./activites-enfant.html" className="infoKid"><i className="fas fa-info"/></a>

                    {this.props.item.picture == null ? (
                        <img src={this.state.picture} alt="" onClick={this.redirectToActivity} />
                    ) : (
                        <img src={this.state.pic} alt="" onClick={this.redirectToActivity}/>
                    )}


                </div>
                <div className="nameKidCards">
                    <a href="#" data-toggle="modal" data-target="#editKid"><i
                        className="fas fa-pen" onClick={this.showModalmodif} style={{ color: '#f6a766' }}/></a>
                    <h4>{this.state.prenom}</h4>


                </div>
                <div className="ageKidCards">

                    {this.state.age>1 ? (
                        <h4>{this.state.age} <nbsq/> ans</h4>
                    ) : (
                        <h4>{this.state.age} <nbsq/> an</h4>
                    )}


                </div>


            </div>


        );
    }
}

export default childsidebar;