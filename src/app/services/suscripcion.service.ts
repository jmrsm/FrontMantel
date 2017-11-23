import { Injectable, NgModule } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SuscripcionService {
  
  private url:string= 'https://api.sandbox.paypal.com/v1/payments/billing-agreements';
  private clientId:string = 'AZLd59EEDCSAKB0XEEFx0EedYoNOJrNRb3anFHdpiuyMcJdYXymDE2GPm9C6O01xJ-vqOrT3rES7pFAT';
  private secret:string = 'EHdx9CNQvyZsD13vOJiHDEbvVRgPhadRLyDh41mRctwK0l1mZATpEXGR-R_ZEmeqFEPAdKiVaxMtjyic';

  constructor(
      private http:Http,
      private httpc:HttpClient 
      ) { }
  
  private getHeaders2(){
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.secret));
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  public altaPlan(body:String): Observable<any> {
    return this.http.post(this.url, body, {headers: this.getHeaders2()});
  }

  public ejecutarPlan(url:string): Observable<any> {
    console.log(url);
    return this.http.post(url,'', {headers: this.getHeaders2()});
  }
}
