import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-single-people',
  templateUrl: './single-people.component.html',
  styleUrls: ['./single-people.component.scss'],
})
export class SinglePeopleComponent implements OnInit {
  uniquePeople$!: Observable<any>;
  uniquePeopleMoviesCast$!: Observable<any>;
  uniquePeopleMoviesDirecting$!: Observable<any>;
  uniquePeopleMoviesWriting$!: Observable<any>;
  uniquePeopleImages$!: Observable<any>;
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
    const peopleId = +this.route.snapshot.params['id'];
    this.uniquePeople$ = this.service.getUniquePeople(peopleId);
    this.uniquePeopleMoviesCast$ = this.service.getUniquePeopleMovies(
      peopleId,
      'Acting'
    );
    this.uniquePeopleMoviesDirecting$ = this.service.getUniquePeopleMovies(
      peopleId,
      'Directing'
    );
    this.uniquePeopleMoviesWriting$ = this.service.getUniquePeopleMovies(
      peopleId,
      'Writing'
    );
    this.uniquePeopleImages$ = this.service.getUniquePeopleImages(peopleId);
  }

  onGetUniqueMovie(movieId: number): void {
    this.router.navigateByUrl(`singlemovie/${movieId}`);
  }
}
