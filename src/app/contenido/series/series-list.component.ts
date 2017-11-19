import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router , ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-list-series',
  templateUrl: './series-list.component.html',
  styles: []
})
export class SeriesListComponent implements OnInit {
    contents:Content[]=[];
    data: any = {};
    start_index;
    end_index;
    size_page = 10;
   
  constructor(
    private contentservice:ContentService,
    private _route: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit() {
    this.inicio();
  }

  public getContents(start_index, endIndex) {
      this.contentservice.getSeries(start_index, endIndex).subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }
  
  anterior() {
      this.end_index = this.end_index - this.size_page;
      this.start_index = this.start_index - this.size_page;
      this.getContents(this.start_index, this.end_index);
      this._router.navigate(['/series']);
  }
  
  inicio() {
    this.start_index = 0;
    this.end_index = this.size_page;
    this.getContents(this.start_index, this.end_index);
  }
  
  siguiente() {
      this.start_index = this.start_index + this.size_page;
      this.end_index = this.end_index + this.size_page;
      this.getContents(this.start_index, this.end_index);
      this._router.navigate(['/series']);
  }

  pagAnterior() {
      this._router.navigate(['/contenido']);
  }
}
