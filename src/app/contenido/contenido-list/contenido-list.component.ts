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
   
  constructor(private contentservice:ContentService) { }

  ngOnInit() {
    this.getContents();
  }

  public getContents() {
    this.contentservice.getData().subscribe(data => {
      this.data = data;
    });
  }
}
