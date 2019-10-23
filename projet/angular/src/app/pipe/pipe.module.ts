import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterCenterPerVillePipe} from "./filterCenterPerVillePipe/filter-center-per-ville.pipe";
import { AgePipe } from './agePipe/age.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';
import {TimeAgoPipe} from "time-ago-pipe";

@NgModule({
  declarations: [FilterCenterPerVillePipe, AgePipe, OrderByPipe, TimeAgoPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterCenterPerVillePipe, AgePipe, OrderByPipe, TimeAgoPipe]
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
