import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {User} from '../models/user';

@Injectable()
export class UserService {
  private url:string= 'http://localhost:8080/';
  //private url:string= '174.138.54.167:8080/';
  constructor(private http:Http) { }

  addUser(body:String): Observable<any>{
    console.log(this.url+'api/public/altaUsuario/?'+body);
    //return this.http.get(this.url+'altaUsuario/?'+body);
    return  this.http.post(this.url+'/api/public/altaUsuario', body, {headers: this.getHeaders2()});
    
  }
  login(body:String): Observable<any>{
    return this.http.get(this.url+'api/public/login/'+body);
  }

  getuser(body:string){
    return this.http.get(this.url+'api/superAdmin/usuario'+body, {headers: this.getHeaders()});
  }
  getCategorias(){
    return this.http.get(this.url+'api/usuario/categoria', {headers: this.getHeaders()});
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
  getFavoritos(){
    var user='?usuarioId='+localStorage.getItem('idUsuario');
    //console.log(this.url+'api/usuario/listarFavoritos'+user);
    return this.http.get(this.url+'api/usuario/listarFavoritos'+user,{headers: this.getHeaders()});
  }
}
