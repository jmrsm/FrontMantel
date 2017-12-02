import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router , ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-list-peliculas',
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.css']
})
export class PeliculasListComponent implements OnInit {
    contents:Content[]=[];
    data: any = {};
    start_index;
    end_index;
    size_page = 10;
    private iniciob:boolean;
   
  constructor(
    private contentservice:ContentService,
    private _route: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit() {
    this.inicio();
    this.iniciob=true;
  }

  public getContents(start_index, endIndex) {
      this.contentservice.getData(start_index, endIndex).subscribe(data => {
      this.data = data;
    });
  }
  
  anterior() {
      this.end_index = this.end_index - this.size_page;
      this.start_index = this.start_index - this.size_page;
      if (this.start_index===0) {
        this.iniciob=true;
      }
      else {
        this.iniciob=false;
      }
      this.getContents(this.start_index, this.end_index);
      this._router.navigate(['/peliculas']);
  }
  
  inicio() {
    this.start_index = 0;
    this.iniciob=true;
    this.end_index = this.size_page;
    this.getContents(this.start_index, this.end_index);
  }
  
  siguiente() {
      this.start_index = this.start_index + this.size_page;
      if (this.start_index===0) {
        this.iniciob=true;
      }
      else {
        this.iniciob=false;
      }
      this.end_index = this.end_index + this.size_page;
      this.getContents(this.start_index, this.end_index);
      this._router.navigate(['/peliculas']);
  }

  pagAnterior() {
      this._router.navigate(['/contenido']);
  }

  atras() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
}
