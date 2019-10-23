import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Actuality} from "../../../models/Actuality";
import {ActualityService} from "../../../services/actuality.service";
import {FileService} from "../../../services/file.service";
import {LocationService} from "../../../services/location.service";
import {ActualitesChildComponent} from "../actualites-child.component";

declare var $: any;

@Component({
  selector: 'app-create-actuality',
  templateUrl: './create-actuality.component.html',
  styleUrls: ['./create-actuality.component.css',
    '../../../../assets/parent/css/bootstrap.css',
    '../../../../assets/parent/css/styles.css',
    '../../../../assets/parent/css/line-awesome/line-awesome.css',
    '../../../../assets/front/css/toastr.css']
})
export class CreateActualityComponent implements OnInit {
  labelText : string = 'Choisir votre photo';
  actuality: Actuality;
  form: FormGroup;
  childId: number;
  uploadResponse = {status: '', message: '', filePath: ''};
  fileInput: boolean= false;
  public testImage : any;


  constructor(private formBuilder: FormBuilder,
              private fileService: FileService,
              private actualityIdService: ActualityService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private activitiesChildComponent: ActualitesChildComponent,
              private locationService : LocationService) {
    this.actuality = new Actuality();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
      this.testImage= event.target.files.length;

    }
  }

  uploadActualityPhoto(id: number) {
    let uploadURL = `/actualities/` + id + '/files';
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);
    return this.fileService.upload(uploadURL, formData).then(
      (res: any) => {
        this.uploadResponse = res;
      }
    ).catch(
      (error: any) => {
        this.toastr.error("error creating actuality", "");
      }
    );
  }

  addActuality(form: NgForm) {
    this.childId = this.activatedRoute.snapshot.params['id'];
    this.actuality.child = this.childId;
    this.locationService.getPosition().then(pos=>
    {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    this.actuality.longitude= pos.lng;
    this.actuality.latitude=pos.lat;
    // this.actuality.file = this.photoId;
    this.actualityIdService.createActuality(this.actuality).subscribe((response: any) => {
        this.actuality = response;
        this.uploadActualityPhoto(this.actuality.id).then((res: any) => {

          this.toastr.success("actuality added", "");
          this.activitiesChildComponent.loadActualities();
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
    this.testImage= null;
  }


}
