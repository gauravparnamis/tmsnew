import { Component, OnInit, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormControlName, EmailValidator } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgetmailComponent } from '../forgetmail/forgetmail.component';
import {RouterModule} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



const routes=[
  {
  path:'forgetPass', component:ForgetmailComponent
}]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})


export class LoginComponent implements OnInit {
  public loading = false;
  invalidLogin = false;
  loginForm: FormGroup;
  roletype: any;
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public e1: ElementRef,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

  }

  ngOnInit() {
    this.spinnerService.show();

  }


  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }
  

  get f() { return this.loginForm.controls }


  emailvalid(){
    this.loading = true;
   var username = this.loginForm.value.email;
   var length = this.loginForm.value.email.length;
   console.log(this.loginForm.value.email);
  

   if(length>0){
     console.log(username);
     this._myservice.emailvalid(username)
     .subscribe(
       data=>{
         if(data){
           console.log('success ! your Email is Exist.');
           this.loading = false;
         }
         else{
           console.log('username not exist');
           this.loading = false;
         }
       }
     )
   }

  }

  login() {
   // console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._myservice.login(this.loginForm.value)
      
        .subscribe(
          data => {
            console.log(data['doc'].role);
            localStorage.setItem('token', data['token'].toString());

            
            if(data['doc'].role=='admin'){
            this._router.navigate(['/admin']);  
            this.spinnerService.show();

            }
            else{
            this._router.navigate(['/dash']);
            }
          },
          error => { this.invalidLogin = true;}
        );
    }
  }

  movetoregister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }

  movetoforgetpass() {
    this._router.navigate(['../forgot'], { relativeTo: this._activatedRoute });
  }
}
