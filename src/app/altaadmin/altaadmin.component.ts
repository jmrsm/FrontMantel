import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-altaadmin',
  templateUrl: './altaadmin.component.html',
  styleUrls: ['./altaadmin.component.css']
})
export class AltaadminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Altaadmin(form: NgForm){
    
    console.log(form.value);
    
    return false;
  }

}
