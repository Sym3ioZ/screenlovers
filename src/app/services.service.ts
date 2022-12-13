import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  actualDate: Date = new Date();
  randomNumber!: number;
  randomYear!: number;
  randomPreDate!: string;
  randomPostDate!: string;

  getUniqueMovie(movieId: number): Observable<any> {
    return this.http.get<object>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&include_adult=false`
    );
  }

  getUniqueMovieCredits(movieId: number): Observable<any> {
    return this.http.get<object>(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&include_adult=false`
    );
  }

  getUniqueMovieCrew(movieId: number): Observable<any> {
    return this.getUniqueMovieCredits(movieId).pipe(
      map((array) => array.crew),
      map((crewArray) =>
        crewArray.filter(
          (element: { job: string }) => element.job === 'Director'
        )
      )
    );
  }

  getRandomMovie(): Observable<any> {
    this.randomNumber = Math.floor(Math.random() * 100);
    this.randomYear = this.actualDate.getFullYear() - (this.randomNumber + 1);
    this.randomPreDate = new Date(
      (this.actualDate.getMonth() === 0
        ? this.randomYear - 1
        : this.randomYear) +
        '-' +
        (this.actualDate.getMonth() === 0 ? 12 : this.actualDate.getMonth()) +
        '-' +
        this.actualDate.getDate()
    ).toISOString();
    this.randomPostDate = new Date(
      (this.actualDate.getMonth() === 11
        ? this.randomYear + 1
        : this.randomYear) +
        '-' +
        (this.actualDate.getMonth() === 11
          ? 1
          : this.actualDate.getMonth() + 2) +
        '-' +
        this.actualDate.getDate()
    ).toISOString();
    return this.http.get<object>(
      `https://api.themoviedb.org/3/discover/movie?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&primary_release_date.gte=${this.randomPreDate}&primary_release_date.lte=${this.randomPostDate}&vote_average.gte=7&include_adult=false`
    );
  }
}
