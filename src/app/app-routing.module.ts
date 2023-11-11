import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { PrincipalListComponent } from './components/tabelaprincipal/principal-list/principal-list.component';
import { ReajusteListComponent } from './components/tabelareajuste/reajuste-list/reajuste-list.component';
import { ParametrosSimuComponent } from './components/parametrosrequest/parametros-simu/parametros-simu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, children: [ // , canActivate: [AuthGuard]
      { path: 'home', component: HomeComponent },
      { path: 'tabelaprincipal/list', component: PrincipalListComponent },
      { path: 'tabelareajuste/list', component: ReajusteListComponent },
      { path: 'parametrosrequest/parametros-simu', component: ParametrosSimuComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
