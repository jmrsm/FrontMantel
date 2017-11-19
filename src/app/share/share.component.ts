import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
  providers: [UserService,AngularFireDatabase]
})
export class ShareComponent implements OnInit {
  nombre:string;
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { 
    this.nombre=localStorage.getItem('email');
    this.itemsRef = db.list('mail1');
    this.item = db.list('mail1').valueChanges();
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
    
  }
  enviar(form:NgForm){
    console.log(form.value);
    var mensaje=form.value.texto;
    var nombre=localStorage.getItem('email');
    var d=form.value.destinatario;
    var destinatario= d.split(";");
    var f=new Date();
    for(let c of destinatario){
        this.itemsRef.push({name: nombre,
          message: mensaje,
          type:'share',
          date: f.getDate()+"/"+f.getMonth()+"/"+f.getFullYear(),
          hours: f.getHours()+":"+f.getMinutes(),
          read:false,
          notified:false,
          addressee: c});  
    }
  }
  read(item:any){
    this.itemsRef.update(item.key,{read:true});
  }
}
