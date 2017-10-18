import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoriaService} from '../../services/categoria.service';
@Component({
  selector: 'app-alta-categoria',
  templateUrl: './alta-categoria.component.html',
  styleUrls: ['./alta-categoria.component.css'],
  providers: [CategoriaService]
})
export class AltaCategoriaComponent implements OnInit {
  options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor( private categoriaservice:CategoriaService,private router: Router) { }

  ngOnInit() {
  }
  altacategoria(form: NgForm){
    var body='nombre='+form.value.nombre;
    this.categoriaservice.addCategoria(body).subscribe(p => {
      //console.log("dentro de if por 200");
      this.exito = 'Categoria creado bien';
      this.router.navigate(['admin']);

    },e => this.error = e, () => this.isLoading = false);
  
  }
  
}
