import { Component,ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyserviceService } from '../../myservice.service';
import {MatDialog, } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppMaterialModule } from '../../app.metrial.module';
import { DialogOverviewComponent } from '../../dialog-overview/dialog-overview.component';
import {  FileUploader } from  'ng2-file-upload/ng2-file-upload';
import "rxjs/add/operator/map";
import { Location } from '@angular/common';


export interface DialogData {
  animal: string;
  name: string;
}
export interface Country {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'stepper-overview-example',
  templateUrl: 'stepper-overview-example.html',
})
export class StepperOverviewExample implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}

const URL = 'http://192.168.1.49:8088/backend/upload';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  imageshow = 'http://192.168.1.49:8087/uploads/';
  hideP: true;
  selectedFile: File =null;
  topicHasError=true;
  submitted = false;
  errormsg ='';
  userlist:any = [];
  message:any="";
  imagePath:any="";
  @ViewChild('userForm') userForm: NgForm;
  isedit = false;
  userModel:any = {}; 
  pageindex : any=0;
  pageSize:any;
  minDate = new Date(1995, 1, 1);
  maxDate = new Date(2010, 3, 1);
  isLinear = false;
  showImage:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  displayedColumns = ['id', 'fname', 'lname', 'dob', 'email', 'Salary', 'gender','myimage', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user: any;

  constructor(public dialog: MatDialog,
              private  _myservice: MyserviceService,
              private _router: ActivatedRoute,
               private http: HttpClient,
               private _route: Router,
               private _formBuilder: FormBuilder,
               private _loadingBar: SlimLoadingBarService,
               private el: ElementRef,
               private location: Location
            ) { 
            }

  ngOnInit() {

   var id = this._router.snapshot.paramMap.get("id");
   console.log(id); 
   if(id == '-1'){
    this.isedit = false;

   }
   else{
    this.edit(id)
    this.isedit = true;

   }
    
     this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this._myservice.GetData().subscribe(data=>{   
      this.userlist=data.users;    
      
      console.log(this.userlist);
      data.users.map(row=>{
        if(row.FirstName)
        this.userlist.push(row);
      });   
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      console.log(err);  
    })    
  }    
  

onfileSelected(event){   
     
    console.log(event);       
    if(event.target.files.length > 0){                    
      this.selectedFile = <File>event.target.files[0];          
      var reader = new FileReader();      
      reader.readAsDataURL(this.selectedFile);            
      reader.onload = (_event) => {        
        this.showImage = reader.result;        
        this.userModel.myimage= null;     
        
      }     
    }  
  }  
  
  onSubmit(form,data){
    console.log( this.selectedFile);

  this._myservice.RegisterUser(form.value,this.selectedFile).subscribe(data=>{ 
     if(data.response){  
    
        this.userlist.push(data.data);  
        this.dataSource = new MatTableDataSource(this.userlist);   
        this.dataSource.paginator = this.paginator;   
        this.dataSource.sort = this.sort;       

       }
    this.openDialog(data.message); 
   
    // this._route.navigate(['admin']);    
       this.location.back();

           
    console.log(data);   
    })
   
  }

  async onDelete(id,index){
    let result = await this.openDialog(null);

   if(!result)
   return 0;
  
    this._myservice.DeleteData(id).subscribe(data=>{
      if(data.response){
        this.userlist.splice(index,1);
        this.dataSource = new MatTableDataSource(this.userlist);
      }
     this.openDialog(data.message);
    })
  }


  openDialog(confirm): any {
    return new Promise((res)=>{
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data:confirm
    });
  
    dialogRef.afterClosed().subscribe(result => {     
      res(result);
    });
  })
  }

  edit(id){

    this._myservice.edit(id).subscribe(data=>{
      console.log('hello',data.users);
      this.userModel= data.users;
     })
  }

   
  logout(){
    localStorage.removeItem('token');
    this._route.navigate(['/main/login']);
  }

  onEdit(){

    this._myservice.EditData(this.userModel,this.selectedFile).subscribe(data=>{
  
      if(data){     
        this.isedit = false;
        var user = {_id:this.userModel._id,
                    fname:this.userModel.fname,
                    lname:this.userModel.lname,
                    dob:this.userModel.dob,
                    email:this.userModel.email,
                    phone:this.userModel.phone,
                    gender:this.userModel.gender,
                    myimage: this.selectedFile
                    }; 
                    console.log(this.selectedFile);
                    console.log(user);  
        this.userlist.splice(this.userlist.findIndex(x=>x._id==this.userModel._id),1,this.user,this.selectedFile);
                    this.userlist.push = this.selectedFile;
                    this.openDialog(data.message);
                   
                    console.log(data);
                    this.location.back();
          
       

      }
  
    })
  }
}

