import { Component, ViewChild, HostListener, OnInit, Output } from '@angular/core';
import { MatSidenav} from '@angular/material/sidenav';
import { SidenavService } from 'src/app/_services/sidenav/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
opened = true;

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
    constructor(private sidenavService: SidenavService){
    }

  ngOnInit(): void {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }

    this.sidenavService.sideNavToggleSubject.subscribe(()=> {
      this.sidenav.toggle();
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
