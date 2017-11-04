import { Injectable } from '@angular/core';
import { Content } from '../models/content';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ContentService {
  private url:string= 'http://localhost:8080/';
  contents : Content[]=[
  new Content('1','Batman Vs Superman','Batman Vs Superman','http://allcalidad.com/wp-content/uploads/2016/07/batman-vs-superman-el-origen-de-la-justicia.jpg','https://'),
  new Content('2','Fight Club','Fight Club','https://assets.mubi.com/images/notebook/post_images/22621/images-w1400.jpg?1481167057','https://'),
  new Content('3','Unkir','Unkir','https://i.pinimg.com/736x/fd/5e/66/fd5e662dce1a3a8cd192a5952fa64f02--classic-poster-classic-movies-posters.jpg','https://'),
  new Content('4','MoongLight','MoongLight','https://www.heyuguys.com/images/2017/03/Pirates-of-the-Caribbean-5-Movie-Poster.jpg','https://'),
  new Content('5','Pirate of Caribbean','Pirate of Caribian','https://images-na.ssl-images-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UY1200_CR90,0,630,1200_AL_.jpg','https://'),
  new Content('6','Thor','Thor','http://images6.fanpop.com/image/photos/34200000/THOR-THE-DARK-WORLD-Movie-Poster-thor-34278279-338-500.jpg','https://')
  ];
  constructor(private http:Http) { }
  getContents(){
    return this.contents;
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

  searchOMBD(body:String): Observable<any>{
    return  this.http.get(this.url+'api/admin/contenidoOmdb'+body, {headers: this.getHeaders()});
    
  }
  findAdminID(body:string){
    return  this.http.get(this.url+'api/admin/getID'+body, {headers: this.getHeaders()});
  }
  addContenido(body:string){
    //http://localhost:8080//api/admin/contenidoOmdb?proveedorContenidoId=1&omdbId=tt2488496&path=https://firebasestorage.googleapis.com/v0/b/tsi2-9f457.appspot.com/o/videos%2FStar_Wars_The_Last_Jedi_Trailer_Official(youtube.com).mp4?alt=media&token=55148834-60da-4710-a0de-9ff2d27c9263&esSerie=false&esDestacado=true
    console.log(this.url+'/api/admin/contenidoOmdb?'+body);
    return this.http.post(this.url+'api/admin/contenidoOmdb',body, {headers: this.getHeaders()});
  }
  getMyContent(body:string){
    return  this.http.get(this.url+'api/admin/listarmicontenido'+body, {headers: this.getHeaders()});
  }
}
