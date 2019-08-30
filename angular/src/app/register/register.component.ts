import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  successMessage: String = '';
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])),
      username: new FormControl(null, Validators.compose([
        Validators.minLength(4),
	     	Validators.required,
	 	    Validators.pattern('[A-Za-z]{3,15}') 
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(5),
	     	Validators.required,
	 	    Validators.pattern('(.{8,10})') 
      ])),
      cnfpass: new FormControl(null, this.passValidator)
    });

    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );
  }

  ngOnInit() {
    
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
    
  }

  // emailexist(){
  //   var username = this.myForm.value.email;
  //   console.log(username);
  //   if(this.myForm.value.email!=null){
  //     this._myservice.emailvalid(username)
  //     .subscribe(
  //       data=>{
  //         if(data){
  //           console.log("sorry Your email Already exist");
  //         }
  //         else{
  //           console.log("Welcome New User");
  //         }
  //       }
  //     )
  //   }
  
  // }

 get f() { return this.myForm.controls }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }


  // openDialog(confirm): any {
  //   return new Promise((res)=>{
  //   const dialogRef = this.dialog.open(DialogOverviewComponent, {
  //     width: '300px',
  //     data:confirm
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {     
  //     res(result);
  //   });
  // })
  // }




  register() {
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._myservice.submitRegister(this.myForm.value)
        .subscribe(
          data => this.successMessage = 'Registration Success',
          error => this.successMessage = 'Some error'
        );
        //this.openDialog(this.myForm.value.message);
        alert("Registration Successfully");
        this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
        this.myForm.reset();

}
  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
