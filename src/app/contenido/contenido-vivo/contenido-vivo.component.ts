import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VgAPI, VgFullscreenAPI } from 'videogular2/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SimpleTimer } from 'ng2-simple-timer';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repro-vivo',
  templateUrl: './contenido-vivo.component.html',
  styleUrls: ['./contenido-vivo.component.css'],
  providers: [
    ContentService, 
    DatePipe,
    AngularFireDatabase,
    UserService
  ]
})
export class ContenidoVivoComponent implements OnInit {
  //------------------------Contador------------------------//
  private future: Date;
  private futureString: string;
  private diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  private message: string;
  private empieza: boolean=false;
  public timerId: string;  

//-------------------------------------------------------//  
  //--------------------------Chat--------------------------//
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  nick:string;
  todo:string='Todos';
  destinatario:string;
  //--------------------------------------------------------//
 //-------------------------Datos de reproductor-------------------------//
  sources: Array<Object>;
  api: VgAPI;
  fsAPI: VgFullscreenAPI;
  nativeFs: boolean = true;
  public srcVideo;
  currentTimeVideo;
  //----------------------------------------------------------------------//
 //---------------Datos cargados y calculados para el video---------------//
  fechaInicio:number;
  fechaInicioString: string;
  fechaInicioDate: Date;
  fechaInicioEnSegundos:number;

  duracion:number;
  duracionString:string;

  fechaServidorString: string;
  fechaServidorDate: Date;
  fechaServEnSegundos:number;

  aux:number; 

//----------------------------------boolean's es visible 
  private cargo:boolean= false;
  private empezo:boolean= false;
  private termino:boolean= false;
  private cargado:boolean= false;
  private autoHide:boolean= true;
  private autoHideTime:number= 5000;
  private controls:boolean= false;
  private nombreEvento:string;
//----------------------------------------------------------------------//  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private st: SimpleTimer,
    private contentservice: ContentService,
    private db: AngularFireDatabase,
    private datePipe: DatePipe
  ) {
    
    this.nick=localStorage.getItem('email');
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.srcVideo = localStorage.getItem('videoSrc');
      this.nombreEvento= localStorage.getItem('nombreEvento');
      this.itemsRef = this.db.list(this.nombreEvento);
      this.item = this.db.list(this.nombreEvento).valueChanges();
      this.duracionString = localStorage.getItem('duracion');

      this.duracion = +this.duracionString;
      
      this.fechaInicioString = localStorage.getItem('fechaComienzo');

      this.fechaInicio = +this.fechaInicioString;
      this.fechaInicioString = this.datePipe.transform(new Date(this.fechaInicio), 'MM/dd/yyyy HH:mm:ss');
      this.fechaInicioDate = new Date(this.fechaInicioString);
      this.st.newTimer('1sec', 1);    
      this.cargarFechaServidor();
    });


  this.sources = [
      {
        src: this.srcVideo,
        type: "video/mp4"
      },

      {
        src: this.srcVideo,
        type: "video/ogg"
      },

      {
        src: this.srcVideo,
        type: "video/webm"
      }
    ];
}
  // Se carga la fecha del servidor
  cargarFechaServidor() {
    this.contentservice.getServerDate().subscribe(
      result => {
        this.fechaServidorString=result._body;
        this.fechaServidorDate=new Date(this.fechaServidorString);
        this.cargo=true;
        this.terminoTransmision();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

   terminoTransmision() {
    this.fechaServEnSegundos = this.convertirFechaEnSegundos(this.fechaServidorString);
    this.fechaServEnSegundos = this.fechaServEnSegundos;
    this.fechaInicioEnSegundos = this.convertirFechaEnSegundos(this.fechaInicioString);
    if (this.fechaInicioEnSegundos > this.fechaServEnSegundos) {
      this.iniciarEspera();
    }
    else {
      this.empezo=true;
      this.iniciarReproduccion();
    }
  }

// Si la fecha del contenido es posterior a la fecha del servidor se inicia un contador paara el inicio
  iniciarEspera() {

        this.future = new Date(this.fechaInicioString);
        this.$counter = Observable.interval(1000).map((x) => {
            this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
            return x;
        });

        this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
  }

//---------------------------------------------cuenta regresiva

  dhms(t) {
    var d, h, m, s;
    d = Math.floor(t / 86400);
    t -= d * 86400;
    h = Math.floor(t / 3600) % 24;
    t -= h * 3600;
    m = Math.floor(t / 60) % 60;
    t -= m * 60;
    s = t % 60;
    if (d === 0 && h === 0 && m === 0 && s === 0)   {
      this.empezo=true;
      this.iniciarReproduccion();
    }
    return [
      d + ' Dias',
      h + ' Horas',
      m + ' Minutos',
      s + ' Segundos'
    ].join(' ');
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.fsAPI = this.api.fsAPI;
    this.nativeFs = this.fsAPI.nativeFullscreen;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.terminoF.bind(this));    
  }

  terminoF() {
    this.termino= true;
  }

//---------------------------------------- Se setea el tiempo de reproduccion
  iniciarReproduccion() {

    let res = this.fechaServEnSegundos - this.fechaInicioEnSegundos;
    this.currentTimeVideo = res;
  if(this.empezo) {
      this.api.getDefaultMedia().canPlay = false;
      this.api.getDefaultMedia().isLive = true;
      this.api.getDefaultMedia().currentTime = this.currentTimeVideo;
      this.api.getDefaultMedia().play();
    }
  }

  //--------------------------------------------------------chat
   enviar(form: NgForm){
    var mensaje=form.value.mensaje;
    var nombre=form.value.nombre;
    var d=form.value.destinatario;
    var destinatario= d.split(";");
    if(destinatario==''){
      this.itemsRef.push({name: this.nick,message:mensaje,addressee: this.todo});    
    }else{
      for(let c of destinatario){
        
          this.itemsRef.push({name: this.nick,message:mensaje,addressee: c});  
      }  
    }
  }

//------------------------Se convierte una fecha(string) con el siguiente formato "MM/dd/yyyy HH:mm:ss" a segundos
  convertirFechaEnSegundos(fecha:string) {
    var date=fecha.split(" ");
    
    var mes=date[0].split('/')[0];
    var dia=date[0].split('/')[1];
    var anio=date[0].split('/')[2];

    var hora=date[1].split(':')[0];
    var minutos=date[1].split(':')[1];
    var segundos=date[1].split(':')[2];
    this.aux = Date.UTC(+anio, +mes, +dia, +hora, +minutos, +segundos);
    return this.aux / 1000; 
  }

}