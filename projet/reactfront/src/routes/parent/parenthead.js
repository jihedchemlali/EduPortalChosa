import React   , { Component }  from 'react';

import  '../../assets/espace-parent/css/bootstrap.css';
import  '../../assets/espace-parent/css/styles.css';
import  '../../assets/espace-parent/css/line-awesome/line-awesome.css';
import {ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import AuthHelperMethods from "../AuthHelperMethods";
import url from "../../confg-man";
import defaultPicture from '../../assets/espace-parent/img/photoProfilParent.png';
import axios from 'axios';
import notificationService from "../BusinessLayer/notificationService";
import CenterItem from "../centre/centerItem";
//  import DataList from "../centre/search/DataList";
//  import DataListInput from 'react-datalist-input';
// import ChildItem from "../child/childItem";
//
import * as ReactBootstrap from 'react-bootstrap';
import NotificationCard from "../Notification/notificationCard";
import NonLu from "../Notification/nonLu";
import SearchBody from "../searchResults/searchBody";
import {Redirect} from 'react-router';


class parentHeader extends Component{

    notificationService=new notificationService();
    constructor(props){

        super(props)
        this.toggle = this.toggle.bind(this);
        this.toggleNotif = this.toggleNotif.bind(this);

        this.state = {

            firstname: '',
            lastname: '',
            email:'',
            adress:'',
            phone:'',
            picture:defaultPicture,
            dropdownOpen: false,
            dropdownNotif: false,
            path:"",
            fileName:"",
            pic:null,
            notifsnonlu:0,
            notifs:'',
            centers : null,
            searchString:'',
            redirect:false
        }
        this._refreshNonLu = this._refreshNonLu.bind(this)
        this._getData(localStorage.getItem('id_user'));
        this._getPicture(localStorage.getItem('id_user'));
        this._getNonLu(localStorage.getItem('id_user'));
        this._getCenters();
        // console.log ( 'arrayy of converted ' + this.state.notifs);


    }
    _getNonLu = (userId ) => {

        axios.get(url+'/notifications/maxSize?userId=' + userId + '&status=NON_LUS')

            .then((response) => {
                this.setState({notifsnonlu: response.data});
            })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert(error);

            })

}
    _refreshNonLu = async () => {

        let res = await axios.get(url+'/notifications/maxSize?userId=' + localStorage.getItem('id_user') + '&status=NON_LUS');
        let { data } = res;
        console.log('this is the change value' + data);
        this.setState({ notifsnonlu: data });

    }

/////////////////////////////Center lookup + keydown Enter + handle change to 3 chars
//     _getCenters = (name) => {
//         fetch(url + '/centers/search?name='+name+'&offset=0&size=0' , { params: {
//                 offset:0,
//                 size:0
//             }})
//             .then(response => response.json())
//             .then(json => {
//
//                 this.setState({ centers: Object.values(json)});
//                 console.log(this.state.centers);
//
//             });
//     }

    _getCenters = async (name) => {
        let response = await fetch(url + '/centers/search?name='+name+'&offset=0&size=0' , { params: {
               offset:0,
                size:0
             }});
        let data = await response.json()
        return data;
    }

    _handleKeyDown= (e) => {
        if (e.key === 'Enter' && this.state.searchString.length>2) {
            this._getCenters(this.state.searchString)
            console.log ('last' + this.state.centers);
        }
    }
    _handleChange = async (e) => {
        e.preventDefault();
       await  this.setState(
            {
                [e.target.name]: e.target.value
            }
        )


        console.log ('changed string--' + this.state.searchString+'length'+this.state.searchString.length);

          if (this.state.searchString.length>2) {
            await this._getCenters(this.state.searchString).then(data => this.setState({ centers: JSON.stringify(data)}))
              this.setState({redirect: true});

              console.log ('last' + this.state.centers);
         }
        if (e.key === 'Enter' && this.state.searchString.length>2) {
            await this._getCenters(this.state.searchString).then(data => this.setState({ centers: JSON.stringify(data)}))
            console.log('searchstring is ' + this.state.searchString);

            {/*return <Redirect to={{*/
            }
            {/*    pathname: '/search',*/
            }
            {/*    state: {centres: this.state.centres}*/
            }
            {/*}}*/
            }
            {/*/>*/
            }
            this.setState({redirect: true});



        }


    }
    // handleFormSubmit = (e) => {
    //
    //     e.preventDefault();
    //     this.addActuality(this.state.file,this.state.commentaire);
    // }

////////////////////////////////////////////////////////////

    _getNotifications2 = (userId ) => {

        axios.get(url+'/notifications/maxSize?userId=' + userId + '&status=NON_LUS')

            .then((response) => {
                this.setState({notifs: response.data});
            })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert(error);

            })

    }

    _getNotifications = (userId) => {

        fetch(url + '/notifications?userId=' + userId + '&size=5&offset=1')
            .then(response => {
                response.json()

            })
            .then(json => {
                this.setState({ notifs: Object.values(json)});
                console.log ( 'arrayy of ' + this.state.notifs);

                return Object.values(json); // check the return : array notifs
            });
    }
    /*_getImage = (idimage ) => {
// to be discarded in cas the other imp works

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+  localStorage.getItem('id_token')
        }

        axios.get(url+`/files/2`)

            .then(res => {
                if (res === false) {
                    return alert("Sorry can't error retrieving image !");
                }
                console.log (res.fileName + 'hhhhhh' + res.path);

                // this.setState({picture: res.user_picture_file});
            })
            .catch(err => {
                alert(err);
            })
            .catch((error) => {
                alert ("error")
            })

    }
    _fetchImage = (idimage ) => {
// to be discarded in cas the other imp works


        fetch(url+'/files/'+idimage)
            .then(response => response.json())
            .then(json =>{
                this.setState({ path: json.path });
                this.setState({ fileName: json.fileName });

                    console.log (' file path ' + json.toString());
                    console.log ('file name ' + json.fileName);

               // this._getImage( json.user_picture_file);


            });

    }
*/
    ///////////////////////////////////////////////////////////////////
    _getData = (id_user) => {
        fetch(url+'/users/'+id_user)
            .then(response => response.json())
            .then(json =>{
                this.setState({ email: json.email });
                this.setState({ firstname: json.prenom });
                this.setState({ lastname: json.nom });
                this.setState({ adress: json.adress });
                if (json.user_picture_file!= null) {
                    this.setState({picture: json.user_picture_file});
                    this._getPicture(localStorage.getItem('id_user'));
                }
                console.log('eeeeee'+this.state.picture)


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
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    toggleNotif() {
        this.setState(prevState => ({
            dropdownNotif: !prevState.dropdownNotif
        }));
    }

    Auth = new AuthHelperMethods();

    _handleLogout = () => {
        this.Auth.logout()
        window.location.replace('/');
    }
    _handleRedirectTo = () => {
        window.location.replace('/notifications');
    }



    render(){

    // .map(center=> ({id: center.id, value: center.name}))
    //     if (this.state.redirect === true) {
    //         return    <Redirect to={{pathname: '/search',state: {centres: this.state.centers }}}/>;
    //
    //     }


        return (

            <div className="parentHeader">
                {this.state.redirect ? ( <Redirect to={{pathname: '/testChild' ,  state: {centres: this.state.centers ,  searchString:this.state.searchString }}}/> ) : (<div></div>)}


                <div className="container-fluid bgHeaderContainer ">
                    <div className="container-fluid bgHeader d-flex align-items-center justify-content-center">

                        <div className="container headerTop d-flex align-items-stretch">
                            <div className="row d-flex align-items-center justify-content-between h-100 w-100">
                                <div className="col-xl-2 col-lg-2 col-md-3 col-12">
                                    <div className="logoEspace">
                                        <a href="/">
                                            <img src={require('../../assets/espace-parent/img/chosa-white.svg')} alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-10 col-lg-10 col-md-9 col-12 d-flex justify-content-end">

                                    <form>

                                        <div className="form-group rechercheHeader mr-5" >
                                            <input type="text" className="form-control" id="recherche" name="searchString"
                                                   list="dynmicUserIds"
                                                   autoComplete="off" placeholder="Rechercher..." onKeyUp={this._handleChange}  />

                                                   
                                            {/*<datalist id="dynmicUserIds"*/}
                                            {/*         >*/}


                                            {/*    {this.state.centers !=null ? (*/}

                                            {/*        <div>*/}
                                            {/*            {this.state.centers.filter(item => item.name.includes(this.state.searchString)).map((item, key) =>*/}
                                            {/*                {console.log("name"+ item.name)}*/}
                                            {/*            )}*/}
                                            {/*        </div>*/}

                                            {/*    ) : (<option>2 </option>)}*/}


                                            {/*    /!*this.state.enfants.map((item, key) =>*!/*/}
                                            {/*    /!*<ChildItem item={item} key={item.id}  center={this.state.centerID}/>*!/*/}
                                            {/*    /!*)*!/*/}

                                            {/*</datalist>*/}
                                        </div>

                                    </form>

                                    {/*<div className="notifHeader d-flex align-items-center justify-content-center mr-5">*/}
                                    {/*    <i className="la la-bell"></i>*/}

                                    {/*        {parseInt(this.state.notifsnonlu) != 0 ? (*/}
                                    {/*            <span*/}
                                    {/*                className="infoNotif d-flex align-items-center justify-content-center">*/}
                                    {/*                {this.state.notifsnonlu}*/}
                                    {/*            </span>*/}
                                    {/*        ) : (<p> </p>)}*/}


                                    {/*</div>*/}

                                    {/*<div className="dropdown notifContent">*/}
                                    {/*    <a href className="notifHeader d-flex align-items-center justify-content-center mr-5" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                                    {/*        <i className="la la-bell" />*/}
                                    {/*        <span className="infoNotif d-flex align-items-center justify-content-center">{this.state.notifsnonlu}</span>*/}
                                    {/*    </a>*/}
                                    {/*    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">*/}
                                    {/*        <div className="notifTop">*/}
                                    {/*            Vos notifications*/}
                                    {/*        </div>*/}
                                    {/*        <div className="notifBody">*/}
                                    {/*            <a href="#">Nulla consequat ultricies nulla vitae</a>*/}
                                    {/*            <a href="#">Phasellus ut leo et erat rutrum</a>*/}
                                    {/*            <a href="#">Cras finibus, nisi sed mattis</a>*/}
                                    {/*            <a href="#">Vivamus a eros quis felis lacinia</a>*/}
                                    {/*            <a href="#">Fusce sit amet lectus suscipit</a>*/}
                                    {/*            <a href="#">Donec dapibus mauris id placerat</a>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="d-flex justify-content-center mt-3">*/}
                                    {/*            <button type="button" className="btn btn-primary seeAll">Voir tous</button>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}



                                    <div className="dropdown notifContent">
                                        {/*<a href className="notifHeader d-flex align-items-center justify-content-center mr-5" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >*/}
                                        {/*    <i className="la la-bell" />*/}
                                        {/*    <span className="infoNotif d-flex align-items-center justify-content-center">{this.state.notifsnonlu}</span>*/}
                                        {/*</a>*/}
                                        <ButtonDropdown isOpen={this.state.dropdownNotif} toggle={this.toggleNotif} className="dropdown" >
                                            <DropdownToggle  color="transparent"  >
                                                {/*<div className="dropdown notifContent">*/}
                                                {/*<a href className="notifHeader d-flex align-items-center justify-content-center mr-5" role="DropdownToggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >*/}
                                                {/*    <i className="la la-bell" />*/}
                                                {/*    <span className="infoNotif d-flex align-items-center justify-content-center">{this.state.notifsnonlu}</span>*/}
                                                {/*</a>*/}
                                                {/*</div>*/}

                                                <NonLu notifsnonlu={this.state.notifsnonlu}/>

                                            </DropdownToggle>
                                            <DropdownMenu  >
                                                <DropdownItem header>
                                                    <div className="notifTop">
                                                        Vos notifications
                                                    </div>
                                                </DropdownItem>

                                                <NotificationCard user={localStorage.getItem('id_user')} location="dropdown" _refreshNonLu={this._refreshNonLu} />


                                                <DropdownItem divider/>
                                                <DropdownItem className="d-flex justify-content-center mt-3">
                                                    <button type="button"
                                                            className="btn btn-primary logoutProfil"
                                                            onClick={this._handleRedirectTo}
                                                    >Voir Tous
                                                    </button>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>



                                    </div>


                                    <div className="profilHeader d-flex align-items-center">
                                        <a className="nameProfil mr-2">Bonjour {this.state.firstname} {this.state.lastname}</a>
                                        <a className="photoProfil mr-2"><img src={this.state.pic} width="50" height="50"  alt=""/>
                                        </a>

                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown">
                                            <DropdownToggle   color="transparent">
                                                <i className="fas fa-angle-down"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem header>


                                                    <div className="profilDropdown d-flex align-items-center pr-3 pl-3 pt-3 pb-3 mb-2">
                                                    <div  className="photoProfilDropdown mr-3" ><img src={this.state.pic}   alt=""/></div  >
                                                    <a className="nameProfilDropdown">{this.state.firstname} {this.state.lastname}</a>
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <a className="LinkDropdownProfil d-flex align-items-center"href="/parent/password"><i
                                                        className="la la-user pr-2"></i> Mon
                                                        profil</a>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <a className="LinkDropdownMsg d-flex align-items-center" href="#"><i
                                                        className="la la-envelope-o pr-2"></i>
                                                        Messages</a>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <a className="LinkDropdownSetting d-flex align-items-center" href="/parent/profil"><i
                                                        className="la la-gear pr-2"></i>
                                                        Paramètres</a>
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                                <DropdownItem className="d-flex justify-content-center mt-3">
                                                    <button type="button"
                                                            className="btn btn-primary logoutProfil"
                                                            onClick={this._handleLogout}
                                                    >Déconnexion
                                                    </button>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>

                                    </div>

                                </div>


                            </div>

                        </div>
                    </div>
                </div>




            </div>



        );
    }}

export default parentHeader;