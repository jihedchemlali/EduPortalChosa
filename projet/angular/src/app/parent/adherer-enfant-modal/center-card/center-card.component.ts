import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ecole} from "../../../models/Ecole";

@Component({
  selector: '[app-center-card]',
  templateUrl: './center-card.component.html',
  styleUrls: ['./center-card.component.css']
})
export class CenterCardComponent implements OnInit {

  @Input() center: Ecole;
  @Output() membre = new EventEmitter();

  imageUrl = null;

  constructor() {
    if(this.center==null){
      this.center = new Ecole();
    }
  }

  ngOnInit() {
  }

  selectionner() {
    let cardKindergarten = document.querySelector('#select' + this.center.id);
    if (cardKindergarten.classList.contains('select')) {
      cardKindergarten.classList.remove('select');
      this.membre.emit();
    } else {
      cardKindergarten.classList.add('select');
      this.membre.emit(this.center);
      cardKindergarten.classList.add('select');
    }
  }
}
