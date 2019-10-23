import {Component, Input, OnInit} from '@angular/core';
import {Child} from "../../models/Child";
import {EcoleService} from "../../services/ecole.service";
import {Ecole} from "../../models/Ecole";
import {ChildService} from "../../services/child.service";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-adherer-enfant-modal',
  templateUrl: './adherer-enfant-modal.component.html',
  styleUrls: ['./adherer-enfant-modal.component.css',
    '../../../assets/front/css/toastr.css']
})
export class AdhererEnfantModalComponent implements OnInit {
  @Input() selectedChild: Child;
  selectedCenter: Ecole;
  centers: Ecole[];
  searchText;
  selectedElements:NodeListOf<Element>;

  constructor(private ecoleService: EcoleService, private childService: ChildService, private toastr: ToastrService) {
    this.selectedElements = document.querySelectorAll('.select .cardKindergarten');
  }

  ngOnInit() {
    this.getListCenters();
  }

  private getListCenters() {
    this.ecoleService.getCenters(0, 0).then(
      (data: any) => {
        this.centers = data;
      }
    );
  }

  choisirCenter(){
    this.childService.addChildToCenter(this.selectedChild, 'ONLOAD', this.selectedCenter.id).then(
      (data: any) => {
        this.selectedChild = data;
        this.searchText='';
        this.toastr.success("demande envoyé! attente de confirmation par le manager");
      }
    ).catch(
      (data: any) => {
        this.toastr.error("Erreur est produite");
      }
    );
  }

  selectionner(center: Ecole) {
    this.selectedElements = document.querySelectorAll('.select');
    if(center!= null && this.selectedElements!=null){
      this.selectedElements.forEach(value => value.classList.remove('select'));
    }

    this.selectedCenter = center;
  }
}
