import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../myservice.service';
import { Observable } from "rxjs/Rx";
import {MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminlistComponent implements OnInit {

  userlist:any = [];
  pageindex : any=0;
  durationInSeconds = 5;
  message : 'role changed';
  action : 'ok';


  showFiller = false;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['_id', 'email', 'username', 'creation_dt','role', 'action'];

  

  constructor(
    private _router : Router,
    private _myservice: MyserviceService, 
    private _snackBar: MatSnackBar  
    
  ) {
    
   }

  ngOnInit() {
    this.getUserList();  
  }

  getUserList(){
    this._myservice.getadmin().subscribe(data=>{  
      data.users.map(row=>{
        if(row.email)
        this.userlist.push(row);
        
      });   
      this.dataSource = new MatTableDataSource(this.userlist); 
      this.dataSource.paginator = this.paginator;  
      this.dataSource.sort = this.sort;
    }
    ,err=>{
      console.log(err);
    })
  }
    


  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/main/login']);
  }



  giverole(_id,i){
    console.log(_id);
    this._myservice.setrole(_id).subscribe(data=>{
      console.log(data);
      this.userlist = [];
      this.getUserList();
      this._snackBar.open('Role change Successfully', 'ok', {
        duration: 2000,
        verticalPosition: 'top'
      });
      
      }
    )
  }
}


