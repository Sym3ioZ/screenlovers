import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  trendingMovies$!: Observable<any>;
  trendingPeople$!: Observable<any>;
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.trendingMovies$ = this.service.getTrendingMovies();
    this.trendingPeople$ = this.service.getTrendingPeople();
  }
}
