import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';
import {NotificationsService, SimpleNotificationsModule} from 'angular2-notifications';
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

  constructor(private router:Router,private userService:UserService,private db: AngularFireDatabase,public _notificationsService: NotificationsService) {
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
              timeOut: 6000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true});
          }
        }
        
      }
      if(this.aux){
        this._notificationsService.success('Contenido Compartido', mensaje,{
          timeOut: 6000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true});
        this.noti+=1;
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
}
