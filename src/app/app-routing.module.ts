import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth 
import { LoginComponent } from './_auth/login/login.component';
import { SignupComponent } from './_auth/signup/signup.component';
// Shared
import { HeaderComponent } from './_shared/header/header.component';
// component
import { HarvestViewComponent } from './components/harvest-view/harvest-view.component';
import { HarvestAddComponent } from './components/harvest-add/harvest-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login',component: LoginComponent},
  { path: 'signup',component: SignupComponent},
  { path: 'home', component: HeaderComponent },
  { path: 'harvest-view', component: HarvestViewComponent},
  { path: 'harvest-add', component: HarvestAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
