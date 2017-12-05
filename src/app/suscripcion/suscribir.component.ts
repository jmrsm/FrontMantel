import { Component, OnInit, Inject } from '@angular/core';
import { SuscripcionService } from '../services/suscripcion.service';
import { CategoriaService } from '../services/categoria.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-suscribir',
  templateUrl: './suscribir.component.html',
  styleUrls: ['./suscribir.component.css']
})
export class SuscribirComponent implements OnInit {
  private fechaActual:Date;
  private idElegido:string= '';
  private error:string= '';
  private isLoading:boolean= false;
  private links:any;
  private urlsResponse:string[]= [];
  private date:string= '';
  private imgBebe:string= './assets/mininos.jpg';
  private imgPerro:string= './assets/perros.jpg';
  private cfgVentana:string= 'width=800,height=400 menubar=yes,' +
  'location=yes,resizable=yes,scrollbars=yes,status=yes';
  private nombreVentana:string= 'Suscripcion Mantel';

  constructor (
  	private router:Router,
  	private suscripcionService:SuscripcionService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
  	
  }


  saltarSuscripcion() {
    this.router.navigate(['contenido']);
  }

  selectPlan(id:string) {
    this.isLoading= true;
    //this.loading = true;
    this.fechaActual = new Date();
    var aux = this.fechaActual.getTime() + 25000;
    var fecha = new Date(aux);
    this.date = fecha.toISOString();  
    if (id === 'd' || id === 's' || id === 'm' || id === 'y') {
      this.altaPlan(this.date);
    }
  }

  altaPlan(fecha: string){

  	let body;

    	var bodyDiario='{\"name\":\"Contrato Diario\",\"description\": \"Acuerdo de pago para el servicio' +
	    ' Mantel por un dia, esta suscripcion se renovara automaticamente.\", \"start_date\": \"' + fecha + '\",' +
 	    '\"payer\": {\"payment_method\": \"paypal\"}, \"plan\": {\"id\":\"P-7PB07288KJ530770TD33LEVA\" } }';

	    var bodySemanal='{\"name\":\"Contrato Semanal\",\"description\": \"Acuerdo de pago para el servicio' +
 	    ' Mantel por una semana, esta suscripcion se renovara automaticamente.\", \"start_date\": \"' + fecha + '\",' +
 	    '\"payer\": {\"payment_method\": \"paypal\"}, \"plan\": {\"id\":\"P-6SN54481EE2189130D32PETI\" } }';

 	    var bodyMensual='{\"name\":\"Contrato Mensual\",\"description\": \"Acuerdo de pago para el servicio' +
 	    ' Mantel por un mes, esta suscripcion se renovara automaticamente.\", \"start_date\": \"' + fecha + '\",' +
 	    '\"payer\": {\"payment_method\": \"paypal\"}, \"plan\": {\"id\":\"P-3V715811JT3940004D3WYPQQ\" } }';

	    var bodyAnual='{\"name\":\"Contrato Anual\",\"description\": \"Acuerdo de pago para el servicio' +
 	    ' Mantel por un año, esta suscripcion se renovara automaticamente.\", \"start_date\": \"' + fecha + '\",' +
 	    '\"payer\": {\"payment_method\": \"paypal\"}, \"plan\": {\"id\":\"P-7WA78920JV950405M4YUGY7Y\" } }';

    if (this.idElegido==='d') {
    	body=bodyDiario;
    }
	  else if (this.idElegido==='s') {
		  body=bodySemanal;
  	}
  	else if (this.idElegido==='m') {
  		body=bodyMensual;
  	}
  	else {
  		body=bodyAnual;
  	}

    this.suscripcionService.altaPlan(body).subscribe(p => {
    	var aux = p;
    	this.links=JSON.parse(aux['_body']);
      for (let entry of this.links.links) {
        this.urlsResponse.push(entry.href);  
      }
      localStorage.setItem( 'urlSuscribe' , this.urlsResponse[1]);
      window.open(this.urlsResponse[0], '_self');
    },e => this.error = e, () => this.isLoading = false);  
  }

}




