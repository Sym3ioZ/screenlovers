import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.trendingMovies$ = this.service.getTrendingMovies();
    this.trendingPeople$ = this.service.getTrendingPeople();
  }

  onGetMovie(movieId: number): any {
    window.scrollTo({ top: 0 });
    this.router.navigateByUrl(`singlemovie/${movieId}`);
  }

  onGetPeople(peopleId: number): any {
    window.scrollTo({ top: 0 });
    this.router.navigateByUrl(`singlepeople/${peopleId}`);
  }

  // On clicking ? link, redirects to random movie page (landing page)
  onDiscover() {
    window.scrollTo({ top: 0 });
    this.router.navigateByUrl('');
  }

  // On clicking search link, redirects to search page
  onSearch(): void {
    window.scrollTo({ top: 0 });
    this.router.navigateByUrl('search');
  }
}
