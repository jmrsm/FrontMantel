import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: []
})
export class ContentComponent implements OnInit {
  @Input() content:Content;
  constructor() { }

  ngOnInit() {
  }

}
