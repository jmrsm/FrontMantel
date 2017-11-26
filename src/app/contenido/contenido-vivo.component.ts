import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-cont-vivo',
  templateUrl: './contenido-vivo.component.html',
  styleUrls: ['./contenido-vivo.component.css'],
  providers: [UserService]
})
export class ContenidoVivoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
