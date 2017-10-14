import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../services/admin.service';


@Component({
  selector: 'app-altaadmin',
  templateUrl: './altaadmin.component.html',
  styleUrls: ['./altaadmin.component.css'],
  providers: [AdminService],
})
export class AltaadminComponent implements OnInit {
  options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor(private Adminservice: AdminService ,private router: Router) { }

   ngOnInit() {
  }
  Altaadmin(form: NgForm){
    var email=form.value.email;
    var password=form.value.password;
    var nombre=form.value.nombre;
    var apellido=form.value.apellido;
    //console.log(form.value.email);
    var body='email='+email+'&password='+password+'&nombre='+nombre+'&apellido='+apellido+'&proveedorContenidoId=2p';
    
    
    console.log(form.value);
   
   this.Adminservice.addAdmin(body).subscribe(p => {
      //console.log("dentro de if por 200");
      this.exito = 'Administrador creado con éxito';
      this.router.navigate(['/login']);

    },e => this.error = e, () => this.isLoading = false);
    /*this.Adminservice.addAdmin(body).subscribe(p => {

        this.status = JSON.parse(p['_body']);

          if (this.status = '200'){

            console.log("dentro de if por 200");
            this.exito = 'Administrador creado con éxito';
            this.router.navigate(['/login']);
//prueba no me està dejando comitiar ...ss
          }

      },e => this.error = e, () => this.isLoading = false);*/
    return false;
   }
  }
   
    
 
