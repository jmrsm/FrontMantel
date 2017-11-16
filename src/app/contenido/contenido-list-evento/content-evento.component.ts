import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content-evento',
  templateUrl: './content-evento.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`],
  providers: [UserService,ContentService]
})
export class ContentEventComponent implements OnInit {
  u: string;
  vacio:boolean=true;
  public imageUrl = '';  
  favoritos: any;
  esPago: boolean =false;
  @Input() content:Content;
  contSelected:any={
    Title:'',
    Plot:'',
    esPago:''
  };
  constructor(private router:Router,private userService:UserService,private contentService:ContentService) { }

  ngOnInit() { 
  }
  onSelected(cont:any){
    this.router.navigate(['/contenidodetalle/'+cont.id]);
  }
  play() {
    localStorage.setItem('videoSrc', this.content.path);
    localStorage.setItem('videoId', this.content.id);
    localStorage.setItem('fechaComienzo', this.content.fechaInicio);
    localStorage.setItem('duracion', this.content.Runtime);
    this.router.navigate(['/reproVivo']);
  }
}


