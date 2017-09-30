import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';  

@Component({
  selector: 'app-contenido-list',
  templateUrl: './contenido-list.component.html',
  styles: []
})
export class ContenidoListComponent implements OnInit {
    contents:Content[]=[];
   
  constructor(private contentservice:ContentService) { }

  ngOnInit() {
    this.contents = this.contentservice.getContents();
  }

}
