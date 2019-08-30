import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {MyserviceService} from "../myservice.service";
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  password:any;
  cnfpassword:any;
  ResetForm : FormGroup;
  _id:any;
  token:any;


  constructor(private fb:FormBuilder, private myserviceService:MyserviceService,
    private activatedRoute: ActivatedRoute,
    private _router : Router,
    private _snackBar: MatSnackBar
    ) {
    this.ResetForm = new FormGroup({
      password:new FormControl(null,[Validators.required]),
      cnfPassword:new FormControl(null,[Validators.required])
    })

  }
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this._id=this.activatedRoute.params['value'].id;
      this.token=this.activatedRoute.params['value'].token;
      

      console.log('id',this._id, 'token',this.token)
    });
  }                 
  
  isValid(controlName) {
    return this.ResetForm.get(controlName).invalid && this.ResetForm.get(controlName).touched;
  }
  
  get f() { return this.ResetForm.controls}



  compare(){
      if(this.password != this.cnfpassword){
        console.log('password Not Match');
      }
      else
      {
        console.log('password Match');
      }
  }
  
  


  ResetPass(){
    console.log( this.ResetForm.value.password, this.ResetForm.value.cnfPassword)
    
   
    if(this.ResetForm.value.password == this.ResetForm.value.cnfPassword){
      this.myserviceService.newPswd({formdata: this.ResetForm.value, id: this._id})
      .subscribe(result=>{
        console.log(result);
      },err=>{
        console.log(err);
      })
    }
    this._snackBar.open('Password change Successfully', 'ok', {
      duration: 2000,
      verticalPosition: 'top'
    });   
         this._router.navigate(['login']);
}

}
