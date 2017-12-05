import { Component, OnInit } from '@angular/core';
import {Reportes} from '../../../models/reportes';
import { ReportesService} from '../../../services/reportes.service';
import { UserService} from '../../../services/user.service';

@Component({
  selector: 'app-horas-totales',
  templateUrl: './horas-totales.component.html',
  styleUrls: ['./horas-totales.component.css'],
  providers:[ReportesService, UserService]
})
export class HorasTotalesComponent implements OnInit {
  horasTot: number;
  emailUsuario: string;
  data:any={};

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.emailUsuario=localStorage.getItem('email');
    var body=this.emailUsuario;
    this.reportesservice.getReporteUsuario(body).subscribe(data => {
      //this.data=data;
      this.data=JSON.parse(data['_body']);
      console.log(this.data);
      this.horasTot = this.data.horasTotalesPerdidas;
      console.log(this.horasTot);
    });
  }

}
