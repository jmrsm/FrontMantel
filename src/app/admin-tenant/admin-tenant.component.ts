import { Component, OnInit } from '@angular/core';
import {ContentService} from '../services/content.service';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-admin-tenant',
  templateUrl: './admin-tenant.component.html',
  styleUrls: ['./admin-tenant.component.css']
})
export class AdminTenantComponent implements OnInit {
  contenidos:Observable<any[]>;
  error: string = '';
  isLoading: boolean = true;
  constructor(private contentService:ContentService) { }

  ngOnInit() {
    var body='?email='+localStorage.getItem('email');
    this.contentService.getMyContent(body).subscribe(p => {
      console.log(body);
      this.contenidos  = JSON.parse(p['_body']);
      //this.contenidos = (p['_body']);
      console.log(this.contenidos);
    },e => this.error = e, () => this.isLoading = false);
  
  }

}
