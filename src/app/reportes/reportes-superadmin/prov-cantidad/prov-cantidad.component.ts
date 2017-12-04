import { Component, OnInit } from '@angular/core';
import { Reportes} from '../../../models/reportes';
import { ReportesService} from '../../../services/reportes.service';

@Component({
  selector: 'app-prov-cantidad',
  templateUrl: './prov-cantidad.component.html',
  styleUrls: ['./prov-cantidad.component.css'],
  providers: [ReportesService]
})
export class ProvCantidadComponent implements OnInit {

  
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
