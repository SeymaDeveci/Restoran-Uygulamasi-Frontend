import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'u-register',
    templateUrl: './register.component.html'
  })

  export class RegisterComponent{
      form: any;
      constructor (private auth : AuthService, private fb: FormBuilder){
          //html tarafından gönderilen form grup işlemi içinde NgModelden gelen değerleri kontrol etme
          this.form = fb.group({
              userName:['',Validators.required], //değer mecburi olduğu için boş gelirse kabul etme
              firstName: ['', Validators.required],
              lastName: ['', Validators.required],
              email: ['', Validators.required],
              password: ['', Validators.required],
              confirmPassword: ['', Validators.required],
            }, { validators: matchingFields('password', 'confirmPassword') }) //doğrulama işlemi paswordler aynı mı değil mi
      }

    onSubmit() {
        console.log(this.form.errors);
        this.auth.register(this.form.value);
    }

    isValid(control:any){
            return this.form.controls[control].invalid && this.form.controls[control].touched;
    }
      
  }

  function matchingFields(field1: any, field2: any) {
      return (form:any) => {
          if( form.controls[field1].value !== form.controls[field2].value)
          {
              return {mismacthedFields: true}
          }
          else{
            return {mismacthedFields: false}
          }
      }
    }
  