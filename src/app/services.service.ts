import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getUniqueMovie(movieId: number): Observable<object> {
    return this.http.get<object>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&include_adult=false`
    );
  }

  getUniqueMovieCredits(movieId: number): Observable<object> {
    return this.http.get<object>(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&include_adult=false`
    );
  }

  getRandomMovie(): Observable<object> {
    this.randomNumber = Math.floor(Math.random() * 100);
    this.randomYear = this.actualDate.getFullYear() - this.randomNumber;
    this.randomPreDate = new Date(
      this.randomYear +
        '-' +
        (this.actualDate.getMonth() + 1) +
        '-' +
        (this.actualDate.getDate() - 7)
    ).toISOString();
    this.randomPostDate = new Date(
      this.randomYear +
        '-' +
        (this.actualDate.getMonth() + 1) +
        '-' +
        (this.actualDate.getDate() + 7)
    ).toISOString();
    return this.http.get<object>(
      `https://api.themoviedb.org/3/discover/movie?api_key=032445021a055e1fc596f3292981c16d&language=fr-FR&primary_release_date.gte=${this.randomPreDate}&primary_release_date.lte=${this.randomPostDate}&include_adult=false`
    );
  }
}
