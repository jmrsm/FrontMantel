import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { _ } from 'core-js/library/web/timers';

@Component({
  selector: 'app-horas-categorias',
  templateUrl: './horas-categorias.component.html',
  styleUrls: ['./horas-categorias.component.css']
})
export class HorasCategoriasComponent implements OnInit {
  horasVistas: number[];
  nombreCategoria: string[];
  emailUsuario: string;
  data:any={};
  public pieChartLabels:string[]=[];
  public pieChartData:number[]=[];
  public pieChartType:string='pie';

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.emailUsuario=localStorage.getItem('email');
    var body=this.emailUsuario;
    this.reportesservice.getReporteUsuario(body).subscribe(data => {
      this.data=JSON.parse(data['_body']);
      for(let entry of this.data.horasPorCategoria){
        this.pieChartData.push(entry.horasVistas);
        this.pieChartLabels.push(entry.nombreCategoria);
        console.log(this.pieChartData);
      }
    });
  }

  /*cargarDatos(){
    for(let value of this.horasVistas){
      
    }
  }*/
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
