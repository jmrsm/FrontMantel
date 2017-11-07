import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-navar-user',
  templateUrl: './navar-user.component.html',
  styleUrls: ['./navar-user.component.css']
})
export class NavarUserComponent implements OnInit {
  categorias:any;
  error: string = '';
  isLoading: boolean = true;
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() {
    this.userService.getCategorias().subscribe(p => {
      this.categorias=JSON.parse(p['_body']);
    },e => this.error = e, () => this.isLoading = false);
  }
  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('tipo');
    this.router.navigate(['login']);
    return false;
  }
}
