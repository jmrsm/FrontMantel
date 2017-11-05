import { Component, OnInit } from '@angular/core';
import {ContentService} from '../services/content.service';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-admin-tenant',
  templateUrl: './admin-tenant.component.html',
  styleUrls: ['./admin-tenant.component.css']
})
export class AdminTenantComponent implements OnInit {
  contenido:Observable<any[]>;
  error: string = '';
  isLoading: boolean = true;
  constructor(private contentService:ContentService) { }

  ngOnInit() {

    var body='?email='+localStorage.getItem('email');
    this.contentService.getMyContent(body).subscribe(p => {
      console.log(body);
      this.contenido  = JSON.parse(p['_body']);
      console.log(this.contenido);
      //console.log(this.item);
    },e => this.error = e, () => this.isLoading = false);
  
  }

}
