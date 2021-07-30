import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './_auth/login/login.component';
import { SignupComponent } from './_auth/signup/signup.component';
import { HeaderComponent } from './_shared/header/header.component';
import { AuthInterceptor } from './_auth/auth-interceptor';
import { SidenavComponent } from './_shared/sidenav/sidenav.component';
import { HarvestAddComponent } from './components/harvest-add/harvest-add.component';
import { HarvestViewComponent } from './components/harvest-view/harvest-view.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidenavComponent,
    HarvestAddComponent,
    HarvestViewComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
