import { Component, OnInit ,ViewChild,Inject, Output, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MyserviceService } from '../../myservice.service';
import {MatDialog, } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DialogOverviewComponent } from '../../dialog-overview/dialog-overview.component';
import { Router,ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs/Observer';

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
              private myservice : MyserviceService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}

@Component({
  selector: 'select-custom-trigger-example',
  templateUrl: 'select-custom-trigger-example.html',
})
export class SelectCustomTriggerExample{
  toppings = new FormControl(); 
  
  value: any = "value"
  id: any = "id"
  toppingList: any[];

  constructor(private myService:MyserviceService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute){

                this.myService.GetData().subscribe(data=>{
                  this.toppingList = data.users;
                
                })
  }

  onChange(id:any) {
    console.log(id)
    this.myService.setChildEventValue(id)
  }
}







@Component({
  selector: 'app-taskcomponent',
  templateUrl: './taskcomponent.component.html',
  styleUrls: ['./taskcomponent.component.css'],
  inputs: ['parentdata']

})

export class TaskcomponentComponent implements OnInit {

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
  pageSize:any;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public toppings: String[];
  public emp: String;
  public assignemp : String;
  userassign:any;
  @Input() MessageEvent: String;
    receiveMessage($event) {
    this.userassign = $event;
    console.log(this.userassign);
   }
  displayedColumns = ['tid','taskname', 'desc', 'sdata', 'ldata','assignemp','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog,
    private  _myservice: MyserviceService,
     private http: HttpClient,
     private _route : Router,
     private _formBuilder: FormBuilder,
     private _loadingBar: SlimLoadingBarService) { 
      this._myservice.childEvent.subscribe(data=>{
        this.assignemp = data;
           console.log(this.assignemp);

      })
     }


     ngOnInit() {
    
      this.firstFormGroup = this._formBuilder.group({
       firstCtrl: ['', Validators.required]
     });
     this.secondFormGroup = this._formBuilder.group({
       secondCtrl: ['', Validators.required]
     });

 
      this._myservice.GetTask().subscribe(data=>{
       this.userlist=data.users;
       
       console.log(data.users[0].assignemp);
          data.users.map(row=>{
         if(row.id)
         this.userlist.push(row);
    });   
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      console.log(err);
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

  logout(){
    localStorage.removeItem('token');
    this._route.navigate(['/main/login']);
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
                    assignemp: this.userModel.assignemp.value              
                  };     
        console.log(user);          
        this.userlist.splice(this.userlist.findIndex (x=>x._id==this.userModel._id),1,user);

        this.userForm.reset();                 
      }
  
    })
  }
}

