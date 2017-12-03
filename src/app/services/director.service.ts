import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DirectorService {
  //private url:string= 'http://localhost:8080/';
  private url:string= '174.138.54.167:8080/';
  constructor(private http:Http) { }

  addDirector(body:String): Observable<any>{
    console.log(this.url+'api/superAdmin/altaAdmin?'+body);
    
    return  this.http.post(this.url+'api/superAdmin/altaAdmin', body, {headers: this.getHeaders()});
    
  }

  
  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(headers.toJSON);
    return headers;

  }
}
