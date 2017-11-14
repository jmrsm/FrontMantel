import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {Observable} from 'rxjs/Observable';
import {ContentOMBDDTO} from '../../models/content';
import {NgForm} from '@angular/forms';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alta-content',
  templateUrl: './alta-content-vivo.component.html',
  styleUrls: ['./alta-content-vivo.component.css'],
  providers:[ContentService]
})
export class AltaContentVivoComponent implements OnInit {
  isDestacado:boolean = false;
  isDeportivo:boolean = true;
  isEspectaculo:boolean = false;
  paso:boolean = true;
  fechaAux:string;
  fechaActual:Date = new Date();
  //fechaInicio:Date;
  //horaInicio:Date;
  eventoDeportivoNombreDeporte:string;
  eventoDeportivoNombreEquipoLocal:string;
  eventoDeportivoNombreEquipoVisitante:string;
  horaActual:string = '00:00:00';
  duracion:string = '00:00:00'
  img:any = '../assets/icono-futbol.png';
  imgEsp:any = '../assets/icono-espectaculo-rock.png';
  progresoVideoAux:number;
  progresoImagenAux:number;
  progresoVideo:string = '0.00';
  progresoImagen:string = '0.00';
  isUploadFirebaseImagen:boolean=false;
  isUploadFirebaseVideo:boolean=false;
  refImg:string;
  refVdo:string;
  esPago:boolean=false;
  precio:number=0.0;
  equipos:boolean=false;
  error: string = '';
  isLoading: boolean = true;
  titulo:string;
  path:string;
  ref:string;
  idAdmin:string;
  private runtime = new Date().toLocaleDateString();;
  
  constructor(private contentService:ContentService,private firebaseApp: FirebaseApp,private router:Router) { }

  ngOnInit() {
    this.fechaAux = this.fechaActual.getFullYear() + '-' + this.fechaActual.getMonth() + 
    '-' + this.fechaActual.getDate();
  }

  onEventClick(selectValue:string){
    if(selectValue==='1'){
      this.isDeportivo=true;
      this.isEspectaculo=false;
    }
    if(selectValue==='2'){
      this.isDeportivo=false;
      this.isEspectaculo=true;
    }
  }
/*
   set fechaInicio(e){
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.fechaInicio.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get fechaInicio(){
    return this.fechaInicio.toISOString().substring(0, 10);
  }

   set horaInicio(e){
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.horaInicio.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get horaInicio(){
    return this.horaInicio.toISOString().substring(0, 10);
  }

   set runtime(e){
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.runtime.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get runtime(){
    return this.runtime.toISOString().substring(0, 10);
  }
*/
 /* anterior(form: NgForm) {
    this.paso = true;
    if (this.isDeportivo) {

    }
    else {

    }
  }

  siguiente(form: NgForm) {
    this.paso = false;
    if (this.isDeportivo) {
      this.titulo = form.value.titulo;
      this.fechaInicio = form.value.fechaInicio;
      this.horaInicio = form.value.horaInicio;
      this.duracion = form.value.duracion;
      this.eventoDeportivoNombreDeporte = form.value.eventoDeportivoNombreDeporte;
      this.eventoDeportivoNombreEquipoLocal = form.value.eventoDeportivoNombreEquipoLocal;
      this.eventoDeportivoNombreEquipoVisitante = form.value.eventoDeportivoNombreEquipoVisitante;

    }
    else {

    }
  }
*/
  onEventSelected(selectValue : string){
    if(selectValue==='1'){
      this.isDestacado=true;
    }
    if(selectValue==='2'){
      this.isDestacado=false;
    }
  }

  onFileImagenChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const storageRef = this.firebaseApp.storage().ref('imagenes/'+file.name);
      this.refImg=file.name;
      let task = storageRef.put(file);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      
        (snapshot) =>{
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          
          this.progresoImagenAux = (snap.bytesTransferred / snap.totalBytes) * 100;
          this.progresoImagen = this.progresoImagenAux.toPrecision(3);
          if(this.progresoImagenAux===100){
            this.isUploadFirebaseImagen=true; 
            if (this.isDeportivo) {
              this.downloadImagen(); 
            }
            else {
              this.downloadImagenEspect();
            }
            
          }
        },
        (error) => console.log(error),
        () => {
            const data = {
                src: task.snapshot.downloadURL,
                raw: file
            };
            
        }
      );
    }
  }


  onFileVideoChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const storageRef = this.firebaseApp.storage().ref('videos/'+file.name);
      this.refVdo=file.name;
      let task = storageRef.put(file);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      
        (snapshot) =>{
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          
          this.progresoVideoAux = (snap.bytesTransferred / snap.totalBytes) * 100;
          this.progresoVideo = this.progresoVideoAux.toPrecision(3);
          
          if(this.progresoVideoAux===100){

            this.isUploadFirebaseVideo=true;
          }
        },
        (error) => console.log(error),
        () => {
            const data = {
                src: task.snapshot.downloadURL,
                raw: file
            };
            
        }
      );
    }
  }
  downloadImagen(){
    const storageRef = this.firebaseApp.storage().ref().child('imagenes/'+this.refImg);
    storageRef.getDownloadURL().then(url => 
      this.img=url
    );
  }

  downloadImagenEspect(){
    const storageRef = this.firebaseApp.storage().ref().child('imagenes/'+this.refImg);
    storageRef.getDownloadURL().then(url => 
      this.imgEsp=url
    );
  }

  downloadVideo(){
    const storageRef = this.firebaseApp.storage().ref().child('videos/'+this.refVdo);
    storageRef.getDownloadURL().then(url => 
      this.path=url
        
    );
    
  }

onEventDestacado(selectValue : string){
    if(selectValue==='1'){
      this.isDestacado=true;
    }
    if(selectValue==='2'){
      this.isDestacado=false;
    }
  }

  inicio() {
     this.router.navigate(['/admintenant']);
  }

  alta(form: NgForm) {
    
    const storageRef = this.firebaseApp.storage().ref().child('videos/'+this.refVdo);
    storageRef.getDownloadURL().then(url => 
        this.sendservicealta(url, form)
      );
  }

  sendservicealta(url: any, form: NgForm){
    var plot = form.value.Plot;
    var poster;
    var runtime;
    var fechaInicio;
    var horaInicio;
    if (this.isDeportivo) {
      fechaInicio = form.value.fechaInicioDepo;
      horaInicio = form.value.horaInicioDepo;
      runtime = form.value.runtimeDepo;
      poster = this.img;
    }
    else {
      fechaInicio = form.value.fechaInicioEsp;
      horaInicio = form.value.horaInicioEsp;
      runtime = form.value.runtimeEsp;
      poster = this.imgEsp;
    }
    
    var duracionaux = runtime.split(':');
    var duracion = (duracionaux[0] * 3600) + (duracionaux[1] * 60) + duracionaux[2]; 
    var titulo = form.value.titulo;
    var esDestacado = this.isDestacado;
    var esPago = this.esPago;
    var eventoDeportivoNombreDeporte = form.value.eventoDeportivoNombreDeporte;
    var eventoDeportivoNombreEquipoLocal = form.value.eventoDeportivoNombreEquipoLocal;
    var eventoDeportivoNombreEquipoVisitante = form.value.eventoDeportivoNombreEquipoVisitante;
    var durSec;

    
    var comienzo = new Date(fechaInicio + ' ' + horaInicio);
    var id = 0; 
    var precio = form.value.precio;
    url=url.replace('&token','%26token');
    this.path=url;
    poster=poster.replace('&token','%26token');

    let body='?email='+localStorage.getItem('email');
    this.contentService.findAdminID(body).subscribe(p => {
      
      this.idAdmin=p['_body'];
      if(this.isDeportivo){ 
        var subBody='{\"Plot\":\"' + plot + '\",\"Poster\":\"' + poster + '\",\"Runtime\":'  + duracion +
        ',\"Title\":\"' + titulo + '\",\"esDestacado\":' + esDestacado + ',\"esPago\":'+ esPago +
        ',\"eventoDeportivoNombreDeporte\":\"' + eventoDeportivoNombreDeporte +
        '\",\"eventoDeportivoNombreEquipoLocal\":\"' + eventoDeportivoNombreEquipoLocal +
        '\",\"eventoDeportivoNombreEquipoVisitante\":\"' + eventoDeportivoNombreEquipoVisitante +
        '\",\"fechaInicio\":\"' + fechaInicio + 'T' + horaInicio + '.374Z\", \"id\":' + 1 + ',\"path\":\"' + this.path + '\",\"precio\":' +
        precio + ',\"proveedorContenido\":{\"id\":' + this.idAdmin + '},\"tipoContenido\":\"EVENTO_DEPORTIVO\"}';
        console.log(subBody);
        this.contentService.addContenidoEnVivo(subBody).subscribe(p => {
          this.router.navigate(['/admintenant']);
        },e => this.error = e, () => this.isLoading = false);  
      }
      else {
        
        var subBody='{\"Plot\":\"' + plot + '\",\"Poster\":\"' + poster + '\",\"Runtime\":'  + duracion +
        ',\"Title\":\"' + titulo + '\",\"esDestacado\":' + esDestacado + ',\"esPago\":'+ esPago +
        ',\"fechaInicio\":\"' + fechaInicio + 'T' + horaInicio + '.374Z\", \"id\":' + 1 + ',\"path\":\"' + this.path + '\",\"precio\":' +
        precio + ',\"proveedorContenido\":{\"id\":' + this.idAdmin + '},\"tipoContenido\":\"EVENTO_ESPECTACULO\"}';
        
        this.contentService.addContenidoEnVivo(subBody).subscribe(p => {
          this.router.navigate(['/admintenant']);
        },e => this.error = e, () => this.isLoading = false);  
      }
    },e => this.error = e, () => this.isLoading = false); 
  }
}


