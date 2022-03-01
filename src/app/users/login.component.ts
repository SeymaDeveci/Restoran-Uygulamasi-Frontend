import { Component, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'u-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
  })

  export class LoginComponent{
      constructor (private auth : AuthService){}

      //json formatında tanımlama
      loginData = {  
          UserName : '',
          Password : ''
      }

      login(){
          this.auth.login(this.loginData);
          console.log("thisloginData => ", this.loginData);
      }

  }