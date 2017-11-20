import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [UserService]
})
export class PeliculasComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}