import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
@Component({
  selector: 'app-pelicula',
  templateUrl: './peliculas.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`],
})
export class PeliculasComponentUnidad implements OnInit {
  u: string;
  public imageUrl = '';  
  private pago:boolean= false;
  private tipo:string;
  @Input() content:Content;
  contSelected:any={
    Title:'',
    Plot:'',
    Genre:'',
    esPago:'',
    Director:'',
    Actors:'',
    Poster:''
  };
  constructor(private router:Router) { }

  ngOnInit() {
    localStorage.setItem('origen','p');
    this.tipo= localStorage.getItem('tipo');
    if (this.tipo==='No_pago') {
      this.pago= false;
    }
    else {
      this.pago= true;
    }
  }

  onSelected(cont:any){
    this.contSelected.Poster=cont.Poster;
    this.router.navigate(['/contenidodetalle/'+cont.id]);
  }
  play() {
    if (this.pago) {
      localStorage.setItem('videoSrc', this.content.path);
      localStorage.setItem('videoId', this.content.id);
      this.router.navigate(['/reproComun']);
    }
    else {
      this.router.navigate(['/reproComun']); 
    }
  }
}