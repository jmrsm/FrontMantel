import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UserService]
})
export class PerfilComponent implements OnInit {
  error: string = '';
  isLoading: boolean = true;
  user:any;
  constructor(private userService:UserService) { }

  ngOnInit() {
    var body='?usuarioId='+localStorage.getItem('idUsuario');
    this.userService.getuser(body).subscribe(p => {
      this.user=JSON.parse(p['_body']);
    },e => this.error = e, () => this.isLoading = false);
  }

}
