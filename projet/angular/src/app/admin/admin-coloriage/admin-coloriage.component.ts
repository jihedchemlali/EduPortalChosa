import {Component, OnInit} from '@angular/core';
import {File} from "../../models/File";
import {FileService} from "../../services/file.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthInterceptor} from "../../services/authentification/auth-interceptor";
import {Activity} from "../../models/Activity";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-admin-coloriage',
  templateUrl: './admin-coloriage.component.html',
  styleUrls: ['../../../assets/admin/css/all.min.css',
    '../../../assets/admin/css/adminlte.min.css',
    './admin-coloriage.component.css',
    '../../../assets/front/css/toastr.css']
})
export class AdminColoriageComponent implements OnInit {

  form: FormGroup;
  activities: Activity[];
  activity: Activity;

  constructor(private activityService: ActivityService, private fileService: FileService, private formBuilder: FormBuilder, private toastr: ToastrService, protected authInterceptor: AuthInterceptor) {
    this.activity = new Activity();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });

    this.loadActivities();
    this.initialisePagination();
  }

  private loadActivities(offset: number = 1) {
    this.activityService.getActivities(this.sizePerPage, offset).then(
      (data: any) => {
        this.activities = data;

        this.currentPage = offset;
      }
    );
  }

  currentPage: number = 1;
  maxSize: any = 0;
  readonly sizePerPage: number = 11;
  lengthPagination: number = 0;
  label: string = 'Choisir une image';

  private initialisePagination() {
    this.activityService.getSizeOfActivities().then(data => {
      this.maxSize = data;
      this.lengthPagination = this.maxSize / this.sizePerPage;
      if (this.lengthPagination > Math.trunc(this.lengthPagination)) this.lengthPagination = Math.trunc(this.lengthPagination) + 1;
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
      this.label = '' + file.name;
    }
  }

  uploadActivityImage(id: number) {
    let uploadURL = `/activities/` + id + '/files';
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);
    return this.fileService.upload(uploadURL, formData).then().catch(() => {
      this.toastr.error("error dans l'upload du fichier");
    });
  }

  deleteImage(file: File) {
    this.activityService.deleteActivity(file).then(data => {
      this.toastr.success("Image retiré avec succées");
      this.ngOnInit();
    });
  }

  createActivity() {
    this.activityService.createActivity(this.activity).then((response: any) => {
      if (response) {
        this.activity = response;
        this.uploadActivityImage(this.activity.id).then(() => {
          this.toastr.success("enfant créer avec succès !");
          this.loadActivities();
        })
      }
    }).catch(
      () => {
        this.toastr.error("error creating child");
      }
    );
    this.reset();
  }

  reset() {
    this.activity = new Activity();
    this.label = 'Choisir une image';
  }
}
