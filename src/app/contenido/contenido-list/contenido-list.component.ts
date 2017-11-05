import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  

@Component({
  selector: 'app-contenido-list',
  templateUrl: './contenido-list.component.html',
  styles: []
})
export class ContenidoListComponent implements OnInit {
    contents:Content[]=[];
    data: any = {};
    start_index;
    end_index;
    size_page = 10;
   
  constructor(private contentservice:ContentService) { }

  ngOnInit() {
    this.inicio();
  }

  public getContents(start_index, endIndex) {
      this.contentservice.getData(start_index, endIndex).subscribe(data => {
      this.data = data;
    });
  }
  
  anterior() {
      this.end_index = this.end_index - this.size_page;
      this.start_index = this.start_index - this.size_page;
      this.getContents(this.start_index, this.end_index);
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
  }
  
}
