import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';
import {NgForm} from '@angular/forms';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';

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
  share:boolean=false;
  public repoUrl = 'http://d5c0426d.ngrok.io/contenidodetalle/';
  itemsRef: AngularFireList<any>; 
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
        if (this.esPayperview)
          this.verificarPago(cont.id, this.emailUsuario);
        else
          this.play();
      });
  }
  noPago() {
    localStorage.setItem('intento', 'si');
    this.router.navigate(['/contenidodetalle/'+this.contId]);
  }

  verificarPago(idcontent, emailUsuario) {
    this.contentService.verificarPago(idcontent, emailUsuario).subscribe(
      result => {
          if (!result) {
          
            this.router.navigate(['/contenidodetalle/'+idcontent]);  
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

   private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }

ngAfterViewInit(): void {
  
  
  }

  activeshare(){
    if(!this.share){
      this.share=true;
    }else{
      this.share=false;
    }
      
  }
  enviar(form:NgForm){
    var mensaje=this.repoUrl;
    var nombre=localStorage.getItem('email');
    var d=form.value.destinatario;
    var destinatario= d.split(";");
    var f=new Date();
    for(let c of destinatario){
        this.itemsRef.push({name: nombre,
          message: mensaje,
          type:'share',
          date: f.getDate()+"/"+f.getMonth()+"/"+f.getFullYear(),
          hours: f.getHours()+":"+f.getMinutes(),
          read:false,
          notified:false,
          addressee: c});  
    }
    localStorage.setItem('enviado','Si');
    this.share=false;
  }

  onSelected2(cont:any){
    this.contSelected.Poster=cont.Poster;
    this.router.navigate(['/contenidodetalle/'+cont.id]);
  }
}