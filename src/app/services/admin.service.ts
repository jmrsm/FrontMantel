import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AdminService {
  private url:string= 'http://localhost:8080/';
  //private url:string= '174.138.54.167:8080/';
  constructor(private http:Http) { }

  addAdmin(body:String): Observable<any>{
    return  this.http.post(this.url+'api/superAdmin/admin', body, {headers: this.getHeaders()});
    
  }

  
  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(headers.toJSON);
    return headers;

  }
  private getHeaders2(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  bloqUsuario(body:String): Observable<any>{
    console.log(this.url+'api/superAdmin/bloquearUsuario/?'+body);
    return this.http.put(this.url+'api/superAdmin/bloquearUsuario', body, {headers: this.getHeaders()});
 
  }

  bloqContenido(body:String): Observable<any>{
    console.log(this.url+'api/superAdmin/bloquearContenido/?'+body);
    return this.http.put(this.url+'api/superAdmin/bloquearContenido', body, {headers: this.getHeaders()});
 
  }
  
}
