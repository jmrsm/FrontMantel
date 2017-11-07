import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
  providers: [UserService]
})
export class ContenidoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
