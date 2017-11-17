import {  Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`],
  providers: [UserService,ContentService]
})
export class ContentComponent implements OnInit {
  u: string;
  vacio:boolean=true;
  public repoUrl = 'http://23bd428c.ngrok.io/contenido';
  public imageUrl = '';  
  favoritos: any;
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
  //https://cdn1.iconfinder.com/data/icons/hawcons/32/698904-icon-23-star-128.png
  constructor(private router:Router,private userService:UserService,private contentService:ContentService) { }

  ngOnInit() {
    this.userService.getFavoritos().subscribe(data=>{
      this.favoritos=JSON.parse(data['_body']);
      /*if(this.favoritos.length==0){
        this.vacio=true;
      }*/
      for(let item of this.favoritos){
        if(item.id==this.content.id){
          this.vacio=false;
        }
      }
    });
    
  }
  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_JOHebQTrkgPUeecYROmEOPGO',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });
  }
  onSelected(cont:any){
    this.router.navigate(['/contenidodetalle/'+cont.id]);
  }
  play() {
    localStorage.setItem('videoSrc', this.content.path);
    localStorage.setItem('videoId', this.content.id);
    localStorage.setItem('titulo', this.content.Title);
    this.router.navigate(['/reproComun']);
  }
  removefav(content:any){
    console.log('remove');
    var body='contenidoId='+content.id+'&usuarioId='+localStorage.getItem('idUsuario')+'&esFavorito=false';
    this.contentService.changeFav(body).subscribe(data=>{
      this.router.navigate(['/login']);
      //this.vacio=false;
    });
  }
  addfav(content:any){
    console.log('add');
    var body='contenidoId='+content.id+'&usuarioId='+localStorage.getItem('idUsuario')+'&esFavorito=true';
    this.contentService.changeFav(body).subscribe(data=>{
      this.router.navigate(['/login']);
      //this.vacio=true;
    });
  }
}

