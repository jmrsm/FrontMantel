import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-bloqueo-usuario',
  templateUrl: './bloqueo-usuario.component.html',
  styleUrls: ['./bloqueo-usuario.component.css'],
  providers: [AdminService],
})
export class BloqueoUsuarioComponent implements OnInit {
	options: string[] = [];
	status: any = '';
	exito: string = '';
	errorMessage: string = '';
	error: string = '';
	isLoading: boolean = true;
	msj: string = '';
	link: string = '';
	b: Boolean;

	constructor(private router: Router,private adminService:AdminService) { }

  ngOnInit() {
  }

  onEventClick(selectValue : string ) { 

    if(selectValue==='1'){
	this.b = false
	}
	else {
		this.b = true;
	}
}

  bloqueoUsuario(form: NgForm){
  		var mail=form.value.mailUsuario;

  		var body='email='+mail+'&bloquear='+this.b;
   		console.log(form.value);

								this.adminService.bloqUsuario(body).subscribe(p => {
						      this.exito = 'Usuario bloqueado con éxito';
						      this.router.navigate(['/bloqueo-usuario']);

						    },e => this.error = e, () => this.isLoading = false);
						   
						    return false;
  	}

}
