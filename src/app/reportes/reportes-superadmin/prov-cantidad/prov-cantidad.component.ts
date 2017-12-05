import { Component, OnInit } from '@angular/core';
import { ChartsModule} from 'ng2-charts';
import { Reportes} from '../../../models/reportes';
import { ReportesService} from '../../../services/reportes.service';

@Component({
  selector: 'app-prov-cantidad',
  templateUrl: './prov-cantidad.component.html',
  styleUrls: ['./prov-cantidad.component.css'],
  providers: [ReportesService]
})
export class ProvCantidadComponent implements OnInit {
  cantidadContenido: any[];
  nombreProceedor: string[];
  data:any={};
  public pieChartLabels:string[]=[];
  public pieChartData:any[]=[];
  public pieChartType:string='pie';
  
  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.reportesservice.getReporteSuperAdmin().subscribe(data => {
      //this.data=data;
      this.data=JSON.parse(data['_body']);
      console.log(this.data);
      for(let entry of this.data.proveedorCantidad){
        this.pieChartData.push(entry.cantidadContenido);
        this.pieChartLabels.push(entry.nombreProceedor);
        console.log(this.pieChartData);
        console.log(this.pieChartLabels);
      }
    });
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
