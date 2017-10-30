import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-viewcontentlive',
  templateUrl: './viewcontentlive.component.html',
  styleUrls: ['./viewcontentlive.component.css'],
  providers:[
    AngularFireDatabase
  ]
})
export class ViewcontentliveComponent implements OnInit {
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { 
    this.itemsRef = db.list('chat');
    this.item = db.list('chat').valueChanges();

  }

  ngOnInit() {
  }
  enviar(form: NgForm){
    var mensaje=form.value.mensaje;
    var nombre=form.value.nombre;
    console.log(mensaje+' '+nombre);
    this.itemsRef.push({name: nombre,message:mensaje});
  }
}
