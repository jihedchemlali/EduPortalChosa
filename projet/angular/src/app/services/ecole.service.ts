import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Ecole} from "../models/Ecole";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class EcoleService {

  constructor(private http: HttpClient) {
  }

  getUserEcole(userId: any) {
    return this.http.get('/users/' + userId + '/centers').toPromise();
  }

  getCenters(offset: any, size: any) {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('size', size);
    return this.http.get<any>('/centers/', {params: params}).toPromise();
  }

  getChildrenOfCenters(centerId: any, offset: any, size: any) {
    let params = new HttpParams();
    params = params.append('offset', offset);
    params = params.append('size', size);
    return this.http.get<any>('/centers/' + centerId + '/children', {params: params}).toPromise();
  }

  deleteChild(childId: number) {
    return this.http.delete('/children/' + childId + '/centers/').toPromise();
  }

  getSizeOfChildrenOfCenters(centerId: number) {
    return this.http.get<any>('/centers/' + centerId + '/children/maxSize').toPromise();
  }

  updateCenterStatus(user: User) {
    return this.http.patch<any>('/users/' + user.id + '/status', user).toPromise();
  }

  updateCenterInformations(ecole: Ecole) {
    return this.http.patch<any>('/centers/' + ecole.id + '/informations', ecole).toPromise();
  }

  getEcoleById(ecoleId: any) {
    return this.http.get<any>('/centers/' + ecoleId).toPromise();
  }

  searchCenterByName(name: any, offset: any, size: any) {
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('offset', offset);
    params = params.append('size', size);
    return this.http.get<any>('/centers/search', {params: params}).toPromise();
  }
}
