import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-categoria',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [UserService]
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
