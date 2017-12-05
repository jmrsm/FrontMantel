import { Component, OnInit } from '@angular/core';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';  
import { Router , ActivatedRoute, Params} from '@angular/router';
import { DatePipe } from '@angular/common';

declare let paypal: any;

@Component({
  selector: 'app-content-detail-serie',
  templateUrl: './content-detail-serie.component.html',
  styleUrls: ['./content-detail-serie.component.css'],
  providers:[UserService, DatePipe]
})
export class ContentDetailSerieComponent implements OnInit {
  idcontent:number;
  idUser:string;
  contendio:any={};
  poster:string;
  plot:string;
  title:string;
  actor:string[]=[];
  director:string[]=[];
  comentario:string[]=[];
  emailUsuario:string;
  esPayperview:boolean;
  pagado:boolean;
  monto:number;
  ranking:string;
  tipoContenido:string;
  fechaInicio:number;
  fechaInicioString:string;
  origen:string;
  values:Array<any>;
  temporadas:Array<any>;
  dataVal:any;
  temporadaElegida;

  constructor(private contentservice:ContentService,
    private _route: ActivatedRoute,
    private _router: Router,
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
    
    this._route.params.forEach((params: Params) => {
      this.idcontent = params['Id'];
      this.idUser=localStorage.getItem('idUsuario');
      this.emailUsuario=localStorage.getItem('email');
      var body='?idContenido='+this.idcontent;
      this.contentservice.getDatoContenido(body).subscribe(data=>{
        this.contendio=JSON.parse(data['_body']);
        this.poster=this.contendio.Poster;
        this.plot=this.contendio.Plot;
        this.actor=this.contendio.Actors;
        this.title=this.contendio.Title;
        this.director=this.contendio.Director;
        this.comentario=this.contendio.comentarios;
        this.monto=this.contendio.precio;
        this.esPayperview=this.contendio.esPago;
        this.tipoContenido=this.contendio.tipoContenido;
        this.fechaInicio=this.contendio.fechaInicio;
        this.ranking=this.contendio.imdbRating;
        this.fechaInicioString = this.datePipe.transform(new Date(this.fechaInicio), 'dd/MM/yy HH:mm:ss');
        
      });
      this.contentservice.buscarEpisodiosSerie(this.idcontent).subscribe(data=>{
        this.dataVal= data;
        let valuesAux= new Array<any>();
        for (let ep of this.dataVal) {
          valuesAux.push(ep);
        }
        this.values= valuesAux;

        let aux= new Array<any>();
        for (let temp of this.dataVal) {
          let tempa= temp.temporadaN;
          if (aux.indexOf(tempa) == -1){
            aux.push(tempa);
          }
        }
        this.temporadas= aux;
      });
    })
    
  
        
  }
altacomentario(comentario:NgForm){
    var body='contenidoId='+this.idcontent+'&usuarioId='+this.idUser+'&comentario='+comentario.value.comentario;
    this.contentservice.comentar(body).subscribe(data=>{
      this._router.navigate(['login']);
    });
  }
setranking(Ranking:NgForm){
    var body='contenidoId='+this.idcontent+'&usuarioId='+this.idUser+'&puntaje='+Ranking.value.valor;
    this.contentservice.calificar(body).subscribe(data=>{
      this._router.navigate(['login']);
    });
  }
verificarPago(idcontent, emailUsuario) {
  this.contentservice.verificarPago(idcontent, emailUsuario).subscribe(
      result => {
        this.pagado = result;
        if (!this.pagado) {
          this.paypal();  
        }
        
      },
      error => {
        console.log(<any>error);
      }); 
}

private paypal() {
    var value = this.monto
    var idContenido =  this.idcontent;
    var emailUsuario = this.emailUsuario;
    this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
      paypal.Button.render({
        env: 'sandbox',
        style: {
          label: 'pay',
          size:  'small',
          shape: 'rect', 
          color: 'gold'
        },
        client: {
          sandbox:    'ASJBxWW7q7mUFxebpmJYamjkbODQGpVgd3hyyBY7bzTd1R9YyrHcoMvoctSkxSeJCzUtS-JVGnXZ1_go',
          production: 'https://developer.paypal.com/developer/applications/Mantel'
        },
        commit: true,
        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  
                  amount: { total: value, currency: 'USD' }
                }
              ]
            }
          })
        },
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            var xhttp = new XMLHttpRequest();
            var urlAndParams = "http://104.131.119.199:8080/api/usuario/comprarContenidoPayPerView/"

            urlAndParams += "?idContenido=" + idContenido;
            urlAndParams += "&email=" + emailUsuario;

            console.log(urlAndParams);
            xhttp.open("POST", urlAndParams, true);
            xhttp.send();
            return actions.payment.execute().then(function() {
            window.alert('Pago realizado con exito!');
            
            });
          })
        }
      }, '#paypal-button-container');
    });
  }

  private showPaypalBoton() {
    if (this.esPayperview && this.pagado) {
      return false;
    }
    else if (!this.esPayperview) {
      return false;
    }
    else {
      this.verificarPago(this.idcontent, this.emailUsuario);
      return true;
    }
    
  }

  private esEvento() {
    if (this.tipoContenido==='EVENTO_ESPECTACULO' || this.tipoContenido==='EVENTO_DEPORTIVO')
      return true;
    else
      return false; 
  }
  private esDeporte() {
    if (this.tipoContenido==='EVENTO_DEPORTIVO')
      return true;
    else
      return false; 
  }

  private esEspectaculo() {
    if (this.tipoContenido==='EVENTO_ESPECTACULO')
      return true;
    else
      return false;
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement=document.createElement('script')
      scriptElement.src=scriptUrl
      scriptElement.onload=resolve
      document.body.appendChild(scriptElement)
    })
  }
  marcarSpoiler(id:any){
    var body='idComentario='+id+'&idUsuario='+localStorage.getItem('idUsuario');
    this.contentservice.marcarSpoiler(body).subscribe(data=>{
      this._router.navigate(['login']);
    });
  }
  pagAnterior() {
      this._router.navigate(['/contenido']);  
  }

  atras() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  elegirT(value: any){
    this.temporadaElegida= +value;
    console.log(this.temporadaElegida);
  }
}
