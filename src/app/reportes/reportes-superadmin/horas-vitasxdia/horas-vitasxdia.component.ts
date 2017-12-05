import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-horas-vitasxdia',
  templateUrl: './horas-vitasxdia.component.html',
  styleUrls: ['./horas-vitasxdia.component.css']
})
export class HorasVitasxdiaComponent implements OnInit {
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
        //this.data=data;
        this.data=JSON.parse(data['_body']);
        console.log(this.data);
        console.log(this.data);
        for(let entry of this.data.horasVistasPorDia){
          this.barChartData.push(entry.horasVistas);
          this.barChartLabels.push(entry.fecha);
          console.log(this.barChartData);
          console.log(this.barChartLabels);
        }
      });
      
    }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

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
