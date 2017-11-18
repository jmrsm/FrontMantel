import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireObject,AngularFireList } from 'angularfire2/database';
//import com.mercadopago.MP;
//import org.codehaus.jettison.json.JSONObject;


@Component({
  selector: 'app-navar-user',
  templateUrl: './navar-user.component.html',
  styleUrls: ['./navar-user.component.css'],
  providers: [AngularFireDatabase]
})
export class NavarUserComponent implements OnInit {
  categorias:any;
  error: string = '';
  isLoading: boolean = true;
  nombre:string;
  itemsRef: AngularFireList<any>;  
  item: Observable<any[]>;
  noti:number=0;
  aux:number=0;
  constructor(private router:Router,private userService:UserService,private db: AngularFireDatabase) {
    this.nombre=localStorage.getItem('email');
    this.itemsRef = db.list('mail1');
    this.item = db.list('mail1').valueChanges();
    
    
    
   }

  ngOnInit() {
    this.userService.getCategorias().subscribe(p => {
      this.categorias=JSON.parse(p['_body']);
    },e => this.error = e, () => this.isLoading = false);
    this.item.subscribe(data=>{
      console.log(data);
      for(let item of data){
        console.log(item);
        
        if(item.addressee==this.nombre && item.read==false){
          
          this.noti+=1;
          
        }
      }
      
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
