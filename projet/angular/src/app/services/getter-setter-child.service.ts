import { Injectable } from '@angular/core';
import {Child} from "../models/Child";

@Injectable({
  providedIn: 'root'
})
export class GetterSetterChildService {

  constructor() { }



  _selectedChild: Child = new Child() ;

  set selectedChild(value:Child) {
    this._selectedChild = value
  }
  get selectedChild():Child {
    return this._selectedChild;
  }

}
