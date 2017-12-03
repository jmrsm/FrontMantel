import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Empresa} from '../models/empresa';

@Injectable()
export class EmpresaService {

  //private url:string= 'http://localhost:8080/';
  private url:string= '174.138.54.167:8080/';
  constructor(private http:Http) { }

  addEmpresa(body:String): Observable<any>{
    console.log(this.url+'api/superAdmin/proveedorContenido/?'+body);
    //return this.http.get(this.url+'/superAdmin/proveedorContenido/?'+body);
    return this.http.post(this.url+'api/superAdmin/proveedorContenido', body, {headers: this.getHeaders()});
 
  }
  login(body:String): Observable<any>{
    console.log(this.url+'api/public/login?'+body);
    return this.http.get(this.url+'api/public/login/'+body);
  }
 
  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(headers.toJSON);
    return headers;
  }
  
    ListaEmpresas(){
    console.log(this.url+'api/superAdmin/proveedorContenido.ListaEmpresasNombreId()');
    return this.http.get(this.url+'api/superAdmin/proveedorContenido.ListaEmpresasNombreId()', {headers: this.getHeaders2()});
    //return this.http.get(this.url+'api/superAdmin/proveedorContenido.ListaEmpresasNombreId()').map((res:Response)=>res.json);
   }
   
   private getHeaders2(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  
}
