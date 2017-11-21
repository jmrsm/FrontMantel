import { Component, OnInit, Input ,ElementRef,ViewChild,Renderer2} from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido-list',
  templateUrl: './contenido-list.component.html',
  styles: []
})
export class ContenidoListComponent implements OnInit {
  @ViewChild('texto') input;
  @ViewChild('opcion') option;
    contents:Content[]=[];
    data: any = {};
    start_index;
    end_index;
    size_page = 10;
    destacado : any[]=[];
    primero : any[]=[];
    aux:boolean=false;
    cargo:boolean=false;
  constructor(private contentservice:ContentService, private router:Router,private renderer: Renderer2) { }

  ngOnInit() {
    this.inicio();
  }

  public getContents(start_index, endIndex) {
      this.contentservice.getData(start_index, endIndex).subscribe(data => {
      this.data = data;
      for(let entry of this.data.content){
        //el primer contenido
        if(entry.esDestacado==true && this.aux==false){
          this.primero.push(entry);
        }
        if(entry.esDestacado==true && this.aux==true){
          this.destacado.push(entry);
        }
        this.aux=true;
        this.cargo=true;
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
      body='?_start=0&_end=10&_q='+this.input.nativeElement.value;
      this.contentservice.buscarevento(body).subscribe(data => {
        this.data = data;
       });
    }
    if(this.option.nativeElement.value=="Evento"){
      console.log('hola');
      body='?_start=0&_end=99999&_q='+this.input.nativeElement.value;
      this.contentservice.buscarevento(body).subscribe(data => {
        this.data = data;
        
       }); 
    }
    /*if(this.input.nativeElement.value==''){
      this.getContents(0,10);
    }*/
  }
}
