import {  Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Router } from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { UserService } from '../../services/user.service';
import { ContentService } from '../../services/content.service';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';

declare let paypal: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 100%;
    height: 200px;
    }
}`],
  providers: [UserService,ContentService]
})
export class ContentComponent implements OnInit {
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  items: Observable<any[]>;
  u: string;
  vacio:boolean=true;
  public repoUrl = 'http://3912ee76.ngrok.io/contenidodetalle/';
  public imageUrl = '';  
  favoritos: any;
  monto;
  idContenido = 5;
  email = '';
  share:boolean= false;
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
  constructor(private db: AngularFireDatabase,private router:Router,private userService:UserService,private contentService:ContentService) { 
    this.itemsRef = db.list('mail1');
    this.item = db.list('mail1').valueChanges();
  }

  ngOnInit() {
    this.monto = 100;
    this.tipo= localStorage.getItem('tipo');
    if (this.tipo==='No_pago') {
      this.pago= false;
    }
    else {
      this.pago= true;
    }
    console.log(this.tipo);
    this.userService.getFavoritos().subscribe(data=>{
      this.favoritos=JSON.parse(data['_body']);
      for(let item of this.favoritos){
        if(item.id==this.content.id){
          this.vacio=false;
        }
      }
    });
   this.repoUrl=this.repoUrl+this.content.id;
   localStorage.setItem('origen','cont');
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
    this.contSelected.Poster=cont.Poster;
    this.router.navigate(['/contenidodetalle/'+cont.id]);
  }
  play() {
    /*if (this.pago) {
      localStorage.setItem('videoSrc', this.content.path);
      localStorage.setItem('videoId', this.content.id);
      localStorage.setItem('titulo', this.content.Title);
      this.router.navigate(['/reproComun']);  
    }
    else {
      this.router.navigate(['/suscribir']);  
    }*/

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
    });
  }
  addfav(content:any){
    console.log('add');
    var body='contenidoId='+content.id+'&usuarioId='+localStorage.getItem('idUsuario')+'&esFavorito=true';
    this.contentService.changeFav(body).subscribe(data=>{
      this.router.navigate(['/login']);
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
}
