import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import {MyserviceService} from "../myservice.service";
import { MatSnackBar } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-forgetmail',
  templateUrl: './forgetmail.component.html',
  styleUrls: ['./forgetmail.component.css']
})
export class ForgetmailComponent implements OnInit {

  email:any;
  invalidLogin = false;
  successMessage : String;


  EmailForm: FormGroup;

  constructor(private fb: FormBuilder, private myserviceService:MyserviceService,private _snackBar:MatSnackBar,
    private spinnerService: Ng4LoadingSpinnerService ) { 
     this.EmailForm= new FormGroup({
       Email:new FormControl(null,[Validators.required, Validators.email])
     })
}

  ngOnInit() {  }

  isValid(controlName) {
    return this.EmailForm.get(controlName).invalid && this.EmailForm.get(controlName).touched;
  }
  
  get f() { return this.EmailForm.controls}


  Forgotpass(){
      console.log(this.EmailForm.valid)
     
      if(this.EmailForm.valid){
        this.myserviceService.resetPswd(this.EmailForm.value)
        
        .subscribe(result=>{
          console.log(result);
        },err=>{
          console.log(err);
        })
        
      }
      

      this._snackBar.open('Email Send Successfully', 'ok', {
        duration: 2000,
        verticalPosition: 'top'
      });   
  }

}
