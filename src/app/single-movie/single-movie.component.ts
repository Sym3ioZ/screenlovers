import { Component, OnInit } from '@angular/core';
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
  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.uniqueMovie$ = this.service.getUniqueMovie(680);
    this.uniqueMovieCredits$ = this.service.getUniqueMovieCredits(680);
  }
}
