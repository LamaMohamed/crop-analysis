import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthService } from './_auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title='crop-analysis';
  opened = true;
  userIsAutenticated =false;
  private authListenerSubs!: Subscription;
 constructor( private authService : AuthService) { }

 ngOnInit(): void {
   this.userIsAutenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAutenticated = isAuthenticated;
    });
 }

 ngOnDestroy(){
   this.authListenerSubs.unsubscribe();
 }

 onLogout(){
    this.authService.logout();

 }
}