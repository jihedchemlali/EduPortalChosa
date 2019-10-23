import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {AdminComponent} from './admin.component';
import {PipeModule} from "../pipe/pipe.module";
import {AdminAccueilComponent} from './admin-accueil/admin-accueil.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminSidebarComponent} from './admin-sidebar/admin-sidebar.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {AuthInterceptor} from "../services/authentification/auth-interceptor";
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminColoriageComponent} from './admin-coloriage/admin-coloriage.component';

@NgModule({
  declarations: [AdminComponent,
    AdminAccueilComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminLoginComponent,
    AdminColoriageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix',
      timeOut: 3500,
      positionClass: 'toast-top-right'
    }),
    ReactiveFormsModule,
    AdminRoutingModule,
    PipeModule
  ],
  providers: [
    AuthInterceptor
  ],
  exports: [AdminComponent,
    AdminHeaderComponent,
    AdminSidebarComponent
  ]
})
export class AdminModule {
}
