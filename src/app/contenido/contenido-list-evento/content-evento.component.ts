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
  emailUsuario:string;
  contId:string;
  pago:boolean=true;
  contenido:any={};
  esPayperview:boolean;
  pagado:boolean;
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
    this.emailUsuario=localStorage.getItem('email');
    this.contId = cont.id;
    localStorage.setItem('intento', 'no');
    var body='?idContenido='+cont.id;
      this.contentService.getDatoContenido(body).subscribe(data=>{
        this.contenido=JSON.parse(data['_body']);
        this.esPayperview=this.contenido.esPago;
        this.verificarPago(cont.id, this.emailUsuario);
      });
  }
  noPago() {
    localStorage.setItem('intento', 'si');
    this.router.navigate(['/contenidodetalle/'+this.contId]);
  }

  verificarPago(idcontent, emailUsuario) {
  this.contentService.verificarPago(idcontent, emailUsuario).subscribe(
      result => {
        this.pagado = result;
        console.log(result);
        if (!this.pagado) {
          this.noPago();  
        }
        else {
          this.play();
        }
        
      },
      error => {
        console.log(<any>error);
      }); 
  }
  play() {
    localStorage.setItem('videoSrc', this.content.path);
    localStorage.setItem('videoId', this.content.id);
    localStorage.setItem('fechaComienzo', this.content.fechaInicio);
    localStorage.setItem('duracion', this.content.Runtime);
    this.router.navigate(['/reproVivo']);
  }
}


