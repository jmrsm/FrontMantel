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

@Component({
  selector: 'app-repro-vivo',
  templateUrl: './contenido-vivo.component.html',
  styleUrls: ['./contenido-vivo.component.css'],
  providers: [ContentService]
})
export class ContenidoVivoComponent implements OnInit {
  //------------------------Contador------------------------//
  private future: Date;
  private futureString: string;
  private diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  private message: string;
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
  fechaComienzo: string = '11/6/2017 23:43:00';
  cFecheDate: Date;
  fechaServidor: string;
  sFechaDate: Date;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private st: SimpleTimer,
    private contentservice: ContentService,
    private db: AngularFireDatabase
  ) {
    this.itemsRef = db.list('chat1');
    this.item = db.list('chat1').valueChanges();
  
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.srcVideo = localStorage.getItem('videoSrc');
      this.startTimeVideo = localStorage.getItem('videoTime');
      this.idVideo = localStorage.getItem('videoId');

      this.cFecheDate = new Date(this.fechaComienzo);
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

    if (this.sFechaDate < this.cFecheDate) {
      this.iniciarEspera();
    }
    else {
      this.iniciarReproduccion();
    }
  }

  // Si la fecha del contenido es posterior a la fecha del servidor se inicia un contador paara el inicio
  iniciarEspera() {
    this.api.getDefaultMedia().canPlay = false;
    this.api.getDefaultMedia().isLive = true;
//    this.futureString = 'November 6, 2017 21:40:00';
    
    
//        this.future = new Date(this.futureString);
        this.future = new Date(this.fechaComienzo);
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
//    this.track = this.api.textTracks[0];
    this.fsAPI = this.api.fsAPI;
    this.nativeFs = this.fsAPI.nativeFullscreen;
  }

  //Comienza la reproduccion
  play() {
    this.api.getDefaultMedia().currentTime = this.currentTimeVideo;
    this.api.getDefaultMedia().play();
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
      this.iniciarReproduccion();
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

}