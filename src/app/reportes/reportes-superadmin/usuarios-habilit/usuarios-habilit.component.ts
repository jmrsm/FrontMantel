import { Component, OnInit } from '@angular/core';
import { Reportes} from '../../../models/reportes';
import { ReportesService} from '../../../services/reportes.service';

@Component({
  selector: 'app-usuarios-habilit',
  templateUrl: './usuarios-habilit.component.html',
  styleUrls: ['./usuarios-habilit.component.css']
})
export class UsuariosHabilitComponent implements OnInit {
  usuariosHabil: number;
  data:any={};

  constructor(private reportesservice: ReportesService) { }

  ngOnInit() {
    this.reportesservice.getReporteSuperAdmin().subscribe(data => {
      this.data=JSON.parse(data['_body']);
      console.log(this.data);
      this.usuariosHabil = this.data.cantuUsuarioHabilitados;
      console.log(this.usuariosHabil);
    });
  }

}
