import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router , ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-contenido-categoria',
  templateUrl: './contenido-categoria.component.html',
  styles: []
})
export class ContenidoCategoriaComponent implements OnInit {
    contents:Content[]=[];
    data: any = {};
    start_index;
    categoria: number=23;
    end_index;
    size_page = 10;
   
  constructor(
    private contentservice:ContentService,
    private _route: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
        this.categoria = params['Id'];
    })
    this.inicio();
  }

  public getContents(start_index, endIndex, categoria) {
      this.contentservice.getContByCategoria(start_index, endIndex, categoria).subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }
  
  anterior() {
      this.end_index = this.end_index - this.size_page;
      this.start_index = this.start_index - this.size_page;
      this.getContents(this.start_index, this.end_index, this.categoria);
      this._router.navigate(['/categoria']);
  }
  
  inicio() {
    this.start_index = 0;
    this.end_index = this.size_page;
    this.getContents(this.start_index, this.end_index, this.categoria);
  }
  
  siguiente() {
      this.start_index = this.start_index + this.size_page;
      this.end_index = this.end_index + this.size_page;
      this.getContents(this.start_index, this.end_index, this.categoria);
      this._router.navigate(['/categoria']);
  }

  pagAnterior() {
      this._router.navigate(['/contenido']);
  }
}
