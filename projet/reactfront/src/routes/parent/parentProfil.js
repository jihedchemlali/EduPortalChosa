import React, {Component} from 'react';
import '../../assets/espace-parent/css/bootstrap.css';
import '../../assets/espace-parent/css/styles.css';
import '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import Footer from './parentFooter';
import Header from './parenthead';
import SideBar from './parentSidebar';
import defaultPicture from "../../assets/espace-parent/img/photoProfilParent.png";
import url from "../../confg-man";
import axios from "axios";


class parentProfil extends Component {

    constructor(props) {

        super(props)
        this.state = {

            prenom: '',
            nom: '',
            email: '',
            birth_date: '',
            adress: '',
            phone: '',
            facebook: '',
            country: '',
            ville: '',
            picture: null,
            google:''
        }
        this._getData(localStorage.getItem('id_user'));
    }

    // componentWillReceiveProps(nextProps) {
    //     this._getData(localStorage.getItem('id_user'));
    //
    // }

    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    // _handleChangePicture = (e) => {
    //     this.setState(
    //         {
    //             [e.target.name]: e.target.files[0]
    //         }
    //     )
    // }
    // avatarParent = (event) => {
    //
    //     var headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    //     }
    //
    //
    //     let formdata = new FormData();
    //
    //     if  (this.state.picture!=null) {
    //         formdata.append('file', this.state.picture, "profilpic.jpg");
    //         /*} else {
    //             formdata.append('file', this.state.pic, "profilpic.jpg");
    //         }*/
    //         axios.patch(url + `/users/` + localStorage.getItem('id_user') + `/files`, formdata)//, {headers: headers}
    //             .then(res => {
    //                 if (res === false) {
    //                     return alert("Sorry can't upload image!");
    //                 }
    //                 //window.location.reload(true)
    //             })
    //     }
    // }

    updateParent = (prenom, nom , birth_date , email ,  adress ,  phone , facebook , country , ville , picture) => {


        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }
        const parent = {
            prenom: this.state.prenom,
            nom: this.state.nom,
            birth_date: this.state.birth_date,
            email: this.state.email,
            adress: this.state.adress,
            phone: this.state.phone,
            facebook_Id: this.state.facebook,
            country: this.state.country,
            ville: this.state.ville,
            google_Id: this.state.google

        };

        axios.patch(url+`/users/`+localStorage.getItem('id_user'),  parent)

            .then((response) => {

            }).then(res => {
            if (res === false) {
                return alert("Sorry can't update user !");
            }
            if (localStorage.getItem('role_user') =='ROLE_FORMATION' ){

                // this.props.history.replace('/centrePanel');
                window.location.reload();

            }
            else{

                // this.props.history.replace('/parentPanel');
                window.location.reload();

            }
        })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })

       // this.avatarParent();

    }
    handleFormSubmit = (e) => {

        e.preventDefault();
        console.log ( " content of picture " + this.state.picture);
        this.updateParent(this.state.prenom, this.state.nom , this.state.birth_date , this.state.email ,  this.state.adress ,  this.state.phone , this.state.facebook_id , this.state.country , this.state.ville , this.state.picture)

    }
    handleRedirect = (e) => {

        if (localStorage.getItem('role_user') =='ROLE_FORMATION' ){

        this.props.history.replace('/centrePanel');

    }
    else {

            this.props.history.replace('/parentPanel');
        }
    }


    _getData = (id_user) => {
        fetch(url + '/users/' + id_user)
            .then(response => response.json())
            .then(json => {
                this.setState({email: json.email});
                this.setState({prenom: json.prenom});
                this.setState({nom: json.nom});
                this.setState({birth_date: json.birth_date});
                this.setState({adress: json.adress});
                this.setState({phone: json.phone});
                this.setState({facebook: json.facebook_Id});
                this.setState({google: json.google_Id});
                this.setState({country: json.country});
                this.setState({ville: json.ville});

            });
    }


    render() {

         var curr = new Date();
         var date = curr.toISOString().substr(0,10);



        //
        //  var curr = new Date( this.state.birth_date).get;
        // // var date = curr.toISOString().substr(0,10);
        //  var date = curr.toISOString();
        //

        //  let day = this.state.birth_date.substr(8,2);
        //  let month =this.state.birth_date.substr(5,2);
        //  let year = this.state.birth_date.substr(0,4);
        //
        //  var curr = new Date( parseInt(month),parseInt(day),parseInt(year));
        // //var date = curr.toISOString();
        return (
            <div >
                <Header/>
                <div className="container-fluid">

                <div className="container">
                    <div className="row d-flex justify-content-center mt-4">
                        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="contentDefaultPage">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-11 mb-4">
                                        <h2>Mon profil</h2>
                                    </div>


                                    <div className="col-md-11 formDefault">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Nom</label>
                                                        <input type="text" className="form-control" id="validationName"
                                                               name="nom" onChange={this._handleChange}
                                                               aria-describedby="input-group-prepend" placeholder
                                                               defaultValue={this.state.nom} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Prénom</label>
                                                        <input type="text" className="form-control"
                                                               id="validationPrenom"
                                                               name="prenom" onChange={this._handleChange}
                                                               aria-describedby="input-group-prepend" placeholder
                                                               defaultValue={this.state.prenom}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Date de naissance</label>
                                                        <input type="date" className="form-control"
                                                               name="birth_date" onChange={this._handleChange}
                                                               id="validationDateNaissance"
                                                               aria-describedby="input-group-prepend" defaultValue={date}placeholder=""/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Pays</label>
                                                        <input type="text" className="form-control" id="validationPays"
                                                               name="country" aria-describedby="input-group-prepend"
                                                               onChange={this._handleChange} defaultValue={this.state.country} placeholder/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Ville</label>
                                                        <input type="text" className="form-control" id="validationVille"
                                                               name="ville" aria-describedby="input-group-prepend"
                                                               onChange={this._handleChange} defaultValue={this.state.ville}placeholder/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Adresse</label>
                                                        <input type="text" className="form-control"
                                                               id="validationAdresse"
                                                               name="adress" aria-describedby="input-group-prepend"
                                                               onChange={this._handleChange} defaultValue={this.state.adress}placeholder/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Adresse e-mail</label>
                                                        <input type="email" className="form-control" id="validationMail"
                                                               name="email" aria-describedby="input-group-prepend"
                                                               onChange={this._handleChange} placeholder
                                                               defaultValue={this.state.email}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Téléphone</label>
                                                        <input type="number" className="form-control" id="validationTel"
                                                               name="phone" aria-describedby="input-group-prepend"
                                                               onChange={this._handleChange} defaultValue={this.state.phone} placeholder/>
                                                    </div>
                                                </div>
                                                {/*<div className="col-md-6">*/}
                                                {/*    <div className="form-group file">*/}
                                                {/*        <span>Votre photo</span>*/}
                                                {/*        <input type="file" className="form-control-file"*/}
                                                {/*               name="picture" id="formControlFile"*/}
                                                {/*               onChange={this._handleChangePicture}*/}
                                                {/*               placeholder="Add profile picture"/>*/}
                                                {/*        <label htmlFor="formControlFile">Choisir votre photo</label>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Facebook</label>
                                                        <input type="text" className="form-control" id="validationFb"
                                                               name="facebook" onChange={this._handleChange}
                                                               aria-describedby="input-group-prepend" defaultValue={this.state.facebook} placeholder/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Google</label>
                                                        <input type="text" className="form-control" id="validationFb"
                                                               name="google" onChange={this._handleChange}
                                                               aria-describedby="input-group-prepend" defaultValue={this.state.google} placeholder/>
                                                    </div>
                                                </div>



                                            </div>





                                            <div className="row d-flex justify-content-center mt-4">
                                                <div className="col-md-5">
                                                    <div className="row">
                                                        <div className="col-md-6 mr-auto mb-3">
                                                            <button type="submit" className="btn save"
                                                                    onClick={this.handleFormSubmit}>Enregistrer
                                                            </button>
                                                        </div>


                                                        <div className="col-md-6 ml-auto mb-3">
                                                            <button type="submit" className="btn cancel" onClick={this.handleRedirect}>Annuler
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

export default parentProfil;
