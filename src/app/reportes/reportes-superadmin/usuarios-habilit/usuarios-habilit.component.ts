import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-habilit',
  templateUrl: './usuarios-habilit.component.html',
  styleUrls: ['./usuarios-habilit.component.css']
})
export class UsuariosHabilitComponent implements OnInit {

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
