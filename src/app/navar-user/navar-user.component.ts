import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navar-user',
  templateUrl: './navar-user.component.html',
  styleUrls: ['./navar-user.component.css']
})
export class NavarUserComponent implements OnInit {

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
