import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Actuality} from "../../../models/Actuality";
import {User} from "../../../models/User";
import {ActualityService} from "../../../services/actuality.service";
import {FileService} from "../../../services/file.service";
import {LocationService} from "../../../services/location.service";
import {ActualitiesEnfantComponent} from "../actualities-enfant.component";

declare var $: any;

@Component({
  selector: 'app-create-actuality-ecole',
  templateUrl: './create-actuality-ecole.component.html',
  styleUrls: ['./create-actuality-ecole.component.css',
    '../../../../assets/ecole/css/bootstrap.css',
    '../../../../assets/ecole/css/styles.css',
    '../../../../assets/ecole/css/line-awesome/line-awesome.css']
})
export class CreateActualityEcoleComponent implements OnInit {

  user: User;
  actuality: Actuality;
  form: FormGroup;
  uploadResponse = {status: '', message: '', filePath: ''};
  public message: string;
  childId: number;
  public photoId: any;
  formData : any;
  public test : any;

  constructor(private activatedRoute: ActivatedRoute,
              private actualityIdService: ActualityService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private fileService: FileService,
              private locationService : LocationService,
              private actualitiesEnfantComponent: ActualitiesEnfantComponent) {
    this.actuality = new Actuality();

  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  // Convenience getter for easy access to form fields
  get formControls() { return this.form.controls; }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
      this.test= event.target.files.length;
    }
  }

  uploadActualityPhoto(id: number) {
    let uploadURL = `/actualities/` + id + '/files';
     this.formData = new FormData();
    this.formData.append('file', this.form.get('avatar').value);
    return this.fileService.upload(uploadURL, this.formData).then(
      (res: any) => {
        this.uploadResponse = res;
        console.log(this.uploadResponse);
      }
    ).catch(
      (error: any) => {
        this.toastr.error("error creating actuality", "");
      }
    );
  }

  addActuality() {
    this.childId = this.activatedRoute.snapshot.params['id'];
    this.actuality.child = this.childId;
    this.actuality.file = this.photoId;
    this.locationService.getPosition().then(pos=>
    {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.actuality.longitude= pos.lng;
      this.actuality.latitude=pos.lat;
    this.actualityIdService.createActuality(this.actuality).subscribe((response: any) => {
        this.actuality = response;
        this.uploadActualityPhoto(this.actuality.id).then((res: any) => {
          this.toastr.success("actuality added", "");
          this.actualitiesEnfantComponent.loadActualities();
        });
      },
      (error: any) => {
        this.toastr.error("error creating child", "");
      }, () => {
        this.actuality = new Actuality();
        this.form.reset();
        this.ngOnInit();
        $("#labelFor").text("Choisir votre photo");
      }
    );
    });
          this.test= null;
  }




}
