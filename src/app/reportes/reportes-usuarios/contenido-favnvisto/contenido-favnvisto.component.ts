import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
<<<<<<< HEAD
import { UserService } from '../../../services/user.service';
=======
import { UserService} from '../../../services/user.service';
>>>>>>> branch 'merged' of https://github.com/jmrsm/FrontMantel.git

@Component({
  selector: 'app-contenido-favnvisto',
  templateUrl: './contenido-favnvisto.component.html',
  styleUrls: ['./contenido-favnvisto.component.css'],
<<<<<<< HEAD
  providers: [ReportesService, UserService]
=======
  providers: [UserService]
>>>>>>> branch 'merged' of https://github.com/jmrsm/FrontMantel.git
})
export class ContenidoFavnvistoComponent implements OnInit {
  id: number[];
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
      for(let entry of this.data.contenidoFavoritoNoVisto){
        this.pieChartData.push(entry.id);
        this.pieChartLabels.push(entry.titulo);
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
