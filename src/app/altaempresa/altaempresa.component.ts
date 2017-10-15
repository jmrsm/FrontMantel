import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {EmpresaService} from '../services/Empresa.service';
import {Empresa} from '../models/empresa';

@Component({
  selector: 'app-altaempresa',
  templateUrl: './altaempresa.component.html',
  styleUrls: ['./altaempresa.component.css'],
  providers: [EmpresaService],
})
export class AltaempresaComponent implements OnInit {
options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor(private Empresaservice: EmpresaService ,private router: Router) { }


  ngOnInit() {
  }
Altaempresa(form: NgForm){
        var nombre=form.value.nombre;
          
    
    
    console.log(form.value);
    
     this.Empresaservice.addEmpresa(body).subscribe(p => {
      //console.log("dentro de if por 200");
      this.exito = 'Empresa creada con éxito';
      this.router.navigate(['/login']);

    },e => this.error = e, () => this.isLoading = false);
    /*this.Empresaservice.addEmpresa(body).subscribe(p => {

        this.status = JSON.parse(p['_body']);

          if (this.status = '200'){

            console.log("dentro de if por 200");
            this.exito = 'Empresa creada con éxito';
            this.router.navigate(['/login']);
          }
      },e => this.error = e, () => this.isLoading = false);*/
    return false;
   }
  }
   