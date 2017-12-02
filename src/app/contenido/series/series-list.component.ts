import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router , ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-list-series',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
    private contents:Content[]=[];
    private data: any = {};
    private start_index;
    private end_index;
    private size_page = 10;
    private links:any;
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
      this.contentservice.getSeries(start_index, endIndex).subscribe(data => {
      var aux= data;
      this.links=aux;
      this.contents = this.links.content;
      console.log(this.links.content);
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
  }
  
  inicio() {
    this.start_index = 0;
    this.end_index = this.size_page;
    this.iniciob=true;
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
      console.log(this.start_index);
  }

  pagAnterior() {
      this._router.navigate(['/contenido']);
  }

  atras() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
}
