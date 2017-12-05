import { Component, OnInit, Input ,ElementRef,ViewChild,Renderer2} from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router } from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-bloqueo-contenido',
  templateUrl: './bloqueo-contenido.component.html',
  styleUrls: ['./bloqueo-contenido.component.css'],
  providers: [AdminService],
})
export class BloqueoContenidoComponent implements OnInit {
  	@ViewChild('texto') input;
  	@ViewChild('opcion') option;
	contents:Content[]=[];
	data: any = {};
	idaux: string;
	msj: string = '';
	link: string = '';
	b: Boolean;
	isLoading: boolean = true;
	error: string = '';
	exito: string = '';

  constructor(private contentservice:ContentService,private adminService:AdminService,private router: Router) { }

  ngOnInit() {
  }

  search(){
    var body='';
    if(this.option.nativeElement.value=="Pelicula"){
      body='?_start=0&_end=10&_q='+this.input.nativeElement.value;
      this.contentservice.buscarpelicula(body).subscribe(data => {
        this.data = data;
        console.log(this.data.content);
        console.log('Pelicula');
        
       }); 
    }
    if(this.option.nativeElement.value=="Serie"){
      body='?_start=0&_end=10&_q='+this.input.nativeElement.value;
      this.contentservice.buscarevento(body).subscribe(data => {
        this.data = data;
       });
    }
    if(this.option.nativeElement.value=="Evento"){
      body='?_start=0&_end=10&_q='+this.input.nativeElement.value;
      this.contentservice.buscarevento(body).subscribe(data => {
        this.data = data;
        
       }); 
    }
    /*if(this.input.nativeElement.value==''){
      this.getContents(0,10);
    }*/
  }

  onChange(peli){
  	this.idaux = peli;
  	console.log(this.idaux);
  }

  onEventClick(selectValue : string ) { 

    if(selectValue==='1'){
	this.b = true
	}
	else {
		this.b = false;
	}
}

   bloqueoContenido(form: NgForm){
  		var body='id='+this.idaux +'&bloquear='+this.b;

   		console.log(body);
								this.adminService.bloqContenido(body).subscribe(p => {
						      this.exito = 'Contenido bloqueado con éxito';
						      this.router.navigate(['/bloqueo-contenido']);

						    },e => this.error = e, () => this.isLoading = false);
						   
						    return false;
  	}


}
