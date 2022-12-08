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
  posterUrl: string = 'https://image.tmdb.org/t/p/w500';
  constructor(
    private service: ServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const movieId = +this.route.snapshot.params['id'];
    this.uniqueMovie$ = this.service.getUniqueMovie(movieId);
    this.uniqueMovieCredits$ = this.service.getUniqueMovieCredits(movieId);
  }
}
