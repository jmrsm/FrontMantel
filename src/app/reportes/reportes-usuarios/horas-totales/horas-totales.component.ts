import { Component, OnInit } from '@angular/core';
import {Reportes} from '../../../models/reportes';
import { ReportesService} from '../../../services/reportes.service';

@Component({
  selector: 'app-horas-totales',
  templateUrl: './horas-totales.component.html',
  styleUrls: ['./horas-totales.component.css'],
  providers:[ReportesService]
})
export class HorasTotalesComponent implements OnInit {
  horasTot: number;
  data:any={};

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.reportesservice.getReporteSuperAdmin().subscribe(data => {
      //this.data=data;
      this.data=JSON.parse(data['_body']);
      console.log(this.data);
      this.horasTot = this.data.horasTotalesPerdidas;
      console.log(this.horasTot);
    });
  }

}
