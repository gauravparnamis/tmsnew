import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MyserviceService {
  
  childEvent = new BehaviorSubject<any>(""); 

  private baseurl = 'http://192.168.1.49:8087/users/';
  constructor(private _http: HttpClient) { 
  }

  setChildEventValue(value){
    this.childEvent.next(value);
  }

  submitRegister(body:any){
    return this._http.post(this.baseurl+'register', body,{
      observe:'body'
    });
  }

  emailvalid(username){
   console.log('email',username);
   var data = { 'username':username}
   return this._http.post(this.baseurl+'check',data,{
     observe:'body'
   });
  }

  login(body:any){
    return this._http.post(this.baseurl+'login', body,{
      observe:'body'
    });
  }

  getUserName() {
    return this._http.get(this.baseurl+'username', {
      observe: 'body',
      params: new HttpParams().append('token',localStorage.getItem('token'))
    });
  }

  resetPswd(data){
    return this._http.post(this.baseurl+'forgot', data);
  }

  newPswd(data){
    return this._http.post(this.baseurl+'reset', data); 
  }

  uploadFile(selectedFile){
    console.log(selectedFile);
    return this._http.post(this.baseurl+'uploadimg',selectedFile);
  }

  RegisterUser(data,selectedFile){
    console.log(selectedFile)
    var form = new FormData();
    form.append("file",selectedFile);
    form.append("data",JSON.stringify(data));
    console.log(form);
        return this._http.post<any>(this.baseurl+'createuser',form);
      }
    
      GetData(){
       return this._http.get<any>(this.baseurl+'getuserlist');
      }
    
     DeleteData(id){
       return this._http.get<any>(this.baseurl+'deleteUser?id='+id);
     }

     edit(id){
       return this._http.get<any>(this.baseurl+'edit?id='+id);
     }
    
     EditData(data,selectedFile){
      console.log(selectedFile);
      //data.myimage = selectedFile;
      var form = new FormData();
      form.append("file",selectedFile);
      form.append("data",JSON.stringify(data));

       return this._http.post<any>(this.baseurl+ 'edituser',form);
     }

     //Services for tasks:

     CreateTask(data){
      var form = new FormData(); 
      form.append("data",JSON.stringify(data));
      return this._http.post<any>(this.baseurl+'CreateTask',data);
     }

     DeleteTask(id){
       console.log(id);
      return this._http.get<any>(this.baseurl+'deletetask?id='+id);
    
    }
   

    showedittask(id){
      console.log(id);
      return this._http.get<any>(this.baseurl+'showedittask?id='+id);
    }

    EditTask(data){
      console.log(data);
      return this._http.post<any>(this.baseurl + 'edittask',data);
       }

     GetTask(){
        return this._http.get<any>(this.baseurl+ 'gettask');
      }

      getadmin(){
      return this._http.get<any>(this.baseurl+'getadmin');
      }

      setrole(_id){
        console.log(_id);
        return this._http.get<any>(this.baseurl+'setrole?id='+_id);
      }
     
}
