import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  randomMovie$!: Observable<any>;
  randomNumber: number = Math.floor(Math.random() * 20);
  yearGap!: number;
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';
  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.randomMovie$ = this.service.getRandomMovie();
    this.yearGap = new Date().getFullYear() - this.service.randomYear;
  }

  onDiscover() {
    this.ngOnInit();
  }

  onGetMoviePage(movieId: number) {
    this.router.navigateByUrl(`singlemovie/${movieId}`);
  }
}
