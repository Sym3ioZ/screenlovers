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
    const movieId = +this.route.snapshot.params['id'];
    this.uniqueMovie$ = this.service.getUniqueMovie(movieId);
    this.uniqueMovieCredits$ = this.service.getUniqueMovieCredits(movieId);
    this.uniqueMovieCrew$ = this.service.getUniqueMovieCrew(movieId);
  }

  seeMoreCast(): void {
    this.castToggle = !this.castToggle;
  }
  seeMoreCrew(): void {
    this.crewToggle = !this.crewToggle;
  }
  countDirectors(crewArray: Array<any>): number {
    let counter = 0;
    for (let i = 0; i < crewArray.length; i++) {
      if (crewArray[i].job === 'Director') {
        counter++;
      }
    }
    console.log(counter);
    return counter;
  }
}
