import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ColoriageComponent} from "./activities/coloriage/coloriage.component";
import {EcolesComponent} from "./ecoles/ecoles.component";
import {ParentProfilComponent} from "./parent-profil/parent-profil.component";
import {ParentSettingsComponent} from "./parent-settings/parent-settings.component";
import {ParentComponent} from './parent.component';
import {CreateChildComponent} from "./child/create-child/create-child.component";
import {ActualitesChildComponent} from "./actualites-child/actualites-child.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {NotificationParentComponent} from "./notification-parent/notification-parent.component";
import {AuthGuard} from "../services/authentification/auth.guard";

const routes: Routes = [
  {
    path: '', component: ParentComponent, canActivate: [AuthGuard],
    data: {
      expectedRole: 'PARENT'
    },
    children: [
      {
        path: '', redirectTo: '/accueil', pathMatch: 'full'
      },
      {
        path: 'accueil', component: AccueilComponent, // canActivate: [AuthGuard]
      },
      {
        path: 'enfants/creer-enfant', component: CreateChildComponent
      },
      {
        path: 'enfants/:id', component: ActualitesChildComponent
      },
      {
        path: 'coloriage', component: ColoriageComponent
      },
      {
        path: 'jardins', component: EcolesComponent
      },
      {
        path: 'coloriage', component: ColoriageComponent
      },
      {
        path: 'notifications', component: NotificationParentComponent
      }
    ]
  },
  {
    path: 'profil', component: ParentProfilComponent
  },
  {
    path: 'parametre', component: ParentSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule {
}
