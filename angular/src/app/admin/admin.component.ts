import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import { NgForm } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { FormComponent } from './form/form.component';
import {MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {AppMaterialModule} from '../app.metrial.module';



export interface DialogData {
  animal: string;
  name: string;
}
export interface Country {
  value: string;
  viewValue: string;
}



const routes=[
  {
  path:'NewUser', component:FormComponent
}]


@Component({
  selector: 'menu-overview-example',
  templateUrl: 'menu-overview-example.html',
  
})
export class MenuOverviewExample {}




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  imageshow = 'http://192.168.1.49:8087/uploads/';
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
  showImage:any;


  showFiller = false;   
  dataSource: MatTableDataSource<any>;  
  @ViewChild(MatPaginator) paginator: MatPaginator;         
  @ViewChild(MatSort) sort: MatSort;   
  user: any;   

  displayedColumns = ['id','fname','lname','dob','email','Salary','phone','myimage','action'];


  username = '';                                         
  constructor(private myService:MyserviceService,               
                    iconRegistry: MatIconRegistry,                  
                     sanitizer: DomSanitizer,              
                     public dialog: MatDialog,                     
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 

           
                
                

         iconRegistry.addSvgIcon(
          'thumbs-up',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));

    this.myService.getUserName()
    .subscribe(
      data => this.username= data.toString(),
      error => this._router.navigate(['/main/login'])
    )
    }
 
    

  ngOnInit() {
    this.myService.GetData().subscribe(data=>{
    
      console.log(this.userlist);
      data.users.map(row=>{
        if(row.fname)
        this.userlist.push(row);
      });   
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      console.log(err);
    })
  }

  
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/main/login']);
  }

  movetonewuser() {
    this._router.navigate(['./form'], { relativeTo: this._activatedRoute });
  }

  async onDelete(id,index){
    let result = await this.openDialog(null);
   if(!result)
   return 0;
  
    this.myService.DeleteData(id).subscribe(data=>{
      if(data.response){
        this.userlist.splice(index,1);
        this.dataSource = new MatTableDataSource(this.userlist);

      }
     this.openDialog(data.message);
    })
  }

  openDialog(confirm): any {
    return new Promise((res)=>{
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      data:confirm
    });
  
    dialogRef.afterClosed().subscribe(result => {     
      res(result);
    });
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

  onEdit(){

    this.myService.EditData(this.userModel,this.selectedFile).subscribe(data=>{
  
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
                    
        this.userForm.reset();
      }
  
    })
  }

}


@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})

export class DialogOverview {
  
  messageToPrint:any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
   
      this.messageToPrint = data;
      var name : any;
    } 
  }

