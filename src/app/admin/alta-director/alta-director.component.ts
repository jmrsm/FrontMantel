import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DirectorService} from '../../services/director.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-alta-director',
  templateUrl: './alta-director.component.html',
  styleUrls: ['./alta-director.component.css'],
  providers: [DirectorService]
})
export class AltaDirectorComponent implements OnInit {
  options: string[] = [];
  status: any = '';
  exito: string = '';
  errorMessage: string = '';
  error: string = '';
  isLoading: boolean = true;
  msj: string = '';
  link: string = '';
  constructor(private directorservice:DirectorService,private router: Router) { }

  ngOnInit() {
  }
  altadirector(form: NgForm){
    var body='nombre='+ form.value.nombre;
    this.directorservice.addDirector(body).subscribe(p => {
      //console.log("dentro de if por 200");
      this.exito = 'Actor creado bien';
      this.router.navigate(['admin']);

    },e => this.error = e, () => this.isLoading = false);
  }
}
