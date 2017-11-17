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
  // comunicacion con la api para obtener todas las peliculas por categoria
  public getContByCategoria(start_index, end_index, categoria) {
    return this.httpc.get(this.url+'api/usuario/listarPorGenero?_start=' + 
      start_index + '&_end=' + end_index + '&sort=titulo' + '&generoId=' + categoria).map((res: Response) => res);
  }

  // comunicacion con la api para obtener todos los eventos
  public getTodoContEnVivo(start_index, end_index) {
    return this.httpc.get(this.url+'api/usuario/listarEventosConBusqueda?_start=' + 
      start_index + '&_end=' + end_index + '&sort=titulo').map((res: Response) => res);
  }
  // comunicacion con la api para obtener el tiempo que un usuario lleva viendo u  contenido de tipo pelicula
  public getTimeUserView(usuarioId: string, contenidoId: string): Observable<any> {
    return this.httpc.get(this.url+'api/usuario/verContenido?usuarioID=' + usuarioId + '&contenidoId=' + contenidoId).map((res: Response) => res);
  }
  
  // comunicacion con la api para persistir el tiempo relativo de la reproduccion de un contenido por parte del usuario
  // este servicio se 'llama' cada 5 s
  setTimeCurrent(idUsuario: string, idContenido: string, Tiempo: string): Observable<any>{
    return this.httpc.get(this.url + 'api/usuario/guardarReproduccion' + '?idUsuario=' + 
      idUsuario + '&idContenido=' + idContenido + '&Tiempo=' + Tiempo).map((res: Response) => res);
  }
  
  // comunicacion con la api para obtener la fecha y hora del servidor
  public getServerDate(): Observable<any> {
    return this.http.get(this.url + 'api/usuario/relojSistema').map((res: Response) => res);
  }
  // api para dar de alta o baja favorito
  changeFav(body:string){
    return this.http.post(this.url+'api/usuario/favorito',body, {headers: this.getHeaders()});
  }
  //api para dar de alta contenido destacado.
  changeDestacado(body:string){
    console.log(this.url+'api/admin/destacado'+body);
    return this.http.post(this.url+'api/admin/destacado',body, {headers: this.getHeaders()});
  }

  addContenidoEnVivo(body:String): Observable<any>{
    console.log(this.url+'api/admin/contenido');
    return this.http.post(this.url+'api/admin/contenido',body, {headers: this.getHeaders2()});
  }
  //api para ver dato de un contenido
  getDatoContenido(body:string){
    return this.http.get(this.url+'api/usuario/verDatoContenido'+body,{headers: this.getHeaders()});
  }
  //api para cometar
  comentar(body:string){
    return this.http.post(this.url+'api/usuario/comentarContenido',body, {headers: this.getHeaders()});
  }

  verificarPago(idContenido, emailUsuario): Observable<any> {
    return this.httpc.get(this.url + 'api/usuario/verificarPagoEspectaculo?idContenido=' +
      idContenido + '&email=' + emailUsuario).map((res: Response) => res);
  }
  //api para valorar contenido
  calificar(body:string){
    return this.http.put(this.url+'api/usuario/valorarContenido',body,{headers: this.getHeaders()});
  }
}
