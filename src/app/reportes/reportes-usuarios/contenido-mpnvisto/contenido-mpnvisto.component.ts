import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { UserService} from '../../../services/user.service';

@Component({
  selector: 'app-contenido-mpnvisto',
  templateUrl: './contenido-mpnvisto.component.html',
  styleUrls: ['./contenido-mpnvisto.component.css'],
  providers: [UserService]

})
export class ContenidoMpnvistoComponent implements OnInit {
  id: string[];
  titulo: string[];
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
      for(let entry of this.data.contenidoMejorPuntuadoNoVisto){
        this.pieChartData.push(entry.id);
        this.pieChartLabels.push(entry.titulo);
      }
    });
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
