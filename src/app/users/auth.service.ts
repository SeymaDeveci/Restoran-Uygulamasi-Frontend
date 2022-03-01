import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    Token_Key = "token";
    UserName_Key = "name";

  constructor(
      private http: HttpClient,
      private router : Router) { }


  get isAuthenticated (){
    return !!localStorage.getItem(this.Token_Key); //token keyde veri var  mı yok mu eğer varsa bu kişi doğrulanmıştır
  }

  login (loginData : any) {
      this.http.post(environment.apiUrl + '/api/auth/login', loginData).subscribe((res : any ) => {
          
        var authResponse = res;
        if (authResponse != null){
              localStorage.setItem(this.Token_Key, authResponse.token); //localstorage da tokenkey ile authresponse daki bir değeri ayarlama,set etme
              localStorage.setItem(this.UserName_Key, authResponse.username);
              console.log(localStorage.getItem(this.Token_Key));
              this.router.navigate(['/']); //route olarak anasayfana git
          }
      });
  }

  logout (){
    localStorage.removeItem(this.Token_Key); //set edilen token key yok edilir
    localStorage.removeItem(this.UserName_Key);
  }

  register(user : any){
    delete user.confirmPassword;
    this.http.post(environment.apiUrl + '/api/auth/register',user).subscribe((res ) => {
      console.log("res =>", res);
      var authResponse = res;
      console.log("authRespons =>", authResponse);
      //localStorage.setItem(this.Token_Key, authResponse.token); //localstorage da tokenkey ile authresponse daki bir değeri ayarlama,set etme
      //localStorage.setItem(this.UserName_Key, authResponse.username);
      console.log(localStorage.getItem(this.Token_Key));
      this.router.navigate(['/']); //route olarak anasayfana git
    });
}
 
}