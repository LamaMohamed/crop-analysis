import { Component, OnInit,ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
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
