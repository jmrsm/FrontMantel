import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ActorService} from '../../services/actor.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-alta-actor',
  templateUrl: './alta-actor.component.html',
  styleUrls: ['./alta-actor.component.css'],
  providers: [ActorService]
})
export class AltaActorComponent implements OnInit {
  options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor(private actorservice:ActorService,private router: Router) { }

  ngOnInit() {
  }
  altaactor(form: NgForm){
    //var body= 'nombre='+form.value.nombre+'&id=0'+'&apellido='+form.value.apellido;
    var nombre = form.value.nombre;
    var apellido = form.value.apellido;
    let test_this = {"nombre": nombre,
    "id":0,
    "apellido":apellido
  };
    //var body = {
      //apellido,
      //nombre 
    //};
   //var body = '{"nombre": "' + nombre + '", '+a+'"apellido": "' + apellido + '"}';
    this.actorservice.addActor(test_this).subscribe(p => {
      //console.log("dentro de if por 200");
      this.exito = 'Actor creado bien';
      this.router.navigate(['admin']);

    },e => this.error = e, () => this.isLoading = false);
  }
}
