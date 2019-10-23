import {Component, OnInit} from '@angular/core';
import {Child} from "../../models/Child";
import {Ecole} from "../../models/Ecole";
import {EcoleService} from "../../services/ecole.service";
import {ChildService} from "../../services/child.service";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: [
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css',
    './accueil.component.css',]
})
export class AccueilComponent implements OnInit {

  userId: number;
  ecole: Ecole;
  children: Child[];
  selectedChild: Child;
  nomChildComplet: string = '';

  constructor(private ecoleService: EcoleService, private childService: ChildService, private tokenStorage: TokenStorageService, private userService: UserService, private toastr: ToastrService) {
    this.children = new Array();
  }

  ngOnInit() {
    this.userId = this.tokenStorage.getCurrentUser();
    this.getEcole();
  }

  private getChildrenOfCenters(offset: number = 1) {
    this.ecoleService.getChildrenOfCenters(this.ecole.id, offset, this.sizePerPage).then(data => {
      this.children = data;
      this.currentPage = offset;
    }).catch(
      (error) => {
      });
  }

  removeChildFromEcole() {
    this.ecoleService.deleteChild(this.selectedChild.id).then(data => {
      this.toastr.success("enfant retiré avec succées", "");
      this.getEcole();
    });
  }

  retirerEnfant(child: Child) {
    this.selectedChild = child;
    this.userService.getUser(this.selectedChild.parent).then((data: any) => {
      this.nomChildComplet = this.selectedChild.prenom + ' ' + data.nom;
    });
  }

  getEcole() {
    this.ecoleService.getUserEcole(this.userId).then(
      (data: any) => {
        this.ecole = data;
        this.getChildrenOfCenters(this.currentPage);
        this.initialisePagination();
      }
    );
  }

  refuserDemande() {
    this.selectedChild.status = 'REFUSED';
    this.childService.updateChild(this.selectedChild, null, 'notify').then(data => {
      this.toastr.success("Demande rejeté !");
      this.getEcole();
    });
  }

  currentPage: number = 1;
  maxSize: any = 0;
  sizePerPage: number = 6;
  lengthPagination: number = 0;

  private initialisePagination() {
    this.ecoleService.getSizeOfChildrenOfCenters(this.ecole.id).then(data => {
      this.maxSize = data;
      this.lengthPagination = this.maxSize / this.sizePerPage;
      if (this.lengthPagination > Math.trunc(this.lengthPagination)) this.lengthPagination = Math.trunc(this.lengthPagination) + 1;
    }).catch(
      (error) => {
      });
  }

  setSizePerPage(value: any) {
    this.currentPage = 1;
    this.sizePerPage = value;
    this.lengthPagination = this.maxSize / this.sizePerPage;
    if (this.lengthPagination > Math.trunc(this.lengthPagination)) {
      this.lengthPagination = Math.trunc(this.lengthPagination) + 1;
    }
    this.getChildrenOfCenters(this.currentPage);
  }
}
