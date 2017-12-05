import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-reportes-usuarios',
  templateUrl: './reportes-usuarios.component.html',
  styleUrls: ['./reportes-usuarios.component.css'], 
  providers: [UserService]
})
export class ReportesUsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
