import {Component, OnInit} from '@angular/core';
import {Child} from "../../../models/Child";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FileService} from "../../../services/file.service";
import {ChildService} from "../../../services/child.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthInterceptor} from "../../../services/authentification/auth-interceptor";
import {TokenStorageService} from "../../../services/authentification/token-storage.service";

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
  styleUrls: ['./create-child.component.css',
    '../../../../assets/parent/css/bootstrap.css',
    '../../../../assets/parent/css/styles.css',
    '../../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../../assets/front/css/toastr.css']
})
export class CreateChildComponent implements OnInit {
  child: Child;
  form: FormGroup;
  uploadResponse = {status: '', message: '', filePath: ''};
  public imageUrl = '../../../assets/parent/img/photoProfilParent.png';
  public imagePath;
  imgURL: any = '../../../assets/parent/img/imgKid.png';
  public message: string;
  eventEditForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private authInterceptor: AuthInterceptor, private router: Router, private toastr: ToastrService, private fileService: FileService, private childService: ChildService) {
    this.child = new Child()
  }

  ngOnInit() {
    let photoId = this.tokenStorage.getUserPicture();
    if (photoId != null)
      this.imageUrl = this.authInterceptor.BASE_URL + '/files/' + photoId;

    this.child.sexe = "GARCON";
    this.form = this.formBuilder.group({
      avatar: ['']
    });
    this.eventEditForm = new FormGroup({
      'completed': new FormControl()
    });
  }

  onFileChange(files, event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.preview(files);
      this.form.get('avatar').setValue(file);
    }
  }

  createChild() {
    this.childService.createChild(this.child).then((response: any) => {
      if (response) {
        this.child = response;
        this.uploadChildPhoto(this.child.id).then((res => {
          this.router.navigate(['parent']);
          this.toastr.success("enfant créer avec succès !");
        }))
      }
    }).catch(
      (error: any) => {
        this.toastr.error("error creating child");
      }
    );
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
        this.toastr.error("error creating child", "");
      }
    )
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

  }


}
