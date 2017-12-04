import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prov-canthoras',
  templateUrl: './prov-canthoras.component.html',
  styleUrls: ['./prov-canthoras.component.css']
})
export class ProvCanthorasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
