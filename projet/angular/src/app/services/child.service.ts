import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Child} from "../models/Child";

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private http: HttpClient) {
  }

  createChild(child: Child) {
    return this.http.post('/children', child).toPromise();
  }

  getUserChildren(userId: any) {
    return this.http.get('/users/' + userId + '/children').toPromise();
  }

  deleteChild(childId: any) {
    return this.http.delete('/children/' + childId).toPromise();
  }

  getEcoleChildren(id: number) {
    return this.http.get('/centers/' + id + '/children').toPromise();
  }

  getChildEcole(childId: any) {
    return this.http.get('/children/' + childId + '/centers').toPromise();
  }

  addChildToCenter(child: Child, status: string, centerId: any) {
    child.status = status;
    let params = new HttpParams();
    if (centerId)
      params = params.append('centerId', centerId);
    return this.http.patch('/children/' + child.id + '/centers/', child, {params: params}).toPromise();
  }

  getChildBYId(id: number) {
    return this.http.get('/children/' + id).toPromise();
  }

  updateChild(child: Child, centerId:any, notify: string = null) {
    let params = new HttpParams();
    if (notify)
      params = params.append('notify', notify);
    if (centerId)
      params = params.append('centerId', centerId);
    return this.http.patch('/children/' + child.id, child,{params: params}).toPromise();
  }




}
