import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileService} from "../../services/file.service";
import {TokenStorageService} from "../../services/authentification/token-storage.service";

@Component({
  selector: 'app-parent-sidebar',
  templateUrl: './parent-sidebar.component.html',
  styleUrls: ['./parent-sidebar.component.css'
    , '../../../assets/parent/css/styles.css',
    '../../../assets/parent/css/bootstrap.css',
    '../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../assets/front/css/toastr.css'
  ]
})
export class ParentSidebarComponent implements OnInit {
  @Input() user: User = new User();
  @Input() imageUrl: string;
  @Output() membre = new EventEmitter();
  show: boolean = true;

  form: FormGroup;

  constructor(public router: Router, private tokenStorage: TokenStorageService, private fileService: FileService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.router.url.indexOf('parent/enfants/creer-enfant') !== 1)
      this.show = true;
    else this.show = false;

    this.form = this.formBuilder.group({
      avatar: ['']
    });

    if (this.user == null) {
      this.user = new User();
      this.user.prenom = '';
    }
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
