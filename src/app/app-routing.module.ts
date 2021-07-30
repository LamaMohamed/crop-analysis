import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth 
import { LoginComponent } from './_auth/login/login.component';
import { SignupComponent } from './_auth/signup/signup.component';
// Shared
import { HeaderComponent } from './_shared/header/header.component';
import { SidenavComponent } from './_shared/sidenav/sidenav.component';
// component
import { HarvestViewComponent } from './components/harvest-view/harvest-view.component';
import { HarvestAddComponent } from './components/harvest-add/harvest-add.component';
import { AuthGuard } from './_auth/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login',component: LoginComponent},
  { path: 'signup',component: SignupComponent},
  { path: '',component: SidenavComponent, canActivate: [AuthGuard] ,
  children: [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'harvest-view', component: HarvestViewComponent},
  { path: 'harvest-add', component: HarvestAddComponent},
  ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
