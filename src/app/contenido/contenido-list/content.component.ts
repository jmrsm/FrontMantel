import {  Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`],
  providers: [UserService]
})
export class ContentComponent implements OnInit {
  u: string;
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
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() {
    this.userService.getFavoritos().subscribe(data=>{
      this.favoritos=JSON.parse(data['_body']);;
     });
     console.log(this.favoritos);
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
    console.log(cont.Poster);
    this.contSelected.Poster=cont.Poster;
    console.log(this.contSelected.Poster);
  }
  play() {
    localStorage.setItem('videoSrc', this.content.path);
    localStorage.setItem('videoId', this.content.id);
    this.router.navigate(['/reproComun']);
  }
}


