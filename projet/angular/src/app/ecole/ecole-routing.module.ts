import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EcoleProfilComponent} from "./ecole-profil/ecole-profil.component";
import {EcoleSettingsComponent} from "./ecole-settings/ecole-settings.component";
import {EcoleComponent} from './ecole.component';
import {ActualitiesEnfantComponent} from './actualities-enfant/actualities-enfant.component';
import {AccueilComponent} from "./accueil/accueil.component";
import {NotificationEcoleComponent} from "./notification-ecole/notification-ecole.component";
import {AuthGuard} from "../services/authentification/auth.guard";

const routes: Routes = [
  {
    path: '', component: EcoleComponent, canActivate: [AuthGuard],
    data: {
      expectedRole: 'FORMATION'
    },
    children: [
      {
        path: '', redirectTo: '/accueil', pathMatch: 'full'
      },
      {
        path: 'accueil', component: AccueilComponent
      },
      {
        path: 'enfants/:id', component: ActualitiesEnfantComponent
      },
      {
        path: 'notifications', component: NotificationEcoleComponent
      }
    ],
  },
  {
    path: 'profil', component: EcoleProfilComponent
  },
  {
    path: 'parametre', component: EcoleSettingsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcoleRoutingModule {
}
