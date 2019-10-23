import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {File} from "../models/File";
import {Activity} from "../models/Activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getActivities(size: any = 5, offset: any = 1) {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('offset', offset);
    return this.http.get<any>('/activities/', {params: params}).toPromise();
  }

  getSizeOfActivities() {
    return this.http.get<any>('/activities/maxSize').toPromise();
  }

  deleteActivity(file: File) {
    return this.http.delete('/activities/' + file.id).toPromise();
  }

  createActivity(activity: Activity) {
    return this.http.post('/activities', activity).toPromise();
  }
}
