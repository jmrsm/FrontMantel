import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-horas-vistasxdia',
  templateUrl: './horas-vistasxdia.component.html',
  styleUrls: ['./horas-vistasxdia.component.css']
})
export class HorasVistasxdiaComponent implements OnInit {
  horasVistas: number[];
  fecha: string[];
  emailUsuario: string;
  data:any={};
  public barChartLabels:string[]=[];
  public barChartData:any[]=[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.emailUsuario=localStorage.getItem('email');
    var body=this.emailUsuario;
    this.reportesservice.getReporteSuperAdmin().subscribe(data => {
      this.data=data;
      for(let entry of this.data.horasVistasPorDia){
        this.barChartData.push(entry.horasVistas);
        this.barChartLabels.push(entry.fecha);
      }
    });
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  //public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

 
  /*public barChartData:any[] = [
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
  }


}