import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Actuality} from "../models/Actuality";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ActualityService {

  readonly POST_ACT = '/actualities' ;
  constructor(private http: HttpClient) {
  }

  createActuality(actuality: Actuality) : Observable<any> {
    return this.http.post(this.POST_ACT, actuality)
  }

  getActualityChild(id: number) {
    let params = new HttpParams();
    return this.http.get('/children/' + id + '/actualities', {
      params: params
    }).toPromise();
  }

  deleteActuality(actualityId: any) {
    return this.http.delete('/actualities/' + actualityId).toPromise();
  }

  updateActuality(actuality:Actuality) {
    return this.http.patch<any>('/actualities/'+ actuality.id , actuality ).toPromise();
  }

}
