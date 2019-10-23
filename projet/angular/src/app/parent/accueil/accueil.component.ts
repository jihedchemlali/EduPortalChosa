import {DatePipe} from "@angular/common";
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Child} from "../../models/Child";
import {TokenStorageService} from "../../services/authentification/token-storage.service";
import {ChildService} from "../../services/child.service";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css',
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css']
  ,
  providers: [DatePipe],
  encapsulation:ViewEncapsulation.None,

})

export class AccueilComponent implements OnInit {

  child: Child;
  userId: number;
  children: Child[];
  selectedChild: Child;
  uploadResponse = {status: '', message: '', filePath: ''};
  form: FormGroup;
  public dateFormat: string = 'yyyy-MM-dd';

  fileExist: boolean = false;
  public message: string;
  eventEditForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private fileService: FileService,
              private childService: ChildService,
              private datePipe: DatePipe,
              private tokenStorage: TokenStorageService,
              private toastr: ToastrService) {
    this.children = new Array();

    this.child = new Child();
    this.selectedChild = new Child();
  }

  ngOnInit() {
    this.userId = this.tokenStorage.getCurrentUser();
    this.loadChildren();

    this.form = this.formBuilder.group({
      avatar: ['']
    });

  }

  parentDeleteChild(child: Child) {
    this.selectedChild = child;

  }

  deleteChild(child) {
    this.childService.deleteChild(child.id).then(data => {
      this.toastr.success("candidat retiré avec succées", "");
      this.loadChildren();
    });
  }

  onFileChange(files, event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileExist = true;
      this.form.get('avatar').setValue(file);
    }
  }

  updateChild(child: Child) {

    this.childService.updateChild(this.selectedChild, child.center).then(
      (data: any) => {

        this.childService.updateChild(this.selectedChild, this.selectedChild.center).then(data => {
          if (this.fileExist) {
            this.uploadChildPhoto(this.selectedChild.id).then((res => {

              this.loadChildren();
              this.toastr.success("Modifié avec succéss");
            }));
          }
        })
          .then(() => {
            this.child.birth_date = this.datePipe.transform(decodeURIComponent(data.birth_date), this.dateFormat);

            this.form.reset();
            this.fileExist = false;
          });
      }).catch(
      (error: any) => {

        this.toastr.error("erreur lors de modification");
      });
  }

  uploadChildPhoto(id: number) {
    let uploadURL = `/children/` + id + '/files';
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);
    return this.fileService.upload(uploadURL, formData).then(
      (res: any) => {
        this.uploadResponse = res;
      }
    ).catch(
      (error: any) => {
        this.toastr.error("error uploading photo child", "");
      });
  }

  removeChildFromEcole(child: Child) {
    this.childService.addChildToCenter(child, 'NEW', null).then(
      (data: any) => {
        this.loadChildren();
        this.toastr.success("demande annulé!");
      }
    ).catch(
      (data: any) => {
        this.toastr.error("Erreur est produite");
      });
  }

  private loadChildren() {
    this.childService.getUserChildren(this.userId).then(
      (data: any) => {
        this.children = data;
      });
  }

  reset() {
    this.loadChildren();
  }
}
