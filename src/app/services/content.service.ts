import { Injectable, NgModule } from '@angular/core';
import { Content } from '../models/content';
import { Http, Response, Headers } from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class ContentService {
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

  searchOMBD(body:String): Observable<any>{
    return  this.http.get(this.url+'api/admin/contenidoOmdb'+body, {headers: this.getHeaders()});
    
  }
  findAdminID(body:string){
    return  this.http.get(this.url+'api/admin/getID'+body, {headers: this.getHeaders()});
  }
  addContenido(body:string){
    console.log(this.url+'/api/admin/contenidoOmdb?'+body);
    return this.http.post(this.url+'api/admin/contenidoOmdb',body, {headers: this.getHeaders()});
  }
  getMyContent(body:string){
    return  this.http.get(this.url+'api/admin/listarmicontenido'+body, {headers: this.getHeaders()});
  }
  
  // comunicacion con la api para obtener todas las peliculas
   public getData(start_index, end_index) {
    return this.httpc.get(this.url+'api/usuario/listarTodasPeliculas?_start=' + 
      start_index + '&_end=' + end_index).map((res: Response) => res);
  }
  
  // comunicacion con la api para obtener el tiempo que un usuario lleva viendo u  contenido de tipo pelicula
  public getTimeUserView(usuarioId: string, contenidoId: string): Observable<any> {
    return this.httpc.get(this.url+'api/usuario/verContenido?usuarioId=' + usuarioId + '&contenidoId=' + contenidoId).map((res: Response) => res);
  }
  
  // comunicacion con la api para persistir el tiempo relativo de la reproduccion de un contenido por parte del usuario
  // este servicio se 'llama' cada 5 s
  setTimeCurrent(idUsuario: string, idContenido: string, Tiempo: string): Observable<any>{
    return this.httpc.get(this.url + 'api/usuario/guardarReproduccion' + '?idUsuario=' + 
      idUsuario + '&idContenido=' + idContenido + '&Tiempo=' + Tiempo).map((res: Response) => res);
  }
  
  // comunicacion con la api para obtener la fecha y hora del servidor
  getServarDate(): Observable<any> {
    return this.http.get(this.url + 'api/usuario/relojSistema').map((res: Response) => res);
  }
  
}
