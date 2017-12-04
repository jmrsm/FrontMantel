import { Injectable, NgModule } from '@angular/core';
import { Reportes } from '../models/reportes';
import { Http, Response, Headers } from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class ReportesService {
  private url:string= 'http://localhost:8080/';
  constructor(
      private http:Http,
      private httpc:HttpClient) { }
  
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
  getReporteSuperAdmin(){
    return  this.http.get(this.url+'api/superAdmin/obtenerReportes?').map((res:Response)=>res);
  }
  
  getReporteAdmin(body:string){
    return  this.http.get(this.url+'api/admin/obtenerReportes?email='+body).map((res:Response)=>res);
  }

  /*getReporteAdmin(body:string){
    return  this.http.get(this.url+'api/admin/obtenerReporteAdmin?email=angelacayetano91@gmail.com').map((res:Response)=>res);
  }*/
  getReporteUsuario(body:string){
    return  this.http.get(this.url+'api/usuario/obtenerReportes?email='+body).map((res:Response)=>res);
  }

  /*getReporteUsuario(body:string){
    return  this.httpc.get(this.url+'api/usuario/obtenerReporteUsuario?email=angelacayetano91@gmail.com').map((res:Response) => res);
  }*/
}
