import { Component, OnInit, Input ,ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';  
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-contenido-list',
  templateUrl: './contenido-list.component.html',
  styleUrls: ['./contenido-list.component.css'],
})
export class ContenidoListComponent implements OnInit {
  @ViewChild('texto') input;
  @ViewChild('opcion') option;
//---------------------prueba--------------------------//
  public carouselBannerItems: Array<any> = [];
  public carouselBanner: NgxCarousel;

  public carouselTileTwoItems: Array<any> = [];
  public carouselTileTwo: NgxCarousel;
//-----------------------------------------------------//
    contents:Content[]=[];
    data: any = {};
    favoritos: any = {};
    start_index;
    end_index;
    size_page = 10;
    destacado : any[]=[];
    primero : any[]=[];
    aux:boolean=false;
    cargo:boolean=false;
    posterprimero:string='';
    private eventos: any= {};
    private links:any;
    private series:any= {};
    private peliculas:any[]= [];
    private favoritosIndex:number= 0;
    private destacadoIndex:number= 0;
  constructor(
    private contentservice:ContentService,
    private router:Router,
    private renderer: Renderer2,
    private userservice: UserService
  ) { }

  ngOnInit() {
    this.inicio();

    this.carouselBanner = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 4,
      speed: 500,
      interval: 5000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      custom: 'banner',
      touch: true,
      loop: false,
      easing: 'cubic-bezier(0, 0, 0.2, 1)'
    };

    this.carouselTileTwo = {
      grid: { xs: 1, sm: 3, md: 4, lg: 6, all: 230 },
      speed: 600,
      interval: 3000,
      point: {
        visible: true
      },
      load: 2,
      touch: true
    };

    this.carouselDestacado();
    this.carouselContenido();
  }

  public getEventos(start_index, endIndex) {
      this.contentservice.getTodoContEnVivo(start_index, endIndex).subscribe(eventos => {
      this.eventos= eventos;
     }); 
  }

  public getSeries(start_index, endIndex) {
      this.contentservice.getSeries(start_index, endIndex).subscribe(series => {
      var aux= series;
      this.links= aux;
      this.series= this.links.content;
    });
  }

  public getContents(start_index, endIndex) {
      this.contentservice.getData(start_index, endIndex).subscribe(data => {
      this.data = data;
     for(let entry of this.data.content){
      if(entry.esDestacado==true) {
        this.destacado.push(entry);
        this.destacadoIndex++;
      }        
        this.aux=true;
        this.cargo=true;
     }
     for (let peli of this.data.content) {
      if (peli.Poster!=='N/A') {
        this.peliculas.push(peli);
      }
     }

     }); 
  }
  
  anterior() {
      this.end_index = this.end_index - this.size_page;
      this.start_index = this.start_index - this.size_page;
      this.getContents(this.start_index, this.end_index);
  }
  
  inicio() {
    this.start_index = 0;
    this.end_index = this.size_page;
    this.getContents(this.start_index, this.end_index);
    this.getEventos(this.start_index, this.end_index);
    this.getSeries(this.start_index, this.end_index);
    this.router.navigate(['/contenido']);
  }
  
  siguiente() {
      this.start_index = this.start_index + this.size_page;
      this.end_index = this.end_index + this.size_page;
      this.getContents(this.start_index, this.end_index);
      this.router.navigate(['/contenido']);
  }
  search(){
    var body='';
    if(this.option.nativeElement.value=="Pelicula"){
      body='?_start=0&_end=99999&_q='+this.input.nativeElement.value;
      this.contentservice.buscarpelicula(body).subscribe(data => {
        this.data = data;
        
       }); 
    }
    if(this.option.nativeElement.value=="Serie"){
      body='?_start=0&_end=99999&_q='+this.input.nativeElement.value;
      this.contentservice.buscarevento(body).subscribe(data => {
        this.data = data;
       });
    }
    if(this.option.nativeElement.value=="Evento"){
      body='?_start=0&_end=99999&_q='+this.input.nativeElement.value;
      this.contentservice.buscarevento(body).subscribe(data => {
        this.data = data;
        
       }); 
    }
  }

    onmoveFn(data) {
    // console.log(data);
  }

  public carouselDestacado() {
  }

  public carouselContenido() {
  }
}
