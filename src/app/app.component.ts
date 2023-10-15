import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnsplashService } from './services/unsplash.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private unsplash: UnsplashService) {}

  ngOnInit(): void {
    this.router.navigate(['']);
    moment.locale('en')
  }
}
