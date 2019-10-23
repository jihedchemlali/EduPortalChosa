import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminAccueilComponent} from "./admin-accueil/admin-accueil.component";
import {AdminLoginComponent} from "./admin-login/admin-login.component";
import {AdminColoriageComponent} from "./admin-coloriage/admin-coloriage.component";
import {AuthGuard} from "../services/authentification/auth.guard";

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AuthGuard],
    data: {
      expectedRole: 'ADMIN'
    },
    children: [
      {
        path: '', redirectTo: '/accueil', pathMatch: 'full'
      },
      {
        path: 'accueil', component: AdminAccueilComponent
      },
      {
        path: 'coloriage', component: AdminColoriageComponent
      }
    ]
  },
  {
    path: 'login', component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
