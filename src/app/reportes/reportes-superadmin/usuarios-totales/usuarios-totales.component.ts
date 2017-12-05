import { Component, OnInit } from '@angular/core';
import { Reportes} from '../../../models/reportes';
import { ReportesService} from '../../../services/reportes.service';

@Component({
  selector: 'app-usuarios-totales',
  templateUrl: './usuarios-totales.component.html',
  styleUrls: ['./usuarios-totales.component.css']
})
export class UsuariosTotalesComponent implements OnInit {
  usuariosTot: number;
  data:any={};

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.reportesservice.getReporteSuperAdmin().subscribe(data => {
      this.data=JSON.parse(data['_body']);
      console.log(this.data);
      this.usuariosTot = this.data.cantuUsuarioTotales;
      console.log(this.usuariosTot);
    });
  }

}
