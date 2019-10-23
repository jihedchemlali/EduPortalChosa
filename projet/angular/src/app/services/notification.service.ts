import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {Notification} from "../models/Notification";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  getUserNotifications(user: User, size: any = 5, offset: any = 1) {
    let params = new HttpParams();
    params = params.append('userId', '' + user.id);
    params = params.append('size', size);
    params = params.append('offset', offset);
    return this.http.get('/notifications', {params}).toPromise();
  }

  updateNotification(notification: Notification) {
    return this.http.patch('/notifications/' + notification.id, notification).toPromise();
  }

  getSizeNotifications(user: User, status: string) {
    let params = new HttpParams();
    params = params.append('userId', '' + user.id);
    if (status)
      params = params.append('status', status);
    return this.http.get('/notifications/maxSize', {params}).toPromise();
  }
}
