import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
	private
  constructor (
  	private router:Router
  ) { }

  ngOnInit() {
	
   localStorage.setItem('pago' , 'no');

    this.redirect();
  }

  redirect() {
    setTimeout((router: Router) => {
          this.router.navigate(['contenido']);
      }, 1000);  

  }

}
