import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {EmpresaService } from '../../services/empresa.service';  
import {Empresa} from '../../models/empresa'

@Component({
  selector: 'app-altaadmin',
  templateUrl: './altaadmin.component.html',
  styleUrls: ['./altaadmin.component.css'],
  providers: [AdminService, EmpresaService],
})

export class AltaadminComponent implements OnInit {
  empresa:Empresa[]=[];
  options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor(private Adminservice: AdminService ,private router: Router, private Empresaservice: EmpresaService) { }

   ngOnInit() {
     let json;
     this.Empresaservice.ListaEmpresas().subscribe(data=>{
       console.log(data.text());
       json=JSON.parse(data.text());
       //Empresa[0]=new Empresa(json[0].id,json[0].nombre);
       console.log(json);
     })
    console.log(status);
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
      this.exito = 'Administrador creado con �xito';
      this.router.navigate(['/login']);

    },e => this.error = e, () => this.isLoading = false);
    /*this.Adminservice.addAdmin(body).subscribe(p => {

        this.status = JSON.parse(p['_body']);

          if (this.status = '200'){

            console.log("dentro de if por 200");
            this.exito = 'Administrador creado con �xito';
            this.router.navigate(['/login']);

          }

      },e => this.error = e, () => this.isLoading = false);*/
    return false;
   }
   
  }
   
    
 
