import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {User} from '../models/user';

@Injectable()
export class UserService {
  private url:string= 'http://localhost:8080/';
  constructor(private http:Http) { }

  addUser(body:String): Observable<any>{
    console.log(this.url+'altaUsuario/?'+body);
    //return this.http.get(this.url+'altaUsuario/?'+body);
    return  this.http.post(this.url+'/altaUsuario', body, {headers: this.getHeaders2()});
    
  }

  
  private getHeaders2(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(headers.toJSON);
    return headers;

  }
  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
