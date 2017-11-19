import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
  providers: [UserService]
})
export class SeriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
