import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-altaempresa',
  templateUrl: './altaempresa.component.html',
  styleUrls: ['./altaempresa.component.css']
})
export class AltaempresaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
Altaempresa(form: NgForm){
    
    console.log(form.value);
    
    return false;
  }
}
