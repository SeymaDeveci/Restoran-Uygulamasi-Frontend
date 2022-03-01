import { Component, OnInit } from '@angular/core';
import { AuthService } from '../users/auth.service';

@Component({
    selector: 'nv-navbar',
    templateUrl: 'navbar.component.html'
  })

  export class NavbarComponent implements OnInit{
      constructor (private auth : AuthService){}

      isAuthenticated! : boolean

      ngOnInit(): void {
          this.isAuthenticated = this.auth.isAuthenticated;
      }
  }