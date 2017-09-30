import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';

@Component({
  selector: 'app-contenido-list',
  templateUrl: './contenido-list.component.html',
  styles: []
})
export class ContenidoListComponent implements OnInit {
  content = new Content('1','Batman Vs Superman','Batman Vs Superman','http://allcalidad.com/wp-content/uploads/2016/07/batman-vs-superman-el-origen-de-la-justicia.jpg','https://');
  constructor() { }

  ngOnInit() {
  }

}
