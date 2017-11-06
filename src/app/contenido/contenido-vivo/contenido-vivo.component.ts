import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {VgAPI, VgFullscreenAPI} from 'videogular2/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SimpleTimer} from 'ng2-simple-timer';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
@Component({
  selector: 'app-repro-vivo',
  templateUrl: './contenido-vivo.component.html',
  styleUrls: ['./contenido-vivo.component.css'],
  providers: [ContentService]
})
export class ContenidoVivoComponent implements OnInit {
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
  fechaComienzo: string = '11/6/2017 00:45:00';
  cFecheDate: Date;
  fechaServidor: string;
  sFechaDate: Date;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private st: SimpleTimer,
    private contentservice: ContentService
  ) {}

  ngOnInit() {
      this._route.params.forEach((params: Params) => {
      this.srcVideo = localStorage.getItem('videoSrc');
      this.startTimeVideo = localStorage.getItem('videoTime');
      this.idVideo = localStorage.getItem('videoId');

      this.cargarFechaServidor();
      this.cFecheDate = new Date(this.fechaComienzo);
        
      this.st.newTimer('1sec', 1);
        
    });
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
      console.log('serv: '+this.sFechaDate+' cont: '+this.cFecheDate);
      
      if (this.sFechaDate < this.cFecheDate) {
          this.iniciarEspera();
      }
      else {
          this.iniciarReproduccion();
      }
    }
  
    // Si la fecha del contenido es posterior a la fecha del servidor se inicia un contador paara el inicio
    iniciarEspera() {
        
    }
  
    // Si la fecha del contenido es igual o anterior a la fecha del servidor se inicia la reproduccion
    // Mejora a hacer, teniendo la duracion del contenido se podria simular un fin de transmision
    iniciarReproduccion() {
      let dserv = this.sFechaDate.getTime() / 1000;
      let dcont = this.cFecheDate.getTime() / 1000;
      
      let res = dserv - dcont; 
      this.currentTimeVideo = res;
      
      this.play(this.api);
      
    }
  
     onPlayerReady(api: VgAPI) {
        this.api = api;
        this.fsAPI = this.api.fsAPI;
        this.nativeFs = this.fsAPI.nativeFullscreen;
        
        this.api.getDefaultMedia().currentTime = +this.startTimeVideo;
        this.api.getDefaultMedia().play();
    }
  
    play(api: VgAPI) {
        this.api = api;
        
        this.api.getDefaultMedia().currentTime = +this.startTimeVideo;
        this.api.getDefaultMedia().play();
    }
  
  
  
}