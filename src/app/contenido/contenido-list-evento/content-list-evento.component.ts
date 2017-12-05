import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { NgForm } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido-list-event',
  templateUrl: './content-list-evento.component.html',
  styleUrls: ['./content-list-evento.component.css']
})
export class ContentListEventComponent implements OnInit {
    contents:Content[]=[];
    data: any = {};
    start_index;
    end_index;
    size_page = 10;
    private iniciob:boolean;
  constructor(private contentservice:ContentService, private router:Router) { }

  ngOnInit() {
    this.inicio();
    this.iniciob=true;
  }

  public getContents(start_index, endIndex) {
      this.contentservice.getTodoContEnVivo(start_index, endIndex).subscribe(data => {
      this.data = data;
     }); 
  }
  
  anterior() {
      this.end_index= this.end_index - this.size_page;
      this.start_index= this.start_index - this.size_page;
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
    this.router.navigate(['/eventos']);
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
      this.router.navigate(['/eventos']);
  }

  pagAnterior() {
      this.router.navigate(['/contenido']);
  }

  atras() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  
}
