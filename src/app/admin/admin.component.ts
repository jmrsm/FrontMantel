import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import {EmpresaService} from '../services/empresa.service';  
import {Empresa} from '../models/empresa';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [EmpresaService],
})
export class AdminComponent implements OnInit {
	 idEmpresa: string = '';
	  empresas:Empresa[]=[];
	  options: string[] = [];
	  status: any = '';
	  exito: string = '';
	  errorMessage: string = '';
	  error: string = '';
	  isLoading: boolean = true;
	  msj: string = '';
	  link: string = '';

  constructor(private Empresaservice:EmpresaService) { }

  ngOnInit() {
  	let json;
     this.Empresaservice.ListaEmpresas().subscribe(data=>{
       let aux;
       console.log(data.text());
       json=JSON.parse(data.text());
       //Empresa[0]=new Empresa(json[0].id,json[0].nombre);
       for(let entry of json){
         this.empresas.push(new Empresa(entry.nombre,entry.id));
       }
       console.log(this.empresas);
     });
    console.log(status);
}

}
