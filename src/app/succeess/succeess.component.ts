import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuscripcionService } from '../services/suscripcion.service';

@Component({
  selector: 'app-succeess',
  templateUrl: './succeess.component.html',
  styleUrls: ['./succeess.component.css']
})
export class SucceessComponent implements OnInit {
private email:string= '';
private url:string= '';
private error:string= '';
private isLoading:boolean= true;
private links:any;
private token:string;

  constructor (
  	private router:Router,
  	private suscripcionService:SuscripcionService
  ) { }

  ngOnInit() {
  	this.email= localStorage.getItem('email');
	  this.url= localStorage.getItem('urlSuscribe');

    this.suscripcionService.ejecutarPlan(this.url).subscribe(p => {
    	var aux= p;
    	this.links= JSON.parse(aux['_body']);
      this.token= this.links.id;
       console.log(this.token);
      if (this.token !== '')
        localStorage.setItem('pago' , 'si');
        console.log(localStorage.getItem('pago'));
        this.redirect();
    },e => this.error = e, () => this.isLoading= false);  
   // this.suscribirService.habilitar(this.email);
   
  }

	redirect() {
		setTimeout((router: Router) => {
        	this.router.navigate(['login']);
    	}, 1000);  

	}

}

