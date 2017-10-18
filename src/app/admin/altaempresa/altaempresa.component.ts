import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {EmpresaService} from '../../services/empresa.service';


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
  constructor(private router: Router,private empresaservice:EmpresaService) { }

  ngOnInit() {
  }
Altaempresa(form: NgForm){
    var nombre=form.value.nombreEmpresa;
      
    var body='nombre='+nombre;
    console.log(form.value);
    
     this.empresaservice.addEmpresa(body).subscribe(p => {
      //console.log("dentro de if por 200");
      this.exito = 'Empresa creada con �xito';
      this.router.navigate(['/admin']);

    },e => this.error = e, () => this.isLoading = false);
    /*this.Empresaservice.addEmpresa(body).subscribe(p => {

        this.status = JSON.parse(p['_body']);

          if (this.status = '200'){

            console.log("dentro de if por 200");
            this.exito = 'Empresa creada con �xito';
            this.router.navigate(['/login']);
          }
      },e => this.error = e, () => this.isLoading = false);*/
    return false;
   }
  }
   