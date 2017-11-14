import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';  
import { Router , ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
  providers:[UserService]
})
export class ContentDetailComponent implements OnInit {
  idcontent:number;
  idUser:string;
  contendio:any={};
  poster:string;
  plot:string;
  title:string;
  actor:string[]=[];
  director:string[]=[];
  comentario:string[]=[];

  constructor(private contentservice:ContentService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.idcontent = params['Id'];
      this.idUser=localStorage.getItem('idUsuario');
      var body='?idContenido='+this.idcontent;
      this.contentservice.getDatoContenido(body).subscribe(data=>{
        this.contendio=JSON.parse(data['_body']);
        this.poster=this.contendio.Poster;
        this.plot=this.contendio.Plot;
        this.actor=this.contendio.Actors;
        this.title=this.contendio.Title;
        this.director=this.contendio.Director;
        this.comentario=this.contendio.comentarios;
        console.log(this.contendio.Poster);
      });
    })
    
  }
  altacomentario(comentario:NgForm){
    var body='contenidoId='+this.idcontent+'&usuarioId='+this.idUser+'&comentario='+comentario.value.comentario;
    this.contentservice.comentar(body).subscribe(data=>{
      this._router.navigate(['login']);
    });
  }

}
