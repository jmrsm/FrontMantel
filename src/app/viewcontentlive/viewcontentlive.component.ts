import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-viewcontentlive',
  templateUrl: './viewcontentlive.component.html',
  styleUrls: ['./viewcontentlive.component.css'],
  providers:[
    AngularFireDatabase,
    UserService
  ]
})
export class ViewcontentliveComponent implements OnInit {
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  nick:string;
  todo:string='Todos';
  destinatario:string;
  constructor(private db: AngularFireDatabase) { 
    this.itemsRef = db.list('prueba12');
    this.item = db.list('prueba12').valueChanges();
    console.log(this.item);
    this.nick=localStorage.getItem('email');
  }

  ngOnInit() {
  }
  enviar(form: NgForm){
    var mensaje=form.value.mensaje;
    var nombre=form.value.nombre;
    var d=form.value.destinatario;
    var destinatario= d.split(";");
    if(destinatario==''){
      this.itemsRef.push({name: this.nick,message:mensaje,addressee: this.todo});    
    }else{
      for(let c of destinatario){
        
          this.itemsRef.push({name: this.nick,message:mensaje,addressee: c});  
      }  
    }
    /*
    for(let c of destinatario){
      if(c){
        this.itemsRef.push({name: this.nick,message:mensaje,addressee: this.todo});    
      }else{
        this.itemsRef.push({name: this.nick,message:mensaje,addressee: c});  
      }
      
    }*/
  }
}
