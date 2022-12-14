import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss'],
})
export class SingleMovieComponent implements OnInit {
  uniqueMovie$!: Observable<any>;
  uniqueMovieCredits$!: Observable<any>;
  uniqueMovieCrew$!: Observable<any>;
  uniqueMovieWriters$!: Observable<any>;

  castToggle!: boolean;
  crewToggle!: boolean;
  writersToggle!: boolean;
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private service: ServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.castToggle = false;
    this.crewToggle = false;
    this.writersToggle = false;
    const movieId = +this.route.snapshot.params['id']; // Retrieving movieId from URL parameters
    this.uniqueMovie$ = this.service.getUniqueMovie(movieId); // Assigning movie to observable
    this.uniqueMovieCredits$ = this.service.getUniqueMovieCredits(movieId); // Assigning full credits to obersvable
    this.uniqueMovieCrew$ = this.service.getUniqueMovieCrew(movieId); // Assigning directors only to observable (array)
    this.uniqueMovieWriters$ = this.service.getUniqueMovieWriters(movieId); // Assigning directors only to observable (array)
  }

  seeMoreCast(): void {
    // Toggle to display or not full actors list
    this.castToggle = !this.castToggle;
  }
  seeMoreCrew(): void {
    // Toggle to display or not full directors list
    this.crewToggle = !this.crewToggle;
  }
  seeMoreWriters(): void {
    // Toggle to display or not full writers list
    this.writersToggle = !this.writersToggle;
  }
}
