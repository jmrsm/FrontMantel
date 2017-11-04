import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [ ` 
  
  .card-img-top{
    width: 400px;
    height: 400px;
}`]
})
export class ContentComponent implements OnInit {
  @Input() content:Content;
  constructor() { }

  ngOnInit() {
  }
  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_JOHebQTrkgPUeecYROmEOPGO',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });
  }
}
