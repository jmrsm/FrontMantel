import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido-list-event',
  templateUrl: './content-list-evento.component.html',
  styles: []
})
export class ContentListEventComponent implements OnInit {
    contents:Content[]=[];
    data: any = {};
    start_index;
    end_index;
    size_page = 10;
  constructor(private contentservice:ContentService, private router:Router) { }

  ngOnInit() {
    this.inicio();
  }

  public getContents(start_index, endIndex) {
      this.contentservice.getTodoContEnVivo(start_index, endIndex).subscribe(data => {
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
    this.router.navigate(['/eventos']);
  }
  
  siguiente() {
      this.start_index = this.start_index + this.size_page;
      this.end_index = this.end_index + this.size_page;
      this.getContents(this.start_index, this.end_index);
      this.router.navigate(['/eventos']);
  }
  
}
