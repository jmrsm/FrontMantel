import { Component, OnInit } from '@angular/core';
import { ReportesService} from '../../../services/reportes.service';

@Component({
  selector: 'app-prov-canthoras',
  templateUrl: './prov-canthoras.component.html',
  styleUrls: ['./prov-canthoras.component.css']
})
export class ProvCanthorasComponent implements OnInit {
  cantidadHoras: any[];
  nombreProveedor: string[];
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
      for(let entry of this.data.proveedorCantidadHoras){
        this.pieChartData.push(entry.cantidadHoras);
        this.pieChartLabels.push(entry.nombreProveedor);
        console.log(this.pieChartData);
        console.log(this.pieChartLabels);
      }
    });
  }

}
