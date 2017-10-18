import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navar-super-admin',
  templateUrl: './navar-super-admin.component.html',
  styleUrls: ['./navar-super-admin.component.css']
})
export class NavarSuperAdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('tipo');
    this.router.navigate(['login']);
    return false;
  }
}
