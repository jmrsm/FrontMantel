import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {VgAPI, VgFullscreenAPI} from 'videogular2/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SimpleTimer} from 'ng2-simple-timer';
import {Content} from '../../models/content';
import {ContentService} from '../../services/content.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repro-vivo',
  templateUrl: './contenido-vivo.component.html',
  styleUrls: ['./contenido-vivo.component.css'],
  providers: [ContentService, DatePipe]
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
  //-------------------------------------------------------//
  
  //--------------------------Chat--------------------------//
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  //--------------------------------------------------------//
  sources: Array<Object>;
  api: VgAPI;
  fsAPI: VgFullscreenAPI;
  nativeFs: boolean = true;
  public srcVideo;
  public currentTimeVideo;
  public startTimeVideo;
  public idVideo;
  public idUsuario;
  public timerId: string;
  fechaInicio:number;
  fechaInicioString: string;
  cFecheDate: Date;
  fechaServidor: string;
  sFechaDate: Date;
  duracion:number;
  duracionString:string;
  fechaServEnSegundos:number;
  fechaActualEnSegundos:number;
  aux:number;
  cargo:boolean=false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private st: SimpleTimer,
    private contentservice: ContentService,
    private db: AngularFireDatabase,
    private datePipe: DatePipe
  ) {
    this.itemsRef = db.list('chat1');
    this.item = db.list('chat1').valueChanges();
  
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.srcVideo = localStorage.getItem('videoSrc');
      this.startTimeVideo = localStorage.getItem('videoTime');
      this.idVideo = localStorage.getItem('videoId');
      this.fechaInicioString = localStorage.getItem('fechaComienzo');
      this.duracionString = localStorage.getItem('duracion');
      this.duracion = +this.duracionString;
      this.fechaInicio = +this.fechaInicioString;
      this.fechaInicioString = this.datePipe.transform(new Date(this.fechaInicio), 'MM/dd/yyyy HH:mm:ss');
      this.cFecheDate = new Date(this.fechaInicioString);
      this.cargarFechaServidor();
      this.st.newTimer('1sec', 1);

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
        this.fechaServidor = result._body;
        this.sFechaDate = new Date(this.fechaServidor);
        this.comenzarReproduccion();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Se comienza la reproduccion  dependiendo de la fecha de comienzo del contenido y la fecha actual en el servidor

  comenzarReproduccion() {
    this.cargo=true;
    if (this.sFechaDate < this.cFecheDate) {
      this.iniciarEspera();
    }
    else {
     // this.iniciarReproduccion();
    }
  }

  // Si la fecha del contenido es posterior a la fecha del servidor se inicia un contador paara el inicio
  iniciarEspera() {
    //this.api.getDefaultMedia().canPlay = false;
    //this.api.getDefaultMedia().isLive = true;

        this.future = new Date(this.fechaInicioString);
        this.$counter = Observable.interval(1000).map((x) => {
            this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
            return x;
        });

        this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
  }

  // Si la fecha del contenido es igual o anterior a la fecha del servidor se inicia la reproduccion
  // Mejora a hacer, teniendo la duracion del contenido se podria simular un fin de transmision
  iniciarReproduccion() {
    let dserv = this.sFechaDate.getTime() / 1000;
    let dcont = this.cFecheDate.getTime() / 1000;

    let res = dserv - dcont;
    this.currentTimeVideo = res;
    this.play();

  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.fsAPI = this.api.fsAPI;
    this.nativeFs = this.fsAPI.nativeFullscreen;
  }

  //Comienza la reproduccion
  play() {
   // this.api.getDefaultMedia().currentTime = this.currentTimeVideo;
    //this.api.getDefaultMedia().play();
  }

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
      this.empieza=true;
      //this.iniciarReproduccion();
    }
    return [
      d + ' Dias',
      h + ' Horas',
      m + ' Minutos',
      s + ' Segundos'
    ].join(' ');
  }
  
  
   enviar(form: NgForm){
    var mensaje=form.value.mensaje;
    var nombre=form.value.nombre;
    console.log(mensaje+' '+nombre);
    this.itemsRef.push({name: nombre,message:mensaje});
  }
  terminoTransmision() {
    this.fechaServEnSegundos = this.convertirFechaEnSegundos(this.fechaServidor);
    this.fechaActualEnSegundos = this.convertirFechaEnSegundos(this.fechaInicioString);
    if(this.fechaServEnSegundos + this.duracion > this.fechaActualEnSegundos) 
      return true;
    else
      this.iniciarReproduccion();
  }


//Obtengo tiempo que falta para iniciar la reproduccion
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