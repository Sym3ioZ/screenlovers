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

  castToggle: boolean = false;
  crewToggle: boolean = false;
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private service: ServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const movieId = +this.route.snapshot.params['id']; // Retrieving movieId from URL parameters
    this.uniqueMovie$ = this.service.getUniqueMovie(movieId); // Assigning movie to observable
    this.uniqueMovieCredits$ = this.service.getUniqueMovieCredits(movieId); // Assigning full credits to obersvable
    this.uniqueMovieCrew$ = this.service.getUniqueMovieCrew(movieId); // Assigning directors only to observable (array)
  }

  seeMoreCast(): void {
    // Toggle to display or not full actors list
    this.castToggle = !this.castToggle;
  }
  seeMoreCrew(): void {
    // Toggle to display or not full directors list
    this.crewToggle = !this.crewToggle;
  }
}
