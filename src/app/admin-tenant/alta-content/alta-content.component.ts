import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {Observable} from 'rxjs/Observable';
import {ContentOMBDDTO} from '../../models/content';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alta-content',
  templateUrl: './alta-content.component.html',
  styleUrls: ['./alta-content.component.css'],
  providers:[ContentService]
})
export class AltaContentComponent implements OnInit {
  isPelicula: boolean = false;
  isSerie: boolean = false;
  isEvento: boolean = false;
  isDestacado: boolean = false;
  isDeportivo:boolean = false;
  isEspectaculo:boolean = false;
  error: string = '';
  isLoading: boolean = true;
  item : ContentOMBDDTO[]=[];
  titulo:string;
  anio:string;
  img:string;
  omdbID:string;
  progreso:number;
  chosenOption: string;
  isUploadFirebase:boolean=false;
  path:any;
  ref:string;
  idAdmin:string;
  
  constructor(private contentService:ContentService,private firebaseApp: FirebaseApp,private router:Router) { }

  ngOnInit() {
  }
  onSearchChange(searchValue : string ) {  
    var body='?nombre='+searchValue;
    this.contentService.searchOMBD(body).subscribe(p => {
      
      this.item=JSON.parse(p['_body'])['Search'];

      //console.log(this.item);
    },e => this.error = e, () => this.isLoading = false);
  }
  onEventSelect(selectValue:string){
    if(selectValue==='1'){
      this.isEspectaculo=true;
    }
    if(selectValue==='2'){
      this.isDeportivo=false;
    }
  }
  onEventDestacado(selectValue : string){
    if(selectValue==='1'){
      this.isDestacado=true;
    }
    if(selectValue==='2'){
      this.isDestacado=false;
    }
  }
  onEventClick(selectValue : string ) {  
    if(selectValue==='1'){
      //pelicula
      this.isPelicula=true;
      this.isEvento=false;
      this.isSerie=false;
      
      console.log("Pelicula");
    }
    if(selectValue==='2'){
      //serie
      this.isPelicula=false;
      this.isEvento=false;
      this.isSerie=true;
      this.isLoading=true;
      console.log("Serie");
    }
    if(selectValue==='3'){
      //evento
      this.isPelicula=false;
      this.isEvento=true;
      this.isSerie=false;
      this.isLoading=true;
      console.log("Evento");
    }
  }
  print(){
    //this.contenido=JSON.parse(this.chosenOption);
    this.titulo=this.chosenOption[0]['Title'];
    this.anio=this.chosenOption[0]['Year'];
    this.img=this.chosenOption[0]['Poster'];
    this.omdbID=this.chosenOption[0]['imdbID'];
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      const storageRef = this.firebaseApp.storage().ref('videos/'+file.name);
      this.ref=file.name;
      let task = storageRef.put(file);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      
        (snapshot) =>{
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          
          this.progreso = (snap.bytesTransferred / snap.totalBytes) * 100;
          if(this.progreso===100){
            this.isUploadFirebase=true;
            //storageRef.getDownloadURL().then(url=>this.path=url);
            
          }
          //console.log('snapshot progress ' + (snap.bytesTransferred / snap.totalBytes) * 100)
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
  download(){
    const storageRef = this.firebaseApp.storage().ref().child('videos/'+this.ref);
    storageRef.getDownloadURL().then(url => 
      this.path=url
        
    );
    
  }
  alta(){
    if(this.isPelicula){
      const storageRef = this.firebaseApp.storage().ref().child('videos/'+this.ref);
      storageRef.getDownloadURL().then(url => 
        this.sendservicealta(url)
      );
    }
    if(this.isSerie){
      this.sendservicealta('');
    }
   
  }
  sendservicealta(url:any){
    url=url.replace('&token','%26token')
    this.path=url;

    let body='?email='+localStorage.getItem('email');
    this.contentService.findAdminID(body).subscribe(p => {
      
      this.idAdmin=p['_body'];
      if(this.isPelicula){
        let subbody='proveedorContenidoId='+this.idAdmin+'&omdbId='+this.omdbID+'&path='+this.path+'&esSerie=false&esDestacado='+this.isDestacado;
        this.contentService.addContenido(subbody).subscribe(p => {
          this.router.navigate(['/admintenant']);
        },e => this.error = e, () => this.isLoading = false);  
      }
      if(this.isSerie){
        
        let subbody='proveedorContenidoId='+this.idAdmin+'&omdbId='+this.omdbID+'&path='+this.path+'&esSerie=true&esDestacado='+this.isDestacado;
        this.contentService.addContenido(subbody).subscribe(p => {
          this.router.navigate(['/admintenant']);
        },e => this.error = e, () => this.isLoading = false);  
      }
      //console.log(this.item);
    },e => this.error = e, () => this.isLoading = false);  
  }
}
