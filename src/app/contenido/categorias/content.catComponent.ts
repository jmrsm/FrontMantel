import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
@Component({
  selector: 'app-cat',
  templateUrl: './content.catComponent.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`],
})
export class ContentCatComponent implements OnInit {
  u: string;
  public imageUrl = '';  
  public pago:string;
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
    this.pago = localStorage.getItem('pago');
    this.tipo= localStorage.getItem('tipo');
    console.log(this.pago);
  }

  onSelected(cont:any){
    this.contSelected.Poster=cont.Poster;
    localStorage.setItem('origen','cat');
    this.router.navigate(['/contenidodetalle/'+cont.id]);
  }
  play() {
    if (this.tipo==='No_pago') {
      this.router.navigate(['/suscribir']);  
    }
    else {
      localStorage.setItem('videoSrc', this.content.path);
      localStorage.setItem('videoId', this.content.id);
      this.router.navigate(['/reproComun']);
    }
  }
}


