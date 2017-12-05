import { Component, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { ContentService } from '../../services/content.service';

export interface IMedia {
    index:number,
    title:string;
    src:string;
    type:string;
}

@Component({
    selector: 'app-repro-series',
    templateUrl: './repro-series.component.html',
    styleUrls: [ './repro-series.component.css' ]
})
export class ReproSeriesComponent {
    contPos:string;
    idcont:number;
    position:number;
    values:Array<any>;
    temporadas:Array<any>;
    dataVal:any;
    playlist: Array<IMedia> = [
        {
            index: 0,
            title: '',
            src: './assets/cargando.mp4',
            type: 'video/mp4'
        }
    ];
    cargo:boolean= false;

    currentIndex = 0;
    currentItem: IMedia = this.playlist[ this.currentIndex ];
    api: VgAPI;
    private auxIndex:number= 0;

    constructor(private contentservice:ContentService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            this.contPos= params['idindex'];
            this.idcont= +this.contPos.split('@')[0];
            this.position= +this.contPos.split('@')[1];
        })

        this.contentservice.buscarEpisodiosSerie(this.idcont).subscribe(data=>{
        this.dataVal= data;
        let valuesAux= new Array<any>();
        for (let ep of this.dataVal) {
          this.auxIndex++;
          let titleValue= 'Temporada: ' + ep.temporadaN + ' Ep: ' + ep.capitulo;
          let srcValue= ep.path;
          let typeValue= 'video/mp4';
          var epi = {
            index: this.auxIndex,
            title: titleValue,
            src: srcValue,
            type: typeValue
          }
          this.playlist.push(epi);
        }

        let aux= new Array<any>();
        for (let temp of this.dataVal) {
          let tempa= temp.temporadaN;
          if (aux.indexOf(tempa) == -1){
            aux.push(tempa);
          }
        }
        this.temporadas= aux;
      });

    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));    
    }

    nextVideo() {
        if (this.currentIndex === 0) 
            this.currentIndex =+ this.position + 1;
        else  
            this.currentIndex++;
            
        if (this.currentIndex === this.playlist.length) {
            this.currentIndex = 0;
        }

        this.currentItem = this.playlist[ this.currentIndex ];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(index: number) {
        this.currentIndex = index;
        this.currentItem = this.playlist[ this.currentIndex ];
    }

    atras() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
}
