import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider } from 'angular4-social-login';
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
  user: SocialUser;
  constructor(private authService: AuthService,private userservice: UserService ,private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }
  registrar(form: NgForm){
    var email=form.value.email;
    var password=form.value.password;
    var nombre=form.value.nombre;
    var apellido=form.value.apellido;
    if(this.user){
      email=this.user.email;
      nombre=this.user.firstName;
      apellido=this.user.lastName;
    }
    //console.log(form.value.email);
    var body='email='+email+'&password='+password+'&nombre='+nombre+'&apellido='+apellido;
    
    
    //this.user = new User(email,password,nombre,apellido);
    this.userservice.addUser(body).subscribe(p => {
      //console.log("dentro de if por 200");
      this.exito = 'Cliente creado bien';
      this.router.navigate(['/login']);

    },e => this.error = e, () => this.isLoading = false);
    /*this.userservice.addUser(body).subscribe(p => {

        this.status = JSON.parse(p['_body']);

          if (this.status = '200'){

            console.log("dentro de if por 200");
            this.exito = 'Cliente creado bien';
            this.router.navigate(['/login']);

          }

      },e => this.error = e, () => this.isLoading = false);*/
    return false;
  }
  
  callGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
   
  }
}
