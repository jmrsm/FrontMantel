import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { 
  }

  ngOnInit() {
  }
  login(form: NgForm){
    
    console.log(form.value);
    //var user = e.target.element[0].value;
    //var pass = e.target.element[1].value;
    //console.log(user);
    if(form.value.email=='admin@admin' && form.value.password=='admin'){
      //falta crear un ws par defenir el tipo de usuario
      localStorage.setItem( 'email' , form.value.email);
      localStorage.setItem('tipo','admin');
      console.log(localStorage.getItem('email'));
      this.router.navigate(['admin']);
    }else{
      localStorage.setItem('tipo','usuario');
      localStorage.setItem( 'email' , form.value.email);
      this.router.navigate(['contenido']);
    }

    return false;
  }

}
