import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navar-admin',
  templateUrl: './navar-admin.component.html',
  styleUrls: ['./navar-admin.component.css']
})
export class NavarAdminComponent implements OnInit {

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
