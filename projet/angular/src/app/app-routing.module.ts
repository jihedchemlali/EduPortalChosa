import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontComponent} from "./front/front.component";
import {LoginComponent} from "./front/login/login.component";
import {InscriptionComponent} from "./front/inscription/inscription.component";
import {ServicesComponent} from "./front/services/services.component";
import {ValidationComponent} from "./front/validation/validation.component";
import {ResetPasswordComponent} from "./front/reset-password/reset-password.component";
import {ForgetPasswordComponent} from "./front/forget-password/forget-password.component";

const routes: Routes = [
  {path: '', component: FrontComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ecole', loadChildren: './ecole/ecole.module#EcoleModule'},
  {path: 'parent', loadChildren: './parent/parent.module#ParentModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'validation', component: ValidationComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'services' , component: ServicesComponent},

  // otherwise redirect to home
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
