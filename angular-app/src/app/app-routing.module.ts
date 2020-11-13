import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { EquipmentActionComponent } from './component/equipment/action/action.component';
import { EquipmentComponent } from './component/equipment/equipment.component';
import { ErrorComponent } from './component/error/error.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserComponent } from './component/user/user.component';



const routes: Routes = [
  { path: '', component: EquipmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'user', component: UserComponent },
  { path: 'equipment/user/:id', component: EquipmentComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', component: ErrorComponent }
  // { path: 'equipment/delete/:id', component: EquipmentActionComponent },
  // { path: 'heroes-list', component: HeroesListComponent },
  // { path: '', redirectTo: '/heroes-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
