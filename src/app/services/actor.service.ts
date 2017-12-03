import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ActorService {
  //private url:string= 'http://174.138.54.167:8080/';
  private url:string= '174.138.54.167:8080/';
  constructor(private http:Http) { }

  addActor(body): Observable<any>{
    console.log(JSON.stringify(body));
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    /*return this.http.post(this.url+'api/admin/actor', JSON.stringify(body), options).toPromise().then(
      response=>{return response.text();}
    );*/
    
    return  this.http.post(this.url+'api/admin/actor', JSON.stringify(body), {headers: this.getHeaders()});
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
