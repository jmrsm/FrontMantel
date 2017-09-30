import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`]
})
export class ContentComponent implements OnInit {
  @Input() content:Content;
  constructor() { }

  ngOnInit() {
  }

}
