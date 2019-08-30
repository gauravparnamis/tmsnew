import { Injectable } from '@angular/core';



@Injectable()
export class AuthService{

    
    constructor(){

    }


    public isAuthenticated(){
        const token = localStorage.getItem('token');
        if(token){
            return true;
        }
        return false;

    }

}