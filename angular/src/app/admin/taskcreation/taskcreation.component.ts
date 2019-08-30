import { Component, OnInit ,ViewChild,Inject, Output, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MyserviceService } from '../../myservice.service';
import {MatDialog, } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DialogOverviewComponent } from '../../dialog-overview/dialog-overview.component';
import { Router,ActivatedRoute, Route } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { Location } from '@angular/common';


export interface Country {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'stepper-overview-example',
  templateUrl: 'stepper-overview-example.html',
  providers: [StepperOverviewExample]

})
export class StepperOverviewExample implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private myservice : MyserviceService,
            ) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}

// @Component({
//   selector: 'select-custom-trigger-example',
//   templateUrl: 'select-custom-trigger-example.html',
// })
// export class SelectCustomTriggerExample{
//   selectedEmployes:any = [];  
//   myForm: FormGroup;
//   value: any = "value"
//   id: any = "id"
//   toppingList: any[];

//   constructor(private myService:MyserviceService,
//               private _router: Router,
//               private fb: FormBuilder,
//               private _activatedRoute: ActivatedRoute){  
//                 this.myForm = this.fb.group({
//                   toppings:['']
//                 });
//                 this.myService.GetData().subscribe(data=>{
//                   this.toppingList = data.users;  
//                 })
//   }

//   onChange(id:any) {
//     console.log(id)
//     this.myService.setChildEventValue(id)
//   }

//   @Input('selectedEmployes')
//   set _selectedEmployes(data: any[]) {
//      this.selectedEmployes = data;     
//      this.myForm.controls.toppings.setValue(data[0]);
//   };
// }


@Component({
  selector: 'app-taskcreation',
  templateUrl: './taskcreation.component.html',
  styleUrls: ['./taskcreation.component.css'],
  inputs: ['parentdata']
})
export class TaskcreationComponent  {

  selectedEmployes:any = [];  
  value: any = "value"
  id: any = "id"


  toppings = new FormControl(); 
  toppingList = [];
  imgURL:any;
  selectedFile =null;
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
  pageSize:any
  minDate = new Date(1950, 0, 1);
  maxDate = new Date(2020, 0, 1);
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //public toppings: String[];
  public emp: String;
  public assignemp : any = [];
  public editbtn : boolean=false;
  userassign:any;
  @Input() MessageEvent: String;
    receiveMessage($event) {
    this.userassign = $event;
    console.log(this.userassign);
   }
  displayedColumns = ['tid','taskname', 'desc', 'sdata', 'ldata','assignemp.fname','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog,
    private  _myservice: MyserviceService,
     private http: HttpClient,
     private _formBuilder: FormBuilder,
     private _router: Router,
     private _routers : ActivatedRoute,
     private _loadingBar: SlimLoadingBarService,
     private location : Location) { 
      this._myservice.childEvent.subscribe(data=>{
        this.assignemp = data, data._id;
           console.log(this.assignemp);

      })
      this._myservice.GetData().subscribe(data=>{
        this.toppingList = data.users;
      
      })
     }


     ngOnInit() {
    
      var id = this._routers.snapshot.paramMap.get("id");
      console.log(id); 
      if(id == '-1'){
        this.editbtn = false;
      }
      else{
       this.showedittask(id)
       this.editbtn = true;
      }
      this.firstFormGroup = this._formBuilder.group({
       firstCtrl: ['', Validators.required]
     });
     this.secondFormGroup = this._formBuilder.group({
       secondCtrl: ['', Validators.required]
     });

 
      this._myservice.GetTask().subscribe(data=>{
       this.userlist=data.users;
       
       console.log(this.userlist);
          data.users.map(row=>{
         if(row.id)
         this.userlist.push(row);
         
         console.log(this.userlist.assignemp);
    });   
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      console.log(err);
    })
   }



  onChange(id:any) {
    console.log(id)
  this._myservice.setChildEventValue(id);
   }
 

   onSubmit(){
  //    if(this.assignemp.length > 0)
  //  this.userForm.value.assignemp = this.assignemp.map(data=>{return data._id});
  // console.log("assign map", this.assignemp);
  this._myservice.CreateTask(this.userForm.value).subscribe(data=>{
    console.log(this.userForm.value);
     if(data.response){
   
        this.userlist.push(data.data); 
            
     }
    this.openDialog(data.message);
    this.dataSource = new MatTableDataSource(this.userlist);

    this.userForm.resetForm();
    console.log(data);
    this.location.back();
    
    })
  }


  async onDelete(id,index){
    let result = await this.openDialog(null);
   if(!result)
   return 0;
  
    this._myservice.DeleteTask(id).subscribe(data=>{
      if(data.response){
        this.userlist.splice(index,1);
        
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
    this.dataSource = new MatTableDataSource(this.userlist);

  })
  }

  showedittask(id){
    console.log(id);
    this._myservice.showedittask(id).subscribe(data=>{
      console.log(data.task);
      this.userModel = data.task;
      console.log("form data",data.task);
      // this.toppings.setValue(data.task.ass)
     })
  }
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/main/login']);
  }

  onEdit(){
    this._myservice.EditTask(this.userModel).subscribe(data=>{
      this.dataSource = new MatTableDataSource(this.userlist);
      

      if(data.response){     
        this.isedit = false;         
        var user = {tid:this.userModel.tid,      
                    taskname:this.userModel.taskname,     
                    desc:this.userModel.desc,        
                    sdata:this.userModel.sdata,      
                    ldata: this.userModel.sdata,           
                    assignemp: this.userModel.assignemp.value.fname            
                  };     
                  console.log("dfdsfdsf"+this.userModel.assignemp )
                  this.toppings.setValue(this.userModel.assignemp);
        console.log(user);          
        this.userlist.splice(this.userlist.findIndex (x=>x._id==this.userModel._id),1,user);

        this.userForm.reset();   
        this.location.back();
              
      }
  
    })
  }
}




