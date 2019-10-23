import React, {Component} from 'react';

import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import Footer from './parentFooter';
import Header from './parenthead';
import url from "../../confg-man";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


class parentResetPassword extends Component {
    constructor(props) {

        super(props)
        this.state = {

            oldPassword:'' ,
            userPassword: '',
            confirmPassword:''

        }

    }

    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }





    updateParentPassword = async (event) => {

        event.preventDefault();

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),

        }
        const parent = {
            userPassword: this.state.userPassword
        };
        let oldPassword= this.state.oldPassword;


        console.log('old mdp'+this.state.oldPassword +' new mdp ' + this.state.userPassword + ' confirmed mdp ' + this.state.confirmPassword )


          await  axios.patch(url + `/users/` + localStorage.getItem('id_user') + '/reset-password', parent, { params: {
                    oldPassword:oldPassword
                }})
                .then(response => {
                    return  toast.success("password reset");
                    response.json()
                })
                .then(json =>{
                    // alert('done');
                    // localStorage.setItem("oldPassword",this.state.userPassword);




                }).catch(err => {
                  toast.error("can't reset thispassword!");
              })
              .catch((error) => {
                  toast.error("can't reset password !");

              })

          ;


    }


    handleRedirect = (e) => {

        if (localStorage.getItem('role_user') =='ROLE_FORMATION' ){

            this.props.history.replace('/centrePanel');

        }
        else {

            this.props.history.replace('/parentPanel');
        }
    }



    render() {
        return (


            <div>

                <Header/>
                <ToastContainer />

                <div className="container-fluid">
                    <div className="container">
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="contentDefaultPage">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-11 mb-4">
                                            <h2>Réinitialiser votre mot de passe </h2>
                                        </div>
                                        <div className="col-md-11 formDefault">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Ancien Mot de
                                                                passe</label>
                                                            <input type="password" className="form-control"
                                                                   id="validationPassword"
                                                                   aria-describedby="input-group-prepend" placeholder
                                                                   defaultValue={this.state.oldPassword} name="oldPassword"
                                                                   onChange={this._handleChange}/>
                                                        </div>
                                                    </div>
                                                    <br/>>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Nouveau Mot de
                                                                passe</label>
                                                            <input type="password" className="form-control"
                                                                   id="validationPassword"
                                                                   aria-describedby="input-group-prepend" placeholder
                                                                   name="userPassword"
                                                                   onChange={this._handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Confimer Nouveau Mot de
                                                                passe</label>
                                                            <input type="password" className="form-control"
                                                                   id="validationPassword"
                                                                   aria-describedby="input-group-prepend" placeholder
                                                                   name="confirmPassword"
                                                                   onChange={this._handleChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row d-flex justify-content-center mt-4">
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <div className="col-md-6 mr-auto mb-3">
                                                                <button type="submit" className="btn save" onClick={this.updateParentPassword} >Enregistrer
                                                                </button>
                                                            </div>
                                                            <div className="col-md-6 ml-auto mb-3">
                                                                <button type="submit" className="btn cancel"onClick={this.handleRedirect}>Annuler
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
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

export default parentResetPassword;
