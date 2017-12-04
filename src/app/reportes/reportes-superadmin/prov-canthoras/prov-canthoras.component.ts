import { Component, OnInit } from '@angular/core';
import { ReportesService} from '../../../services/reportes.service';

@Component({
  selector: 'app-prov-canthoras',
  templateUrl: './prov-canthoras.component.html',
  styleUrls: ['./prov-canthoras.component.css']
})
export class ProvCanthorasComponent implements OnInit {
  cantidadHoras: number[];
  nombreProveedor: string[];
  data:any={};
  public pieChartLabels:string[]=[];
  public pieChartData:number[]=[];
  public pieChartType:string='pie';

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.reportesservice.getReporteSuperAdmin().subscribe(data => {
      this.data=data;
      for(let entry of this.data.proveedorCantidadHoras){
        this.pieChartData.push(entry.cantidadHoras);
        this.pieChartLabels.push(entry.nombreProveedor);
      }
    });
  }

  // Pie
  //public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  //public pieChartData:number[] = [300, 500, 100];
  //public pieChartType:string = 'pie';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
