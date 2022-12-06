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
  APIurl: string = 'https://api.themoviedb.org/3/movie/';
  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.uniqueMovie$ = this.service.getUniqueMovie(1585);
  }
}
