import { Component, OnInit } from '@angular/core';
import {Reportes} from '../../../models/reportes';
import { ReportesService} from '../../../services/reportes.service';
import { Body } from '@angular/http/src/body';

@Component({
  selector: 'app-horas-visualizadas',
  templateUrl: './horas-visualizadas.component.html',
  styleUrls: ['./horas-visualizadas.component.css'],
  providers:[ReportesService]
})
export class HorasVisualizadasComponent implements OnInit {
  horasTot: number;
  emailUsuario: string;
  data:any={};

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.emailUsuario=localStorage.getItem('email');
    var body=this.emailUsuario;
    this.reportesservice.getReporteAdmin(body).subscribe(data => {
    //this.data=data;
    this.data=JSON.parse(data['_body']);
    console.log(this.data);
    this.horasTot = this.data.horasTotalesVisualizadas;
    console.log(this.horasTot);
  });
  }


}
