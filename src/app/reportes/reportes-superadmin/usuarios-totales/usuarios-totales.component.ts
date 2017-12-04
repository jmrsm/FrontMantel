import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-totales',
  templateUrl: './usuarios-totales.component.html',
  styleUrls: ['./usuarios-totales.component.css']
})
export class UsuariosTotalesComponent implements OnInit {

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
