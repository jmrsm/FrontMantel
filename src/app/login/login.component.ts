import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor(private router:Router,private userservice: UserService) { 
  }

  ngOnInit() {
    var tipo= localStorage.getItem('tipo');
    if(tipo==='Usuario'){
      this.router.navigate(['/contenido']);
    }
    if(tipo==='Tenant_admin'){
      
      this.router.navigate(['/admintenant']);
    } 
    if(tipo==='Super_admin'){
      
      this.router.navigate(['/admin']);
    }  
  }
  login(form: NgForm){
    
    //console.log(form.value);
    //var user = e.target.element[0].value;
    //var pass = e.target.element[1].value;
    //console.log(user);
    var body='?email='+form.value.email+'&password='+form.value.password;
    this.userservice.login(body).subscribe(p => {
      //console.log("dentro de if por 200");
    console.log(JSON.parse(p['_body'])['tipoUsuario']);
    if(JSON.parse(p['_body'])['tipoUsuario']==='Usuario'){
      localStorage.setItem( 'email' , form.value.email);
      localStorage.setItem('tipo','Usuario');
      localStorage.setItem('idUsuario', JSON.parse(p['_body'])['id']);
      this.router.navigate(['/contenido']);
    } 
    if(JSON.parse(p['_body'])['tipoUsuario']==='Tenant_admin'){
      localStorage.setItem( 'email' , form.value.email);
      localStorage.setItem('tipo','Tenant_admin');
      this.router.navigate(['/admintenant']);
    }
    if(JSON.parse(p['_body'])['tipoUsuario']==='Super_admin'){
      localStorage.setItem( 'email' , form.value.email);
      localStorage.setItem('tipo','Super_admin');
      this.router.navigate(['/admin']);
    }
    
    },e => this.error = e, () => this.isLoading = false);
    /*if(form.value.email=='admin@admin'){
      localStorage.setItem( 'email' , form.value.email);
      localStorage.setItem('tipo','Super_admin');
      this.router.navigate(['admin']);
    }*/
    
  }

}
