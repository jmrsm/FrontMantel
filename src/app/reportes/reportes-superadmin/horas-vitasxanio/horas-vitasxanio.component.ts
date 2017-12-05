import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-horas-vitasxanio',
  templateUrl: './horas-vitasxanio.component.html',
  styleUrls: ['./horas-vitasxanio.component.css']
})
export class HorasVitasxanioComponent implements OnInit {
  horasVistas: number[];
  fecha: string[];
  data:any={};
  public barChartLabels:string[]=[];
  public barChartData:any[]=[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.reportesservice.getReporteSuperAdmin().subscribe(data => {
      this.data=JSON.parse(data['_body']);
      for(let entry of this.data.horasVistasPorAnio){
        this.barChartData.push(entry.horasVistas);
        this.barChartLabels.push(entry.fecha);
      }
    });
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  /*public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Horas'}
  ];*/

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
