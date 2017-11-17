import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VgAPI, VgFullscreenAPI } from 'videogular2/core';
import { Poster } from 'videogular-poster';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SimpleTimer } from 'ng2-simple-timer';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
@Component({
  selector: 'app-repro-comun',
  templateUrl: './contenido-comun.component.html',
  styleUrls: ['./contenido-comun.component.css'],
  providers: [ContentService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContenidoComunComponent implements OnInit {
  sources: Array<Object>;
  api: VgAPI;
  fsAPI: VgFullscreenAPI;
  nativeFs: boolean = true;
  public srcVideo;
  public currentTimeVideoArray: string[];
  public currentTimeVideo: string;
  public startTimeVideo = 0;
  public idVideo;
  public idUsuario;
  public timerId: string;
  titulo:string;
  pepe:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private st: SimpleTimer,
    private contentservice: ContentService
    
  ) {}

  ngOnInit() {
      this._route.params.forEach((params: Params) => {
      this.srcVideo = localStorage.getItem('videoSrc');
      this.pepe = localStorage.getItem('videoSrc');
      this.idVideo = localStorage.getItem('videoId');
      this.idUsuario = localStorage.getItem('idUsuario');
      this.titulo = localStorage.getItem('titulo');
      this.startTime();
      this.st.newTimer('5sec', 5);
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
    this.subscribeTimer();
  }


  subscribeTimer() {
    if (this.timerId) {
      this.st.unsubscribe(this.timerId);
      this.timerId = undefined;
    } else {
      this.timerId = this.st.subscribe('5sec', () => this.timercallback());
    }
  }
  

  timercallback(): void {
    this.currentTimeVideo = this.api.currentTime+'';
    this.currentTimeVideoArray = this.currentTimeVideo.split('.');
    this.currentTimeVideo = this.currentTimeVideoArray[0];
    
    this.persistirCurrentTime();
  }
      onPlayerReady(api: VgAPI) {
        this.api = api;
        this.fsAPI = this.api.fsAPI;
        this.nativeFs = this.fsAPI.nativeFullscreen;
    }
  
  persistirCurrentTime() {
    if (this.currentTimeVideo !== null && this.idUsuario !== null && this.idVideo !== null) {
      if (this.currentTimeVideo !== 'undefined' && this.idUsuario !== 'undefined' && this.idVideo !== 'undefined') {
       
        this.contentservice.setTimeCurrent(this.idUsuario, this.idVideo, this.currentTimeVideo).subscribe(p => {

          },
          error => {
            if (error.status !== 200)
              console.log(<any>error);
          }
        );
      }
    }
  }
  
   startTime() {
   this.contentservice.getTimeUserView(this.idUsuario, this.idVideo).subscribe(
      result => {
        this.startTimeVideo = result;
        if (result > 5) {
          this.api.getDefaultMedia().currentTime = +this.startTimeVideo - 5; 
        }
        else {
          this.api.getDefaultMedia().currentTime = +this.startTimeVideo;
        }
        this.api.getDefaultMedia().play();
      },
      error => {
        console.log(<any>error);
      }
    ); 
  }

  anterior() {
      this._router.navigate(['/contenido']);
  }
}