import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  providers: [UserService]
})
export class RegistrarComponent implements OnInit {
  options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor(private userservice: UserService ,private router: Router) { }

  ngOnInit() {
  }
  registrar(form: NgForm){
    var email=form.value.email;
    var password=form.value.password;
    var nombre=form.value.nombre;
    var apellido=form.value.apellido;
    //console.log(form.value.email);
    var body='email='+email+'&password='+password+'&nombre='+nombre+'&apellido='+apellido;
    
    //this.user = new User(email,password,nombre,apellido);
    this.userservice.addUser(body).subscribe(p => {

        this.status = JSON.parse(p['_body']);

          if (this.status = '200'){

            console.log("dentro de if por 200");
            this.exito = 'Cliente creado bien';
            this.router.navigate(['/login']);

          }

      },e => this.error = e, () => this.isLoading = false);
    return false;
  }
  

}
