import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`],
})
export class ContentComponent implements OnInit {
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
