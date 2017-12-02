import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Content } from '../../models/content';

@Component({
  selector: 'app-alta-episodio',
  templateUrl: './alta-episodios.component.html',
  styleUrls: ['./alta-episodios.component.css'],
  providers:[ContentService]
})
export class AltaEpisodioComponent implements OnInit {
  img:string= '../assets/fondo.png';
  idSerie:number;
  data:any= {};
  series:Content[]= [];

  titulo:string;
  episodio:number;
  temporada:number;

  start_index:number= 0;
  end_index:number= 100;

  progresoVideoAux:number;
  progresoVideo:string= '0.00%';
  isUploadFirebaseVideo:boolean= false;
  refVdo:string;
  error: string= '';
  isLoading:boolean= true;
  
  path:string;
  idAdmin:string;
  
  
  constructor(
    private contentService:ContentService,
    private firebaseApp:FirebaseApp,
    private router:Router
  ) { }

  ngOnInit() {
    this.contentService.getSeries(this.start_index, this.end_index).subscribe(data => {
      this.data= data;
    });
  }
  onFileChange(event) {    
    let reader= new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file= event.target.files[0];
      const storageRef= this.firebaseApp.storage().ref('videos/'+file.name);
      this.refVdo= file.name;
      let task= storageRef.put(file);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      
        (snapshot) =>{
          const snap= snapshot as firebase.storage.UploadTaskSnapshot;
          
          this.progresoVideoAux= (snap.bytesTransferred / snap.totalBytes) * 100;
          this.progresoVideo= this.progresoVideoAux.toPrecision(3);
          this.progresoVideo= this.progresoVideo + '%';
          if(this.progresoVideoAux===100){

            this.isUploadFirebaseVideo= true;
          }
        },
        (error) => console.log(error),
        () => {
            const data= {
                src: task.snapshot.downloadURL,
                raw: file
            };
        }
      );
    }
  }

  downloadVideo(){
    const storageRef= this.firebaseApp.storage().ref().child('videos/'+this.refVdo);
    storageRef.getDownloadURL().then(url => 
    this.path= url  
    );
  }

  inicio() {
     this.router.navigate(['/admintenant']);
  }

  alta(form: NgForm) {
    
    const storageRef= this.firebaseApp.storage().ref().child('videos/'+this.refVdo);
    storageRef.getDownloadURL().then(url => 
      this.sendservicealta(url, form)
    );
  }

  callType(value: any){
    this.idSerie= +value;
  }

  sendservicealta(url:any, form: NgForm){
    var temporada= form.value.temporada;
    var episodio= form.value.episodio;

    url= url.replace('&token','%26token');
    this.path= url;
    let body='idSerie='+this.idSerie+'&path='+this.path+'&episodio='+ episodio +'&temporada='+temporada;
    this.contentService.altaEpisodio(body).subscribe(p => {
      this.router.navigate(['/admintenant']);
    },e => this.error = e, () => this.isLoading = false);  
  }

}