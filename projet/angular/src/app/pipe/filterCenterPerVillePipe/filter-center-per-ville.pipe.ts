import { Pipe, PipeTransform } from '@angular/core';
import {Ecole} from "../../models/Ecole";

@Pipe({
  name: 'filterCenterPerVille',
  pure: false
})
export class FilterCenterPerVillePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  public transform(items: Ecole[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.ville.indexOf(filter) !== -1);
  }
}
