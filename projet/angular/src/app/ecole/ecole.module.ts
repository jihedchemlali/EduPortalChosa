import {NgModule} from '@angular/core';
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {CreateActualityEcoleComponent} from "./actualities-enfant/create-actuality-ecole/create-actuality-ecole.component";
import {EcoleComponent} from "./ecole.component";
import {CommonModule} from '@angular/common';

import {PipeModule} from "../pipe/pipe.module";
import {EcoleHeaderComponent} from "./ecole-header/ecole-header.component";
import {EcoleFooterComponent} from "./ecole-footer/ecole-footer.component";
import {ActualitiesEnfantComponent} from "./actualities-enfant/actualities-enfant.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {EcoleRoutingModule} from "./ecole-routing.module";
import {EcoleSidebarComponent} from './ecole-sidebar/ecole-sidebar.component';
import {ActualityComponent} from './actualities-enfant/actuality/actuality.component';
import {EcoleChildComponent} from './ecole-child/ecole-child.component';
import { AccueilComponent } from './accueil/accueil.component';
import { EcoleProfilComponent } from './ecole-profil/ecole-profil.component';
import { EcoleSettingsComponent } from './ecole-settings/ecole-settings.component';
import { NotificationEcoleComponent } from './notification-ecole/notification-ecole.component';

@NgModule({
  declarations: [EcoleComponent,
    EcoleHeaderComponent,
    EcoleFooterComponent,
    ActualitiesEnfantComponent,
    EcoleSidebarComponent,
    ActualityComponent,
    EcoleChildComponent,
    AccueilComponent,
    EcoleProfilComponent,
    EcoleSettingsComponent,
    CreateActualityEcoleComponent,
    NotificationEcoleComponent,
  ],
  providers: [
    AuthInterceptor
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix',
      timeOut: 3500,
      positionClass: 'toast-top-right'
    }),
    ReactiveFormsModule,
    EcoleRoutingModule,
    PipeModule
  ],
  exports: [EcoleComponent,
    EcoleHeaderComponent,
    EcoleFooterComponent,
    ActualitiesEnfantComponent,
    EcoleSidebarComponent]
})
export class EcoleModule {
}
