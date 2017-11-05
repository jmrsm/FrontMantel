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
  public currentTimeVideoArray: string[];
  public currentTimeVideo: string;
  public startTimeVideo;
  public idVideo;
  public idUsuario;
  public timerId: string;
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
    console.log(this.st.getSubscription());
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

        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                this.api.getDefaultMedia().currentTime = 15;
            }
        );
    }
  
  persistirCurrentTime() {
    this.contentservice.setTimeCurrent(this.idUsuario, this.idVideo, this.currentTimeVideo).subscribe(p => {
      console.log(p);
    });
  }
  
  startTime() {
    this.startTimeVideo = this.contentservice.getTimeUserView(this.idUsuario, this.idVideo);
  }
}