import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
import {Paypal} from 'paypal-rest-sdk';
import {Http} from '@angular/http';
import {BodyParser} from 'body-parser';


//import com.mercadopago.MP;
//import org.codehaus.jettison.json.JSONObject;


@Component({
  selector: 'app-navar-user',
  templateUrl: './navar-user.component.html',
  styleUrls: ['./navar-user.component.css'],
  providers: [AngularFireDatabase,NotificationsService]
})
export class NavarUserComponent implements OnInit {
  categorias:any;
  error: string = '';
  isLoading: boolean = true;
  nombre:string;
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  noti:number=0;
  aux:boolean=false;
  paypal:Paypal;
  bodyParser:BodyParser;
  

  constructor(private http:Http, private router:Router,private userService:UserService,private db: AngularFireDatabase,public _notificationsService: NotificationsService) {
    this.nombre=localStorage.getItem('email');
    this.itemsRef = db.list('mail1');
    this.item = db.list('mail1').valueChanges();
  }

  ngOnInit() {
    var mensaje='';
    this.userService.getCategorias().subscribe(p => {
      this.categorias=JSON.parse(p['_body']);
    },e => this.error = e, () => this.isLoading = false);
    this.item.subscribe(data=>{
      //console.log(data);
      for(let item of data){
        //console.log(item);
        if(!this.aux){
          if(item.addressee==this.nombre && item.read==false){
            mensaje=item.name+' a compartido un contenido contigo';
            this.noti+=1;
            this._notificationsService.success('Contenido Compartido', mensaje,{
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true});
          }
        }
        
      }
      if(this.aux){
        for(let item of data){
          if(item.addressee==this.nombre && item.read==false && localStorage.getItem('enviado')=='Si'){
            mensaje=item.name+' a compartido un contenido contigo';
            this._notificationsService.success('Contenido Compartido', mensaje,{
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true});
          }
        }
        if(localStorage.getItem('enviado')=='Si'){
          this.noti+=1;
        }else{
          if(this.noti>0){
            this.noti-=1;
          }
          
        }
        localStorage.removeItem('enviado');
      }
      this.aux=true;
    });
  }
  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('tipo');
    this.router.navigate(['login']);
    return false;
  }
  //esto ser�a para activar la suscripci�n
 // sandboxInitPoint(){
   // MP mp = new MP("CLIENT_ID", "CLIENT_SECRET");
	//String preapprovalData = "...";
	//JSONObject preapproval = mp.createPreapprovalPayment(preapprovalData);
	//String sandboxInitPoint = preapproval.getJSONObject("response").getString("sandbox_init_point");
    //  }
    
    
private paypal2() {
	
//	var paypal = require('paypal-rest-sdk'),
//    this.bodyParser = require('body-parser'),
//    this.http = require('http'),
    
//	app = require('express')();

	var clientId = 'AZLd59EEDCSAKB0XEEFx0EedYoNOJrNRb3anFHdpiuyMcJdYXymDE2GPm9C6O01xJ-vqOrT3rES7pFAT';
	var secret = 'EHdx9CNQvyZsD13vOJiHDEbvVRgPhadRLyDh41mRctwK0l1mZATpEXGR-R_ZEmeqFEPAdKiVaxMtjyic';

this.paypal.configure({
	'mode': 'sandbox', //sandbox or live
  	'client_id': clientId,
  	'client_secret': secret
});

	app.use(this.bodyParser.json());


app.get('/createplan', function(req, res){
    var billingPlanAttribs = {
        "name": "Food of the World Club Membership: Standard",
        "description": "Monthly plan for getting the t-shirt of the month.",
        "type": "fixed",
        "payment_definitions": [{
            "name": "Standard Plan",
            "type": "REGULAR",
            "frequency_interval": "1",
            "frequency": "MONTH",
            "cycles": "11",
            "amount": {
                "currency": "USD",
                "value": "19.99"
            }
        }],
        "merchant_preferences": {
            "setup_fee": {
                "currency": "USD",
                "value": "1"
            },
            "cancel_url": "http://localhost:3000/cancel",
            "return_url": "http://localhost:3000/processagreement",
            "max_fail_attempts": "0",
            "auto_bill_amount": "YES",
            "initial_fail_amount_action": "CONTINUE"
        }
    };
    
    var billingPlanUpdateAttributes = [{
        "op": "replace",
        "path": "/",
        "value": {
            "state": "ACTIVE"
        }
    }];

    this.paypal.billingPlan.create(billingPlanAttribs, function (error, billingPlan){
        if (error){
            console.log(error);
            throw error;
        } else {
            // Activate the plan by changing status to Active
            this.paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function(error, response){
                if (error) {
                    console.log(error);
                    throw error;
                } else {
                    res.send('Billing plan created under ID: ' + billingPlan.id);
                }
            });
        }
    });
});



function get('/createagreement', function(req, res){
    var billingPlan = req.query.plan;
    
    var isoDate = new Date();
    isoDate.setSeconds(isoDate.getSeconds() + 4);
    isoDate.toISOString().slice(0, 19) + 'Z';

    var billingAgreementAttributes = {
        "name": "Standard Membership",
        "description": "Food of the World Club Standard Membership",
        "start_date": isoDate,
        "plan": {
            "id": billingPlan
        },
        "payer": {
            "payment_method": "paypal"
        },
        "shipping_address": {
            "line1": "W 34th St",
            "city": "New York",
            "state": "NY",
            "postal_code": "10001",
            "country_code": "US"
        }
    };

    // Use activated billing plan to create agreement
    this.paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement){
        if (error) {
            console.error(error);
            throw error;
        } else {
            //capture HATEOAS links
            var links = {};
            billingAgreement.links.forEach(function(linkObj){
                links[linkObj.rel] = {
                    'href': linkObj.href,
                    'method': linkObj.method
                };
            })

            //if redirect url present, redirect user
            if (links.hasOwnProperty('approval_url')){
                res.redirect(links['approval_url'].href);
            } else {
                console.error('no redirect URI present');
            }
        }
    });
});

app.get('/processagreement', function(req, res){
    var token = req.query.token;
    
    this.paypal.billingAgreement.execute(token, {}, function (error, billingAgreement) {
        if (error) {
            console.error(error);
            throw error;
        } else {
            console.log(JSON.stringify(billingAgreement));
            res.send('Billing Agreement Created Successfully');
        }
    });
});



/*

    var value = this.monto
    var idContenido =  this.idcontent;
    var emailUsuario = this.emailUsuario;
    console.log(idContenido);
    console.log(emailUsuario);
    console.log(value);
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
            var urlAndParams = "http://localhost:8080/api/usuario/comprarContenidoPayPerView/"

            urlAndParams += "?idContenido=" + idContenido;
            urlAndParams += "&email=" + emailUsuario;

            console.log(urlAndParams)
            xhttp.open("POST", urlAndParams, true);
            xhttp.send();
            return actions.payment.execute().then(function() {
            window.alert('Pago realizado con exito!');
            
            });
          })
        }
      }, '#paypal-button-container');
    });
    
    */
    
  }
  
  
  
    private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement=document.createElement('script')
      scriptElement.src=scriptUrl
      scriptElement.onload=resolve
      document.body.appendChild(scriptElement)
    })
  }
  
  
  
    
    
}
