import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Ecole} from "../../models/Ecole";
import {User} from "../../models/User";
import {EcoleService} from "../../services/ecole.service";
import {FileService} from "../../services/file.service";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: 'app-ecole-sidebar',
  templateUrl: './ecole-sidebar.component.html',
  styleUrls: ['./ecole-sidebar.component.css',
    '../../../assets/ecole/css/bootstrap.css',
    '../../../assets/ecole/css/styles.css',
    '../../../assets/ecole/css/line-awesome/line-awesome.css'],
})
export class EcoleSidebarComponent implements OnInit {

  @Input() user: User;
  @Input() ecole: Ecole;
  @Input() imageUrl: string;
  @Output() membre = new EventEmitter();

  form: FormGroup;

  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private fileService: FileService,
              private ecoleService: EcoleService,
              private tokenStorage: TokenStorageService) {
    this.ecole = new Ecole();
    this.user = new User();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });

    if (this.user == null) {
      this.user = new User();
    }
    this.ecole = new Ecole();

  }


  uploadPicture(event) {
    if (this.form.invalid) {
      return;
    }
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }

    this.uploadChildPhoto(this.user.id).then();
  }

  uploadChildPhoto(id: number) {
    let uploadURL = `/users/` + id + '/files';
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);
    return this.fileService.upload(uploadURL, formData).then(
      (data: any) => {
        this.user = data;
        this.tokenStorage.saveUserPicture(this.user.user_picture_file);
        this.membre.emit();
      });
  }

}
