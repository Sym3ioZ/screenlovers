import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  randomMovie$!: Observable<any>;
  randomNumber: number = Math.floor(Math.random() * 10);
  yearGap!: number; //Gap calculated to display 'Released X years ago'
  posterUrl: string = 'https://image.tmdb.org/t/p/w500'; // Base URL to retrieve images, such as posters
  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.randomMovie$ = this.service.getRandomMovie(); // Assigning a random movie to the observable
    this.yearGap = new Date().getFullYear() - this.service.randomYear;
  }

  onDiscover() {
    this.ngOnInit(); // Kind of reloading the component to display another random movie
  }

  onGetMoviePage(movieId: number) {
    this.router.navigateByUrl(`singlemovie/${movieId}`); // Links to the single movie page associated to the actual featured movie
  }
}
