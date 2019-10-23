import {Component, OnInit} from '@angular/core';
import {AuthInterceptor} from "../../../services/authentification/auth-interceptor";
import {ActivityService} from "../../../services/activity.service";
import {Activity} from "../../../models/Activity";

@Component({
  selector: 'app-coloriage',
  templateUrl: './coloriage.component.html',
  styleUrls: ['./coloriage.component.css',
    '../../../../assets/parent/css/bootstrap.css',
    '../../../../assets/parent/css/styles.css',
    '../../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../../assets/front/css/toastr.css']
})
export class ColoriageComponent implements OnInit {

  activities: Activity[] = [];

  constructor(private activityService: ActivityService, protected authInterceptor: AuthInterceptor) {
  }

  ngOnInit() {
    this.loadImages();
    this.initialisePagination();
  }

  private loadImages(offset: number = 1) {
    this.activityService.getActivities(this.sizePerPage, offset).then(
      (data: any) => {
        this.activities = data;
        console.log(this.activities);
        this.currentPage = offset;
      }
    );
  }

  currentPage: number = 1;
  maxSize: any = 0;
  readonly sizePerPage: number = 11;
  lengthPagination: number = 0;

  private initialisePagination() {
    this.activityService.getSizeOfActivities().then(data => {
      this.maxSize = data;
      this.lengthPagination = this.maxSize / this.sizePerPage;
      if (this.lengthPagination > Math.trunc(this.lengthPagination)) this.lengthPagination = Math.trunc(this.lengthPagination) + 1;
    });
  }
}
