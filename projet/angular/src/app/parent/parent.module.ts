import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {PipeModule} from "../pipe/pipe.module";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {AccueilComponent} from "./accueil/accueil.component";
import {ColoriageComponent} from './activities/coloriage/coloriage.component';
import {ActualitesChildComponent} from "./actualites-child/actualites-child.component";
import {ActualityElementComponent} from './actualites-child/actuality-element/actuality-element.component';
import {CreateActualityComponent} from './actualites-child/create-actuality/create-actuality.component';
import {AdhererEnfantModalComponent} from './adherer-enfant-modal/adherer-enfant-modal.component';
import {ChildComponent} from './child/child.component';
import {CreateChildComponent} from './child/create-child/create-child.component';
import {ParentFooterComponent} from "./parent-footer/parent-footer.component";
import {ParentHeaderComponent} from "./parent-header/parent-header.component";
import {ParentProfilComponent} from './parent-profil/parent-profil.component';
import {ParentRoutingModule} from "./parent-routing.module";
import {ParentSettingsComponent} from './parent-settings/parent-settings.component';
import {ParentSidebarComponent} from './parent-sidebar/parent-sidebar.component';
import {ParentComponent} from "./parent.component";
import {CenterCardComponent} from './adherer-enfant-modal/center-card/center-card.component';
import {NotificationParentComponent} from './notification-parent/notification-parent.component';
import {EcolesComponent} from './ecoles/ecoles.component';

@NgModule({
  declarations: [ParentHeaderComponent,
    ParentFooterComponent,
    ParentComponent,
    ActualitesChildComponent,
    CreateChildComponent,
    ChildComponent,
    ParentSidebarComponent,
    AdhererEnfantModalComponent,
    CreateActualityComponent,
    ActualityElementComponent,
    AccueilComponent,
    ParentProfilComponent,
    ParentSettingsComponent,
    ColoriageComponent,
    CenterCardComponent,
    EcolesComponent,
    CenterCardComponent,
    NotificationParentComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix',
      timeOut: 3500,
      positionClass: 'toast-top-right'
    }),
    ReactiveFormsModule,
    ParentRoutingModule,
    PipeModule,
    // Ng2SearchPipeModule
  ],
  providers: [
    AuthInterceptor
  ],
  exports: [ParentComponent,
    ParentHeaderComponent,
    ParentFooterComponent,
    ActualitesChildComponent,
    ParentSidebarComponent,
    AdhererEnfantModalComponent,
    CenterCardComponent
  ]
})
export class ParentModule {
}
