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
  public repoUrl = 'http://localhost';
  public imageUrl = '';  
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

  onSelected(cont:any){
    console.log(cont.Poster);
    this.contSelected.Poster=this.content.Poster;
    console.log(this.contSelected.Poster);
  }
  play() {
    localStorage.setItem('videoSrc', this.content.path);
    localStorage.setItem('videoId', this.content.id);
    this.router.navigate(['/reproComun']);
  }
}


