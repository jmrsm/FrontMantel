import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-content-destacado',
  templateUrl: './alta-content-destacado.component.html',
  styleUrls: ['./alta-content-destacado.component.css']
})
export class AltaContentDestacadoComponent implements OnInit {
  contenidos:Observable<any[]>;
  error: string = '';
  isLoading: boolean = true;
  constructor(private contentService:ContentService,private router:Router ) { }

  ngOnInit() {
    var body='?email='+localStorage.getItem('email');
    this.contentService.getMyContent(body).subscribe(p => {
      console.log(body);
      this.contenidos  = JSON.parse(p['_body']);
      
    },e => this.error = e, () => this.isLoading = false);
  
  }
  changeDestacado(content:any){
    if(content.esDestacado){
      var body="contenidoId="+content.id+"&esDestacado=false";
      this.contentService.changeDestacado(body).subscribe(p => {
        this.router.navigate(['/admintenant']);
        
      },e => this.error = e, () => this.isLoading = false);
    }else{
      var body="contenidoId="+content.id+"&esDestacado=true";
      this.contentService.changeDestacado(body).subscribe(p => {
        this.router.navigate(['/admintenant']);
      },e => this.error = e, () => this.isLoading = false);
    }
   
  
  }
}
